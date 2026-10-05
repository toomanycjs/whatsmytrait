// Formatting shared by the history block, exports and the my-results page.

import type { Band, ResultEntry, ScoreResult, ToolConfig } from './types';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "2 July 2026". Parses a stored local date-time without timezone shifts. */
export function formatDate(iso: string): string {
	const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
	return `${d} ${MONTHS[m - 1]} ${y}`;
}

export const isSameDay = (iso: string, now: Date) =>
	iso.slice(0, 10) === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

/** A number to the tool's precision, without trailing zeros: 34, 47.3, 3.25. */
export function formatNumber(n: number, decimals = 0): string {
	return String(Number(n.toFixed(decimals)));
}

export const formatTotal = (cfg: ToolConfig, n: number) => formatNumber(n, cfg.decimals ?? 0);

/** Rounded difference, so "down 0.1" never shows as "down 0.10000001". */
export function roundedDiff(cfg: ToolConfig, from: number, to: number): number {
	const f = 10 ** (cfg.decimals ?? 0);
	return Math.round((to - from) * f) / f;
}

/** "down 11 points", "up 1 point", "no change". */
export function changeText(cfg: ToolConfig, diff: number): string {
	if (diff === 0) return 'no change';
	const size = formatTotal(cfg, Math.abs(diff));
	return `${diff < 0 ? 'down' : 'up'} ${size} ${size === '1' ? 'point' : 'points'}`;
}

export function findBand(cfg: ToolConfig, total: number | null): Band | null {
	if (total === null || !cfg.bands) return null;
	return cfg.bands.find(b => total >= b.min && total <= b.max) ?? null;
}

/** The total, or for criteria-based instruments the outcome text. */
export function outcomeText(cfg: ToolConfig, e: Pick<ResultEntry, 'total' | 'subscores' | 'band'>): string {
	if (e.total !== null) return formatTotal(cfg, e.total);
	return cfg.outcome ? cfg.outcome(e) : e.band ?? '';
}

/** Whether a change is larger than the published minimal important change, as a clause. */
export function micClause(cfg: ToolConfig, diff: number): string {
	if (!cfg.mic) return '';
	const size = Math.abs(diff);
	const relation = size > cfg.mic.value ? 'larger than' : size === cfg.mic.value ? 'equal to' : 'smaller than';
	return `That change is ${relation} the published minimal important change of ${formatNumber(cfg.mic.value, 2)} points.`;
}

/**
 * "34 on 2 July 2026, 23 today: down 11 points." Adds the minimal important
 * change clause only where one is published.
 */
export function comparisonSentence(cfg: ToolConfig, prev: ResultEntry, latest: ResultEntry, now = new Date()): string {
	const when = isSameDay(latest.date, now) ? 'today' : `on ${formatDate(latest.date)}`;
	if (prev.total !== null && latest.total !== null) {
		const diff = roundedDiff(cfg, prev.total, latest.total);
		const sentence = `${formatTotal(cfg, prev.total)} on ${formatDate(prev.date)}, ${formatTotal(cfg, latest.total)} ${when}: ${changeText(cfg, diff)}.`;
		const mic = micClause(cfg, diff);
		return mic ? `${sentence} ${mic}` : sentence;
	}
	const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
	return `On ${formatDate(prev.date)}: ${outcomeText(cfg, prev)}. ${cap(when)}: ${outcomeText(cfg, latest)}.`;
}

/** The one-line summary stored with each entry and used in text exports. */
export function defaultSummary(cfg: ToolConfig, r: ScoreResult): string {
	const parts: string[] = [];
	const head = r.total !== null
		? `${cfg.name} ${formatTotal(cfg, r.total)}${cfg.totalMax !== undefined ? ` out of ${cfg.totalMax}` : ''}`
		: `${cfg.name}: ${outcomeText(cfg, { total: null, subscores: r.subscores, band: r.band ?? null })}`;
	parts.push(head);
	const subs = cfg.subscores
		.filter(s => s.inTable !== false && r.subscores[s.key] !== undefined)
		.map(s => (s.format ? `${s.label}: ${s.format(r.subscores[s.key])}` : `${s.sentenceLabel ?? s.label} ${formatNumber(r.subscores[s.key], 1)}`));
	if (subs.length) parts.push(subs.join(', '));
	return parts.join('. ').slice(0, 500);
}
