// Client side of the test template: start and resume, screens, keyboard,
// autosave, scoring, results, and the results actions. Scoring, percentiles
// and the strip markup come from the instruments package; this file only
// wires them to the page. All user-visible data is inserted with textContent
// or built by the package's escaping renderer, never as raw HTML from storage.

import {
	buildReminder, clearAttempt, decodeShare, googleCalendarUrl, isAvailable, localIso, newId, ordinal,
	percentile, readAttempt, readTool, saveAttempt, saveEntry, score, strip, toIcs, unanswered,
	type Instrument, type NormTable, type ResultEntry, type Responses, type ToolConfig,
} from '@site/instruments';

interface Means { low: string; mid: string; high: string }

interface TestData {
	instrument: Instrument;
	norms: NormTable | null;
	group: string;
	path: string;
	name: string;
	means: Record<string, Means>;
	names: Record<string, string>;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const formatDate = (iso: string) => {
	const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
	return `${d} ${MONTHS[m - 1]} ${y}`;
};

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
	const node = document.createElement(tag);
	if (cls) node.className = cls;
	if (text !== undefined) node.textContent = text;
	return node;
}

function download(filename: string, content: string, type: string) {
	const url = URL.createObjectURL(new Blob([content], { type }));
	const a = el('a');
	a.href = url;
	a.download = filename;
	document.body.append(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 10000);
}

async function copyText(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}

export function mountTest() {
	const dataEl = document.querySelector<HTMLScriptElement>('script[data-test-data]');
	if (!dataEl) return;
	const data = JSON.parse(dataEl.textContent ?? '{}') as TestData;
	const { instrument, norms } = data;
	// The norms group being compared against. The page's default, unless the
	// person picked another group on this device earlier (stored per instrument).
	let group = data.group;
	const GROUP_KEY = `tests:norms-group:${instrument.id}`;
	try {
		const chosen = localStorage.getItem(GROUP_KEY);
		if (chosen && norms?.groups[chosen]) group = chosen;
	} catch { /* storage unavailable */ }
	const q = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel);
	const testEl = q('[data-test]')!;
	const resultsEl = q('[data-results]')!;
	const form = q<HTMLFormElement>('[data-form]')!;
	const screensEls = Array.from(form.querySelectorAll<HTMLElement>('[data-screen]'));
	const total = instrument.items.length;
	const toolConfig: ToolConfig = {
		id: instrument.id,
		version: String(instrument.version),
		name: data.name,
		path: data.path,
		subscores: instrument.scales.map((s) => ({ key: s.id, label: data.names[s.id] ?? s.name })),
		reminderMonths: 6,
	};

	let screen = 1;
	const responses: Responses = {};

	// ── Reading and writing answers ──
	const inputsFor = (n: number) => Array.from(form.querySelectorAll<HTMLInputElement>(`input[name="q${n}"]`));
	const isCheck = instrument.response.type === 'check';
	function readForm() {
		for (const key of Object.keys(responses)) delete responses[Number(key)];
		if (isCheck) {
			// A box left empty is an answer (not checked), so every item is always answered.
			for (const inp of form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) {
				responses[Number(inp.name.slice(1))] = inp.checked ? 2 : 1;
			}
			return;
		}
		for (const inp of form.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked')) {
			responses[Number(inp.name.slice(1))] = Number(inp.value);
		}
	}
	/** Mirror each input's checked state onto its label as a class; CSS reads the class, which is far cheaper than :has(). */
	function syncSelected(scope: ParentNode = form) {
		for (const inp of scope.querySelectorAll<HTMLInputElement>('input[type="radio"], input[type="checkbox"]')) {
			inp.closest('label')?.classList.toggle('selected', inp.checked);
		}
	}
	function writeForm() {
		form.reset();
		for (const [n, v] of Object.entries(responses)) {
			const inp = isCheck
				? form.querySelector<HTMLInputElement>(`input[name="q${n}"]`)
				: form.querySelector<HTMLInputElement>(`input[name="q${n}"][value="${v}"]`);
			if (inp) inp.checked = isCheck ? v === 2 : true;
		}
		syncSelected();
	}
	const answeredCount = () => Object.keys(responses).length;

	// ── Progress and screens ──
	const fill = q<HTMLElement>('[data-progress-fill]')!;
	const bar = q<HTMLElement>('.progress')!;
	const screenLabel = q('[data-screen-label]')!;
	const answeredLabel = q('[data-answered]')!;
	const status = q('[data-test-status]')!;
	const backBtn = q<HTMLButtonElement>('[data-back]')!;
	const nextBtn = q<HTMLButtonElement>('[data-next]')!;

	function updateProgress() {
		if (isCheck) readForm();
		const n = isCheck ? Math.min(total, screen * 10) : answeredCount();
		fill.style.width = `${(n / total) * 100}%`;
		bar.setAttribute('aria-valuenow', String(n));
		answeredLabel.textContent = `${n} of ${total} answered`;
	}

	function showScreen(i: number, focus = true) {
		screen = Math.max(1, Math.min(i, screensEls.length));
		for (const s of screensEls) s.hidden = Number(s.dataset.screen) !== screen;
		screenLabel.textContent = `Screen ${screen} of ${screensEls.length}`;
		if (isCheck) updateProgress();
		backBtn.hidden = screen === 1;
		nextBtn.textContent = screen === screensEls.length ? 'See my results' : 'Next screen';
		status.textContent = '';
		for (const m of form.querySelectorAll('.missing')) m.classList.remove('missing');
		saveAttempt(instrument, responses, screen);
		if (focus) {
			const first = screensEls[screen - 1].querySelector<HTMLElement>('.q-text');
			first?.scrollIntoView({ block: 'start' });
			screensEls[screen - 1].querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
		}
	}

	function itemsOnScreen(): number[] {
		return Array.from(screensEls[screen - 1].querySelectorAll<HTMLElement>('[data-item]')).map((e) => Number(e.dataset.item));
	}

	function validateScreen(): boolean {
		readForm();
		const missing = itemsOnScreen().filter((n) => responses[n] === undefined);
		if (!missing.length) return true;
		const first = form.querySelector<HTMLElement>(`[data-item="${missing[0]}"]`)!;
		first.classList.add('missing');
		status.textContent = missing.length === 1 ? `Answer item ${missing[0]} to continue.` : `Answer items ${missing.join(', ')} to continue.`;
		first.querySelector<HTMLInputElement>('input')?.focus();
		first.scrollIntoView({ block: 'center' });
		return false;
	}

	form.addEventListener('change', (e) => {
		const target = e.target as HTMLInputElement;
		if (target?.type !== 'radio' && target?.type !== 'checkbox') return;
		syncSelected(target.closest('[data-item]') ?? form);
		readForm();
		target.closest('[data-item]')?.classList.remove('missing');
		updateProgress();
		saveAttempt(instrument, responses, screen);
	});

	nextBtn.addEventListener('click', () => {
		if (!validateScreen()) return;
		if (screen === screensEls.length) finish();
		else showScreen(screen + 1);
	});
	backBtn.addEventListener('click', () => showScreen(screen - 1));
	form.addEventListener('submit', (e) => { e.preventDefault(); nextBtn.click(); });

	// Keys 1 to 5 answer the item that has focus, or the first unanswered on the screen; Enter continues.
	document.addEventListener('keydown', (e) => {
		if (testEl.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
		const active = document.activeElement as HTMLElement | null;
		const inputType = active?.tagName === 'INPUT' ? (active as HTMLInputElement).type : '';
		if (active && (active.tagName === 'TEXTAREA' || (inputType && inputType !== 'radio' && inputType !== 'checkbox'))) return;
		const points = instrument.response.points;
		const n = Number(e.key);
		if (Number.isInteger(n) && n >= 1 && n <= points) {
			e.preventDefault();
			readForm();
			const focused = active?.closest<HTMLElement>('[data-item]');
			const target = focused ? Number(focused.dataset.item) : itemsOnScreen().find((i) => responses[i] === undefined);
			if (target === undefined) return;
			const inp = inputsFor(target)[n - 1];
			if (!inp) return;
			inp.checked = true;
			inp.dispatchEvent(new Event('change', { bubbles: true }));
			const items = itemsOnScreen();
			const next = items[items.indexOf(target) + 1];
			if (next !== undefined) inputsFor(next)[0]?.focus();
			else nextBtn.focus();
		} else if (e.key === 'Enter' && active?.tagName !== 'BUTTON' && active?.tagName !== 'A') {
			e.preventDefault();
			nextBtn.click();
		}
	});

	// ── Start, resume, restart ──
	const startActions = q('[data-start-actions]')!;
	const resume = q('[data-resume]')!;
	function beginTest(fromScreen = 1) {
		resultsEl.hidden = true;
		testEl.hidden = false;
		resume.hidden = true;
		startActions.hidden = true;
		updateProgress();
		showScreen(fromScreen);
	}
	function restart() {
		for (const key of Object.keys(responses)) delete responses[Number(key)];
		form.reset();
		syncSelected();
		clearAttempt(instrument);
		beginTest(1);
	}
	q('[data-start]')?.addEventListener('click', () => {
		const saved = readAttempt(instrument);
		if (saved && Object.keys(saved.responses).length) {
			Object.assign(responses, saved.responses);
			writeForm();
			resultsEl.hidden = true;
			testEl.hidden = false;
			startActions.hidden = true;
			resume.hidden = false;
			updateProgress();
			for (const s of screensEls) s.hidden = true;
			resume.querySelector<HTMLButtonElement>('[data-resume-continue]')?.focus();
			resume.scrollIntoView({ block: 'start' });
			return;
		}
		beginTest(1);
	});
	q('[data-resume-continue]')?.addEventListener('click', () => {
		const saved = readAttempt(instrument);
		beginTest(saved?.screen ?? 1);
	});
	q('[data-resume-restart]')?.addEventListener('click', restart);
	q('[data-restart]')?.addEventListener('click', restart);

	// ── Results ──
	const rowsEl = q('[data-results-rows]')!;
	const whenEl = q('[data-results-when]')!;
	const noteEl = q('[data-results-note]')!;
	const resultsStatus = q('[data-results-status]')!;
	let current: ResultEntry | null = null;

	const hasNorms = () => !!norms && !!norms.groups[group];
	const pct = (id: string, raw: number) => (hasNorms() && norms!.groups[group].scales[id] ? percentile(norms!, id, group, raw) : null);
	const range = (id: string) => {
		const r = score(instrument, {}).scales[id];
		return { min: r.min, max: r.max };
	};

	function band(id: string, raw: number): 'low' | 'mid' | 'high' {
		const p = pct(id, raw);
		if (p !== null) return p < 25 ? 'low' : p > 75 ? 'high' : 'mid';
		const { min, max } = range(id);
		const f = (raw - min) / (max - min);
		return f < 0.34 ? 'low' : f > 0.66 ? 'high' : 'mid';
	}

	function stripFor(id: string, raw: number, size: 'domain' | 'facet', second?: { raw: number; label: string }, hue?: string): string {
		const { min, max } = range(id);
		return strip({
			name: data.names[id] ?? instrument.scales.find((s) => s.id === id)?.name ?? id,
			min, max, raw, size, hue,
			...(hasNorms() && norms!.groups[group].scales[id] ? { norms: norms!, scale: id, group } : {}),
			...(second ? { second: second.raw, secondLabel: second.label, firstLabel: 'today' } : {}),
		});
	}

	const HUES: Record<string, string> = {
		O: 'var(--hue-openness)', I: 'var(--hue-openness)',
		C: 'var(--hue-conscientiousness)',
		E: 'var(--hue-extraversion)',
		A: 'var(--hue-agreeableness)',
		N: 'var(--hue-stability)', S: 'var(--hue-stability)',
	};

	type Compare = { entry: ResultEntry; label: string };
	let lastRender: { entry: ResultEntry; compare?: Compare; prefix: string } | null = null;

	function renderResults(entry: ResultEntry, compare?: Compare, prefix = '') {
		lastRender = { entry, compare, prefix };
		rowsEl.replaceChildren();
		const domains = instrument.scales.filter((s) => !s.parent);
		for (const d of domains) {
			const raw = entry.subscores[d.id];
			if (raw === undefined) continue;
			const row = el('div', 'row result');
			const aside = el('div', 'aside');
			aside.append(el('p', 'scale-name', data.names[d.id] ?? d.name));
			const { max } = range(d.id);
			aside.append(el('p', 'scale-raw', `${raw} of ${max}`));
			const main = el('div', 'main wide');
			const second = compare && compare.entry.subscores[d.id] !== undefined ? { raw: compare.entry.subscores[d.id], label: compare.label } : undefined;
			const plot = el('div');
			plot.innerHTML = stripFor(d.id, raw, 'domain', second, HUES[d.id]);
			main.append(plot);
			const m = data.means[d.id];
			if (m) {
				const p = el('p', 'means');
				p.append(el('em', undefined, m[band(d.id, raw)]));
				main.append(p);
			}
			const facets = instrument.scales.filter((s) => s.parent === d.id);
			if (facets.length) {
				const grid = el('div', 'facets');
				for (const f of facets) {
					const fr = entry.subscores[f.id];
					if (fr === undefined) continue;
					const cell = el('div', 'facet');
					cell.append(el('span', 'facet-name', data.names[f.id] ?? f.name));
					const fp = el('div');
					fp.innerHTML = stripFor(f.id, fr, 'facet', compare && compare.entry.subscores[f.id] !== undefined ? { raw: compare.entry.subscores[f.id], label: compare.label } : undefined);
					cell.append(fp);
					grid.append(cell);
				}
				main.append(grid);
			}
			row.append(aside, main);
			rowsEl.append(row);
		}
		whenEl.textContent = `Saved on this device, ${formatDate(entry.date)}`;
		noteEl.textContent = prefix + (hasNorms()
			? `${data.name}, compared with ${norms!.groups[group].n.toLocaleString('en-GB')} people (${norms!.groups[group].label.toLowerCase()}). Curve height shows how common each score is.`
			: `${data.name}. No published norms exist for this test, so the marker shows your raw score against the possible range.`);
		resultsEl.hidden = false;
	}

	// The group picker: redraw the same results against another group.
	const groupSel = q<HTMLSelectElement>('[data-group]');
	if (groupSel) {
		groupSel.value = group;
		groupSel.addEventListener('change', () => {
			if (!norms?.groups[groupSel.value]) return;
			group = groupSel.value;
			try { localStorage.setItem(GROUP_KEY, group); } catch { /* storage unavailable */ }
			if (lastRender) renderResults(lastRender.entry, lastRender.compare, lastRender.prefix);
		});
	}

	function finish() {
		readForm();
		if (unanswered(instrument, responses).length) { validateScreen(); return; }
		const r = score(instrument, responses);
		const subscores: Record<string, number> = {};
		for (const [id, s] of Object.entries(r.scales)) subscores[id] = s.raw;
		const summary = instrument.scales.filter((s) => !s.parent).map((s) => {
			const p = pct(s.id, subscores[s.id]);
			return `${data.names[s.id] ?? s.name} ${subscores[s.id]}${p === null ? '' : ` (${ordinal(p)} percentile)`}`;
		}).join(', ').slice(0, 500);
		const entry: ResultEntry = {
			id: newId(),
			tool: instrument.id,
			toolVersion: String(instrument.version),
			date: localIso(),
			total: null,
			subscores,
			band: null,
			summary: `${data.name}: ${summary}`.slice(0, 500),
		};
		if (isAvailable()) saveEntry(entry);
		clearAttempt(instrument);
		current = entry;
		testEl.hidden = true;
		renderResults(entry);
		resultsEl.scrollIntoView({ block: 'start' });
		resultsEl.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
	}

	function resultText(entry: ResultEntry): string {
		const lines = [`${data.name} results, ${formatDate(entry.date)}`, ''];
		for (const s of instrument.scales) {
			const raw = entry.subscores[s.id];
			if (raw === undefined) continue;
			const p = pct(s.id, raw);
			const { max } = range(s.id);
			lines.push(`${s.parent ? '  ' : ''}${data.names[s.id] ?? s.name}: ${raw} of ${max}${p === null ? '' : `, ${ordinal(p)} percentile`}`);
		}
		lines.push('', `Source: ${location.origin}${data.path}`);
		return lines.join('\n');
	}

	q('[data-copy]')?.addEventListener('click', async () => {
		if (!current) return;
		resultsStatus.textContent = (await copyText(resultText(current))) ? 'Copied. You can paste it into a message or a document.' : 'Copying was blocked by your browser.';
	});
	q('[data-print]')?.addEventListener('click', () => window.print());
	q('[data-share]')?.addEventListener('click', async () => {
		if (!current) return;
		const compact = JSON.stringify({ t: instrument.id, e: [[current.toolVersion, current.date, current.total, current.subscores, current.band, current.summary]] });
		const bytes = new TextEncoder().encode(compact);
		let bin = '';
		for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
		const encoded = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
		const url = `${location.origin}${data.path}#r=${encoded}`;
		resultsStatus.textContent = (await copyText(url))
			? 'Link copied. It carries your scores in the link itself, so share it only with people you want to see them. Whoever opens it sees your profile beside their own if they have taken the test.'
			: 'Copying was blocked by your browser.';
	});
	const google = q<HTMLAnchorElement>('[data-reminder-google]');
	if (google) google.href = googleCalendarUrl(buildReminder(toolConfig));
	q('[data-reminder-ics]')?.addEventListener('click', () => {
		download(`retake-${instrument.id}.ics`, toIcs(buildReminder(toolConfig), newId()), 'text/calendar;charset=utf-8');
		resultsStatus.textContent = 'Calendar file downloaded: a reminder in six months, repeating twice a year.';
	});

	// ── On load: a share link, else a saved result, else the start screen ──
	const shared = decodeShare(location.hash, instrument.id);
	const saved = readTool(instrument.id);
	const latest = saved[saved.length - 1] ?? null;
	if (shared?.length) {
		const theirs = shared[shared.length - 1];
		if (latest) {
			current = latest;
			renderResults(latest, { entry: theirs, label: `shared, ${formatDate(theirs.date)}` }, `Your results (filled markers) beside the shared results from ${formatDate(theirs.date)} (outline markers). `);
		} else {
			current = null;
			renderResults(theirs, undefined, "These are someone else's results, opened from a link. Take the test to see yours beside them. ");
			whenEl.textContent = `Shared results, ${formatDate(theirs.date)}`;
		}
		resultsEl.scrollIntoView({ block: 'start' });
	} else if (latest) {
		current = latest;
		// The change view: the previous attempt on the same strips as an outline marker.
		const previous = saved.length >= 2 ? saved[saved.length - 2] : null;
		renderResults(latest, previous ? { entry: previous, label: formatDate(previous.date) } : undefined, previous ? `Filled markers are your latest attempt; outline markers are your attempt from ${formatDate(previous.date)}. ` : '');
		q('[data-start]')!.textContent = 'Take the test again';
	}
}
