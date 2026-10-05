// Client side of the ScoreHistory and SharedResults components: the saved
// notice, history table, line chart, delete controls, export, share links and
// calendar reminders. All user-visible data is inserted with textContent or
// SVG attributes, never as HTML, so nothing from storage or a share link can
// run as code.

import { trackEvent } from '../pageview';
import { buildReminder, googleCalendarUrl, toIcs } from './calendar';
import { csvFilename, decodeShare, shareUrl, toCsv, toText } from './export';
import { comparisonSentence, defaultSummary, findBand, formatDate, formatTotal, outcomeText, roundedDiff, changeText } from './format';
import { deleteEntry, deleteTool, isAvailable, localIso, newId, readTool, saveEntry } from './resultsStore';
import type { ResultEntry, ScoreResult, ToolConfig } from './types';

/** Flip to true when /tools/my-results/ exists (rollout step 7). */
const MY_RESULTS_LIVE = false;

// ── Small DOM helpers ──

function h<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
	const node = document.createElement(tag);
	if (cls) node.className = cls;
	if (text !== undefined) node.textContent = text;
	return node;
}

function button(text: string, cls = 'sh-btn'): HTMLButtonElement {
	const b = h('button', cls, text);
	b.type = 'button';
	return b;
}

/** A control that asks for confirmation inline before acting. */
function confirmControl(label: string, question: string, confirmLabel: string, onConfirm: () => void): HTMLElement {
	const wrap = h('span', 'sh-confirm');
	const start = button(label, 'sh-link');
	const showStart = () => { wrap.replaceChildren(start); };
	start.addEventListener('click', () => {
		const yes = button(confirmLabel, 'sh-btn sh-btn-danger');
		const no = button('Cancel', 'sh-btn');
		yes.addEventListener('click', onConfirm);
		no.addEventListener('click', () => { showStart(); start.focus(); });
		wrap.replaceChildren(h('span', 'sh-confirm-q', question), yes, no);
		yes.focus();
	});
	showStart();
	return wrap;
}

async function copyText(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		try {
			const ta = h('textarea');
			ta.value = text;
			ta.setAttribute('readonly', '');
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.append(ta);
			ta.select();
			const ok = document.execCommand('copy');
			ta.remove();
			return ok;
		} catch {
			return false;
		}
	}
}

function download(filename: string, content: string, type: string) {
	const url = URL.createObjectURL(new Blob([content], { type }));
	const a = h('a');
	a.href = url;
	a.download = filename;
	document.body.append(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 10000);
}

const shortDate = (iso: string) => formatDate(iso).replace(/^(\d+) (\w{3})\w* /, '$1 $2 ');

// ── Table ──

interface TableOptions {
	caption: string;
	onDelete?: (id: string) => void;
	/** Ids excluded from the share link; adds a share checkbox column when given. */
	unshared?: Set<string>;
}

/** Entries oldest first in; rendered newest first. */
export function renderTable(cfg: ToolConfig, entries: ResultEntry[], opts: TableOptions): HTMLElement {
	const subs = cfg.subscores.filter(s => s.inTable !== false);
	const criteria = entries.some(e => e.total === null);
	const table = h('table', 'sh-table');
	table.append(h('caption', undefined, opts.caption));

	const headRow = h('tr');
	const headers = ['Date', criteria ? 'Outcome' : 'Total', ...subs.map(s => s.label), 'Change'];
	if (opts.unshared) headers.push('Share');
	if (opts.onDelete) headers.push('Delete');
	for (const label of headers) {
		const th = h('th', undefined, label);
		th.scope = 'col';
		headRow.append(th);
	}
	const thead = h('thead');
	thead.append(headRow);
	table.append(thead);

	const body = h('tbody');
	for (let i = entries.length - 1; i >= 0; i--) {
		const e = entries[i];
		const prev = entries[i - 1];
		const tr = h('tr');
		const th = h('th', undefined, formatDate(e.date));
		th.scope = 'row';
		tr.append(th, h('td', undefined, outcomeText(cfg, e)));
		for (const s of subs) tr.append(h('td', undefined, e.subscores[s.key] === undefined ? '—' : formatTotal({ ...cfg, decimals: 1 }, e.subscores[s.key])));
		const change = prev && prev.total !== null && e.total !== null ? changeText(cfg, roundedDiff(cfg, prev.total, e.total)) : '—';
		tr.append(h('td', undefined, change));
		if (opts.unshared) {
			const td = h('td');
			const cb = h('input');
			cb.type = 'checkbox';
			cb.checked = !opts.unshared.has(e.id);
			cb.setAttribute('aria-label', `Include ${formatDate(e.date)} in the share link`);
			cb.addEventListener('change', () => { if (cb.checked) opts.unshared!.delete(e.id); else opts.unshared!.add(e.id); });
			td.append(cb);
			tr.append(td);
		}
		if (opts.onDelete) {
			const td = h('td');
			const onDelete = opts.onDelete;
			td.append(confirmControl('Delete', `Delete the result from ${formatDate(e.date)}?`, 'Yes, delete', () => onDelete(e.id)));
			tr.append(td);
		}
		body.append(tr);
	}
	table.append(body);
	const wrap = h('div', 'sh-table-scroll');
	wrap.append(table);
	return wrap;
}

// ── Line chart ──

const SVG_NS = 'http://www.w3.org/2000/svg';

function svg<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, text?: string): SVGElementTagNameMap[K] {
	const node = document.createElementNS(SVG_NS, tag);
	for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
	if (text !== undefined) node.textContent = text;
	return node;
}

/** A small line of the total over time; needs three or more numeric results. */
export function renderChart(cfg: ToolConfig, entries: ResultEntry[]): SVGSVGElement | null {
	const pts = entries.filter((e): e is ResultEntry & { total: number } => e.total !== null);
	if (pts.length < 3) return null;

	const W = 600, H = 190, L = 44, R = 20, T = 24, B = 30;
	const lo = cfg.totalMin ?? 0;
	let hi = cfg.totalMax ?? Math.max(...pts.map(p => p.total));
	if (hi <= lo) hi = lo + 1;
	const times = pts.map(p => new Date(p.date).getTime());
	const t0 = times[0], span = times[times.length - 1] - t0;
	const x = (i: number) => L + (span > 0 ? (times[i] - t0) / span : i / (pts.length - 1)) * (W - L - R);
	const y = (v: number) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);

	const first = pts[0], last = pts[pts.length - 1];
	const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'sh-chart', role: 'img' });
	root.setAttribute('aria-label', `Line chart of your ${cfg.name} total over time: ${formatTotal(cfg, first.total)} on ${formatDate(first.date)} to ${formatTotal(cfg, last.total)} on ${formatDate(last.date)}, ${pts.length} results.`);

	for (const v of [lo, hi]) {
		root.append(svg('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), class: 'sh-grid' }));
		root.append(svg('text', { x: L - 8, y: y(v) + 4, 'text-anchor': 'end', class: 'sh-axis' }, formatTotal(cfg, v)));
	}
	root.append(svg('polyline', { points: pts.map((p, i) => `${x(i).toFixed(1)},${y(p.total).toFixed(1)}`).join(' '), class: 'sh-line' }));
	pts.forEach((p, i) => root.append(svg('circle', { cx: x(i).toFixed(1), cy: y(p.total).toFixed(1), r: 3.5, class: 'sh-point' })));

	for (const [i, p, anchor] of [[0, first, 'start'], [pts.length - 1, last, 'end']] as const) {
		root.append(svg('text', { x: x(i), y: y(p.total) - 9, 'text-anchor': anchor, class: 'sh-value' }, formatTotal(cfg, p.total)));
		root.append(svg('text', { x: x(i), y: H - 8, 'text-anchor': anchor, class: 'sh-axis' }, shortDate(p.date)));
	}
	return root;
}

// ── Reminders (work without storage) ──

function wireReminder(root: HTMLElement, cfg: ToolConfig) {
	const google = root.querySelector<HTMLAnchorElement>('[data-reminder="google"]');
	const refresh = () => { if (google) google.href = googleCalendarUrl(buildReminder(cfg)); };
	refresh();
	google?.addEventListener('click', () => {
		refresh();
		trackEvent('reminder_google', { tool: cfg.id });
	});
	root.querySelector('[data-reminder="ics"]')?.addEventListener('click', () => {
		download(`retake-${cfg.id}.ics`, toIcs(buildReminder(cfg), newId()), 'text/calendar;charset=utf-8');
		trackEvent('reminder_ics', { tool: cfg.id });
	});
}

// ── Score history ──

export interface ScoreHistoryController {
	/** The most recent saved result before this page's own, for MIC comparisons. */
	latest(): ResultEntry | null;
	/** Save a just-produced result (replacing this visit's earlier save, if any) and render. */
	record(result: ScoreResult): void;
}

export function mountScoreHistory(cfg: ToolConfig): ScoreHistoryController {
	const root = document.querySelector<HTMLElement>(`.score-history[data-tool="${cfg.id}"]`);
	if (!root) return { latest: () => null, record: () => {} };

	const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
	const notice = q('.sh-notice');
	const history = q('.sh-history');
	const heading = q<HTMLHeadingElement>('.sh-heading');
	const firstLine = q('.sh-first');
	const comparison = q('.sh-comparison');
	const tableSlot = q('.sh-table-slot');
	const chartSlot = q('.sh-chart-slot');
	const deleteAllSlot = q('.sh-delete-all');
	const exportEl = q('.sh-export');
	const exportStatus = q('.sh-export-status');
	const privacy = q('.sh-privacy');
	const myResults = q('.sh-my-results');

	wireReminder(root, cfg);

	const available = isAvailable();
	let sessionId: string | null = null;
	let viewedTracked = false;
	const unshared = new Set<string>();

	const entries = () => (available ? readTool(cfg.id) : []);

	function setNotice(text: string, withUndo = false) {
		notice.replaceChildren();
		if (!text) return;
		notice.append(h('span', undefined, text));
		if (withUndo) {
			notice.append(' ');
			const undo = button("Don't keep this one", 'sh-link');
			undo.addEventListener('click', () => {
				if (sessionId) deleteEntry(sessionId);
				sessionId = null;
				render();
				setNotice('Removed. This result is not saved on this device.');
			});
			notice.append(undo);
		}
		if (MY_RESULTS_LIVE && withUndo) {
			notice.append(' ');
			const a = h('a', undefined, 'See all your results');
			a.href = '/tools/my-results/';
			notice.append(a);
		}
	}

	function render() {
		const all = entries();
		const n = all.length;
		history.hidden = n === 0;
		exportEl.hidden = n === 0;
		privacy.hidden = !available;
		myResults.hidden = !MY_RESULTS_LIVE || n === 0;
		firstLine.hidden = n !== 1;
		comparison.hidden = n < 2;
		comparison.textContent = n >= 2 ? comparisonSentence(cfg, all[n - 2], all[n - 1]) : '';
		exportStatus.textContent = '';

		tableSlot.replaceChildren();
		chartSlot.replaceChildren();
		deleteAllSlot.replaceChildren();
		if (n >= 2) {
			tableSlot.append(renderTable(cfg, all, {
				caption: `Your saved ${cfg.name} results, newest first`,
				unshared,
				onDelete: id => {
					deleteEntry(id);
					if (id === sessionId) { sessionId = null; setNotice(''); }
					render();
					heading.focus();
				},
			}));
			const chart = renderChart(cfg, all);
			if (chart) chartSlot.append(chart);
			deleteAllSlot.append(confirmControl(`Delete all ${cfg.name} results`, `Delete all ${n} saved ${cfg.name} results from this device?`, 'Yes, delete all', () => {
				deleteTool(cfg.id);
				sessionId = null;
				render();
				setNotice(`All ${cfg.name} results have been deleted from this device.`);
				notice.focus();
			}));
		}
	}

	// Export controls
	root.querySelector('[data-export="text"]')?.addEventListener('click', async () => {
		const ok = await copyText(toText(cfg, entries()));
		exportStatus.textContent = ok ? 'Copied. You can paste it into an email or message.' : 'Copying was blocked by your browser.';
		if (ok) trackEvent('result_exported', { tool: cfg.id, format: 'text' });
	});
	root.querySelector('[data-export="csv"]')?.addEventListener('click', () => {
		download(csvFilename(cfg.id), toCsv(entries(), [cfg]), 'text/csv;charset=utf-8');
		exportStatus.textContent = 'CSV downloaded.';
		trackEvent('result_exported', { tool: cfg.id, format: 'csv' });
	});
	root.querySelector('[data-export="link"]')?.addEventListener('click', async () => {
		const selected = entries().filter(e => !unshared.has(e.id));
		if (!selected.length) {
			exportStatus.textContent = 'Select at least one result to share.';
			return;
		}
		const ok = await copyText(shareUrl(cfg, selected));
		exportStatus.textContent = ok
			? `Link copied, with ${selected.length} ${selected.length === 1 ? 'result' : 'results'}. Anyone you send it to can see them; nothing is stored on our side.`
			: 'Copying was blocked by your browser.';
		if (ok) trackEvent('result_exported', { tool: cfg.id, format: 'link' });
	});

	render();

	return {
		latest() {
			const prev = entries().filter(e => e.id !== sessionId);
			return prev[prev.length - 1] ?? null;
		},
		record(r) {
			if (!available) return;
			const entry: ResultEntry = {
				id: sessionId ?? newId(),
				tool: cfg.id,
				toolVersion: cfg.version,
				date: localIso(),
				total: r.total,
				subscores: r.subscores,
				band: r.band ?? findBand(cfg, r.total)?.label ?? null,
				summary: r.summary ?? defaultSummary(cfg, r),
			};
			if (!saveEntry(entry)) return;
			const firstSave = sessionId === null;
			sessionId = entry.id;
			setNotice('Saved on this device.', true);
			render();
			if (firstSave) trackEvent('result_saved', { tool: cfg.id });
			// The block is only visible once a result is shown, so "viewed" is counted here, once per visit.
			const count = entries().length;
			if (!viewedTracked && count >= 2) {
				viewedTracked = true;
				trackEvent('history_viewed', { tool: cfg.id, entry_count: count });
			}
		},
	};
}

// ── Shared results from a #r= link ──

export function mountSharedResults(cfg: ToolConfig) {
	const root = document.querySelector<HTMLElement>(`.shared-results[data-tool="${cfg.id}"]`);
	if (!root) return;
	const shared = decodeShare(location.hash, cfg.id);
	if (!shared) return;

	const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
	const n = shared.length;
	q('.sh-comparison').textContent = n >= 2
		? comparisonSentence(cfg, shared[n - 2], shared[n - 1])
		: `${formatDate(shared[0].date)}: ${outcomeText(cfg, shared[0])}.`;
	q('.sh-table-slot').append(renderTable(cfg, shared, { caption: `Shared ${cfg.name} results, newest first` }));
	const chart = renderChart(cfg, shared);
	if (chart) q('.sh-chart-slot').append(chart);

	const save = q<HTMLButtonElement>('[data-save]');
	const status = q('.sh-save-status');
	if (!isAvailable()) {
		save.hidden = true;
		status.textContent = 'This browser is not keeping saved results, so these cannot be saved here.';
	}
	save.addEventListener('click', () => {
		const existing = readTool(cfg.id);
		let added = 0;
		for (const e of shared) {
			if (existing.some(x => x.date === e.date && x.total === e.total)) continue;
			if (saveEntry({ ...e, id: newId() })) added++;
		}
		save.disabled = true;
		status.textContent = added
			? `Saved ${added} ${added === 1 ? 'result' : 'results'} to this device.`
			: 'These results are already saved on this device.';
	});

	root.hidden = false;
	trackEvent('shared_result_opened', { tool: cfg.id });
	// Someone opening a share link came to see these results, so take them there.
	root.scrollIntoView({ block: 'start' });
	q<HTMLHeadingElement>('h2').focus({ preventScroll: true });
}
