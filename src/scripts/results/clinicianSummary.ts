// Client side of ClinicianSummary.astro: fills the print-only sheet with the
// current result, the saved history for this tool (if any) and the optional
// name and date of birth, then opens the print dialog. Everything happens in
// the browser; the name and date of birth are read from the inputs at print
// time and never stored. All text goes in with textContent.

import { trackEvent } from '../pageview';
import { SUMMARIES } from '../../tools/clinician-summary';
import { formatDate, formatTotal } from './format';
import type { ResultEntry, ScoreResult, ToolConfig } from './types';

/** Most recent saved results shown in the history table; older ones are counted, not listed. */
export const HISTORY_ROWS = 8;
/** The cap when the result table has more than six rows. */
export const HISTORY_ROWS_LONG = 6;

export interface SummaryInput {
	/** Local ISO date-time the current result was produced. */
	date: string;
	result: ScoreResult;
	/** All saved results for this tool, oldest first; empty when storage is unavailable. */
	entries: ResultEntry[];
	/** Id of the current result's saved entry, so it is not counted as earlier history. */
	currentId: string | null;
	name: string;
	dob: string;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string, cls?: string): HTMLElementTagNameMap[K] {
	const node = document.createElement(tag);
	if (text !== undefined) node.textContent = text;
	if (cls) node.className = cls;
	return node;
}

function row(cells: string[], header = false, numFrom = 1): HTMLTableRowElement {
	const tr = el('tr');
	cells.forEach((c, i) => {
		const cell = el(header ? 'th' : 'td', c, i >= numFrom ? 'num' : undefined);
		if (header) (cell as HTMLTableCellElement).scope = 'col';
		tr.append(cell);
	});
	return tr;
}

const sub = (cfg: ToolConfig, v: number | undefined) => (v === undefined ? '—' : formatTotal({ ...cfg, decimals: 1 }, v));

/** The sub-scores to tabulate: those shown in history tables, with their maxima. */
export function summarySubscores(cfg: ToolConfig) {
	return cfg.subscores.filter(s => s.inTable !== false);
}

/** The earlier saved results to list: everything but the current one, newest last, capped. */
export function historyRows(input: Pick<SummaryInput, 'entries' | 'currentId'>, cap = HISTORY_ROWS) {
	const all = input.entries;
	const kept = all.slice(-cap);
	return { rows: kept, hidden: all.length - kept.length, hasEarlier: all.some(e => e.id !== input.currentId) };
}

export function fillSummary(sheet: HTMLElement, cfg: ToolConfig, input: SummaryInput, renderChart: (cfg: ToolConfig, e: ResultEntry[]) => SVGSVGElement | null) {
	const s = SUMMARIES[cfg.id];
	const q = (k: string) => sheet.querySelector<HTMLElement>(`[data-cs="${k}"]`)!;
	const { result } = input;

	q('date').textContent = formatDate(input.date);
	q('name').textContent = input.name.trim();
	q('dob').textContent = input.dob.trim();

	const max = cfg.totalMax !== undefined ? ` out of ${formatTotal(cfg, cfg.totalMax)}` : '';
	q('total').textContent = result.total !== null ? `${s.totalLabel ?? 'Total'}: ${formatTotal(cfg, result.total)}${max}` : '';
	q('total').hidden = result.total === null;

	const listed = s.resultSubscores ? s.resultSubscores.map(k => cfg.subscores.find(d => d.key === k)!).filter(Boolean) : summarySubscores(cfg);
	const subs = listed.filter(d => result.subscores[d.key] !== undefined && !s.hideSubscores?.includes(d.key));
	const table = q('subscores');
	table.replaceChildren();
	table.hidden = subs.length === 0;
	if (subs.length) {
		const thead = el('thead');
		thead.append(row([s.subscoreHeading ?? 'Domain', 'Score', 'Maximum'], true));
		const tbody = el('tbody');
		for (const d of subs) tbody.append(row([d.sentenceLabel ?? d.label, d.format ? d.format(result.subscores[d.key]) : sub(cfg, result.subscores[d.key]), d.max !== undefined ? String(d.max) : '—']));
		table.append(thead, tbody);
	}
	q('outcome').textContent = s.outcome(result);

	// Change over time: only when earlier saved results exist. A long result
	// table (RAND-36, FUNCAP) leaves room for fewer history rows on one page.
	const { rows, hidden, hasEarlier } = historyRows(input, subs.length > 6 ? HISTORY_ROWS_LONG : HISTORY_ROWS);
	const history = q('history');
	history.hidden = !hasEarlier;
	const histTable = q('history-table');
	const chartSlot = q('chart');
	histTable.replaceChildren();
	chartSlot.replaceChildren();
	if (hasEarlier) {
		const keys = s.historySubscores ?? summarySubscores(cfg).slice(0, 6).map(d => d.key);
		const cols = keys.map(k => cfg.subscores.find(d => d.key === k)!).filter(Boolean);
		const thead = el('thead');
		thead.append(row(['Date', rows.some(e => e.total === null) ? 'Outcome' : 'Total', ...cols.map(c => c.label)], true));
		const tbody = el('tbody');
		for (const e of [...rows].reverse()) {
			const total = e.total !== null ? formatTotal(cfg, e.total) : cfg.outcome ? cfg.outcome(e) : e.band ?? '—';
			tbody.append(row([formatDate(e.date), total, ...cols.map(c => (c.format && e.subscores[c.key] !== undefined ? c.format(e.subscores[c.key]) : sub(cfg, e.subscores[c.key])))]));
		}
		histTable.append(thead, tbody);
		q('history-note').textContent = `${input.entries.length} saved ${input.entries.length === 1 ? 'result' : 'results'} on this device, newest first${hidden ? `; the ${hidden} oldest ${hidden === 1 ? 'is' : 'are'} not shown` : ''}.`;
		const chart = renderChart(cfg, input.entries);
		if (chart) chartSlot.append(chart);
	}
}

/** Fill the sheet, print it on its own, and count the print (tool id only). */
export function printSummary(root: HTMLElement, cfg: ToolConfig, input: Omit<SummaryInput, 'name' | 'dob'>, renderChart: (cfg: ToolConfig, e: ResultEntry[]) => SVGSVGElement | null) {
	const sheet = document.querySelector<HTMLElement>(`.cs-sheet[data-tool="${cfg.id}"]`);
	if (!sheet || !SUMMARIES[cfg.id]) return;
	const field = (n: string) => root.querySelector<HTMLInputElement>(`input[name="${n}"]`)?.value ?? '';
	fillSummary(sheet, cfg, { ...input, name: field('cs-name'), dob: field('cs-dob') }, renderChart);

	// Printed on its own: the sheet moves to the end of <body>, and the print
	// mode hides everything else until the dialog closes.
	if (sheet.parentElement !== document.body) document.body.append(sheet);
	const html = document.documentElement;
	html.dataset.print = 'summary';
	window.addEventListener('afterprint', () => { delete html.dataset.print; }, { once: true });
	trackEvent('clinician_summary_printed', { tool: cfg.id });
	window.print();
}
