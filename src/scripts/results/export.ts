// Export and share for saved results: plain text, CSV, and a share link that
// carries results in the URL fragment (never sent to the server).

import { formatDate, formatNumber, outcomeText } from './format';
import { isValidEntry, MAX_PER_TOOL } from './resultsStore';
import type { ResultEntry, ToolConfig } from './types';

export const SITE = 'https://www.postviralrecovery.com';

/** Longest fragment payload accepted when decoding a share link. */
export const MAX_SHARE_CHARS = 20000;

/** Plain text for pasting into an email or message, oldest result first. */
export function toText(cfg: ToolConfig, entries: ResultEntry[]): string {
	const lines = [`${cfg.name} results`, ''];
	for (const e of entries) lines.push(`${formatDate(e.date)}: ${e.summary || outcomeText(cfg, e)}`);
	lines.push('', `Source: ${SITE}${cfg.path}`);
	return lines.join('\n');
}

function csvCell(v: string | number | null | undefined): string {
	if (v === null || v === undefined) return '';
	const s = String(v);
	return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/**
 * CSV of the given entries, one row per result. Includes a `tool` column when
 * `withTool` is set (the my-results page exports every tool in one file).
 * Starts with a byte order mark so Excel reads it as UTF-8.
 */
export function toCsv(entries: ResultEntry[], configs: ToolConfig[], withTool = false): string {
	const byId = new Map(configs.map(c => [c.id, c]));
	const subCols: { key: string; label: string }[] = [];
	const seen = new Set<string>();
	// Every sub-score, including ones hidden from the on-screen table.
	for (const cfg of configs) for (const s of cfg.subscores) if (!seen.has(s.key)) { seen.add(s.key); subCols.push(s); }
	for (const e of entries) for (const k of Object.keys(e.subscores)) if (!seen.has(k)) { seen.add(k); subCols.push({ key: k, label: k }); }

	const header = [...(withTool ? ['tool'] : []), 'date', 'total', ...subCols.map(s => s.label), 'band', 'tool_version'];
	const rows = entries.map(e => {
		const cfg = byId.get(e.tool);
		const total = e.total === null ? (cfg ? outcomeText(cfg, e) : '') : formatNumber(e.total, cfg?.decimals ?? 2);
		return [
			...(withTool ? [e.tool] : []),
			e.date.replace('T', ' '),
			total,
			...subCols.map(s => (e.subscores[s.key] === undefined ? '' : formatNumber(e.subscores[s.key], 2))),
			e.band ?? '',
			e.toolVersion,
		].map(csvCell).join(',');
	});
	return '﻿' + [header.map(csvCell).join(','), ...rows].join('\r\n') + '\r\n';
}

export function csvFilename(tool: string, now = new Date()): string {
	const d = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
	return `${tool}-results-${d}.csv`;
}

// ── Share links ──

type Compact = [string, string, number | null, Record<string, number>, string | null, string];

function toBase64Url(text: string): string {
	const bytes = new TextEncoder().encode(text);
	let bin = '';
	for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
	return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): string {
	const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4);
	const bin = atob(b64);
	const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
	return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

export function encodeShare(tool: string, entries: ResultEntry[]): string {
	const e: Compact[] = entries.map(x => [x.toolVersion, x.date, x.total, x.subscores, x.band, x.summary]);
	return toBase64Url(JSON.stringify({ t: tool, e }));
}

export function shareUrl(cfg: ToolConfig, entries: ResultEntry[]): string {
	return `${SITE}${cfg.path}#r=${encodeShare(cfg.id, entries)}`;
}

/**
 * Decode a `#r=` fragment for this tool. Returns null for anything that is
 * missing, oversized, malformed, for another tool, or has no valid entries.
 * Data only: nothing in the fragment is ever executed or inserted as HTML.
 */
export function decodeShare(hash: string, tool: string): ResultEntry[] | null {
	try {
		const m = /^#?r=([A-Za-z0-9_-]+)$/.exec(hash);
		if (!m || m[1].length > MAX_SHARE_CHARS) return null;
		const data: unknown = JSON.parse(fromBase64Url(m[1]));
		if (!data || typeof data !== 'object') return null;
		const { t, e } = data as { t?: unknown; e?: unknown };
		if (t !== tool || !Array.isArray(e)) return null;
		const entries = e.slice(0, MAX_PER_TOOL).flatMap((row: unknown, i): ResultEntry[] => {
			if (!Array.isArray(row) || row.length !== 6) return [];
			const [toolVersion, date, total, subscores, band, summary] = row;
			const entry = { id: `shared-${i}`, tool, toolVersion, date, total, subscores, band, summary };
			return isValidEntry(entry) ? [entry] : [];
		});
		return entries.length ? entries.sort((a, b) => (a.date < b.date ? -1 : 1)) : null;
	} catch {
		return null;
	}
}
