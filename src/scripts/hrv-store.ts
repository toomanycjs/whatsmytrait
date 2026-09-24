// Client-side storage and maths for the HRV and resting heart rate tracker:
// /tools/trackers/hrv-tracker/
//
// Everything lives in localStorage on the user's device. Nothing is sent anywhere.

export const STORE_KEY = 'pvr-hrv-v1';

export interface Entry {
	date: string; // YYYY-MM-DD, one entry per date
	hrv?: number; // ms
	rhr?: number; // bpm
	note?: string;
}

export interface Store {
	v: 1;
	entries: Entry[]; // kept sorted by date ascending
}

export type Metric = 'hrv' | 'rhr';

export const LIMITS: Record<Metric, { min: number; max: number }> = {
	hrv: { min: 1, max: 300 },
	rhr: { min: 25, max: 200 },
};

// ── Persistence ──

export function loadStore(): Store {
	try {
		const raw = localStorage.getItem(STORE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed && parsed.v === 1 && Array.isArray(parsed.entries)) {
				parsed.entries = parsed.entries.filter(validEntry).sort(byDate);
				return parsed as Store;
			}
		}
	} catch { /* fall through */ }
	return { v: 1, entries: [] };
}

export function saveStore(store: Store): void {
	try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* quota or private mode */ }
}

export function clearStore(): void {
	try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
}

function validEntry(e: unknown): e is Entry {
	if (!e || typeof e !== 'object') return false;
	const x = e as Record<string, unknown>;
	return typeof x.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x.date)
		&& (typeof x.hrv === 'number' || typeof x.rhr === 'number');
}

function byDate(a: Entry, b: Entry): number {
	return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
}

/** Insert or merge an entry for its date. Returns true if a date already existed. */
export function upsertEntry(store: Store, entry: Entry): boolean {
	const clean: Entry = { date: entry.date };
	if (typeof entry.hrv === 'number' && Number.isFinite(entry.hrv)) clean.hrv = round1(entry.hrv);
	if (typeof entry.rhr === 'number' && Number.isFinite(entry.rhr)) clean.rhr = round1(entry.rhr);
	if (entry.note && entry.note.trim()) clean.note = entry.note.trim().slice(0, 200);

	const i = store.entries.findIndex(e => e.date === clean.date);
	if (i >= 0) {
		const existing = store.entries[i];
		store.entries[i] = {
			date: clean.date,
			hrv: clean.hrv ?? existing.hrv,
			rhr: clean.rhr ?? existing.rhr,
			note: clean.note ?? existing.note,
		};
		return true;
	}
	store.entries.push(clean);
	store.entries.sort(byDate);
	return false;
}

export function removeEntry(store: Store, date: string): void {
	store.entries = store.entries.filter(e => e.date !== date);
}

function round1(n: number): number { return Math.round(n * 10) / 10; }

// ── Dates ──

export function todayISO(): string {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Days since epoch for a YYYY-MM-DD string, ignoring time zones. */
export function dayNumber(iso: string): number {
	const [y, m, d] = iso.split('-').map(Number);
	return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

export function isoFromDayNumber(n: number): string {
	return new Date(n * 86400000).toISOString().slice(0, 10);
}

export function fmtDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }): string {
	const [y, m, d] = iso.split('-').map(Number);
	return new Date(y, m - 1, d).toLocaleDateString(undefined, opts);
}

export function fmtDateLong(iso: string): string {
	return fmtDate(iso, { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Statistics ──

export function median(values: number[]): number | undefined {
	if (values.length === 0) return undefined;
	const s = [...values].sort((a, b) => a - b);
	const mid = Math.floor(s.length / 2);
	return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/**
 * Median of a metric over the `windowDays` days ending on `endDate` (inclusive).
 * Returns undefined if fewer than `minCount` readings fall in the window.
 */
export function windowMedian(
	entries: Entry[], metric: Metric, endDate: string, windowDays: number, minCount: number,
): { value: number; count: number } | undefined {
	const end = dayNumber(endDate);
	const start = end - windowDays + 1;
	const values: number[] = [];
	for (const e of entries) {
		const v = e[metric];
		if (typeof v !== 'number') continue;
		const n = dayNumber(e.date);
		if (n >= start && n <= end) values.push(v);
	}
	if (values.length < minCount) return undefined;
	return { value: median(values) as number, count: values.length };
}

/** Rolling median series aligned to the entries that carry the metric. */
export function rollingMedian(
	entries: Entry[], metric: Metric, windowDays: number, minCount: number,
): { date: string; value: number }[] {
	const out: { date: string; value: number }[] = [];
	for (const e of entries) {
		if (typeof e[metric] !== 'number') continue;
		const m = windowMedian(entries, metric, e.date, windowDays, minCount);
		if (m) out.push({ date: e.date, value: m.value });
	}
	return out;
}

export function latest(entries: Entry[], metric: Metric): Entry | undefined {
	for (let i = entries.length - 1; i >= 0; i--) {
		if (typeof entries[i][metric] === 'number') return entries[i];
	}
	return undefined;
}

// ── CSV import ──

export interface ParsedTable {
	headers: string[];
	rows: string[][];
	hasHeader: boolean;
}

/** Split CSV or TSV text into rows. Handles quoted fields and both delimiters. */
export function parseDelimited(text: string): ParsedTable {
	const lines = text.replace(/^﻿/, '').split(/\r\n|\n|\r/).filter(l => l.trim() !== '');
	if (lines.length === 0) return { headers: [], rows: [], hasHeader: false };

	const sample = lines.slice(0, 5).join('\n');
	const counts = { ',': 0, '\t': 0, ';': 0 } as Record<string, number>;
	for (const ch of sample) if (ch in counts) counts[ch]++;
	const [delim, hits] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

	// No real delimiter: treat runs of whitespace as the separator, so a hand-typed
	// "2026-09-20 45 68" line works. Dates written with spaces need a comma or tab.
	const rows = hits > 0
		? lines.map(l => splitLine(l, delim).map(c => c.trim()))
		: lines.map(l => l.trim().split(/\s+/));
	const first = rows[0];
	// A header row is one where no cell parses as a number or a date.
	const hasHeader = first.every(c => c === '' || (!looksNumeric(c) && !parseDate(c, 'dmy')));
	const headers = hasHeader ? first : first.map((_, i) => `Column ${i + 1}`);
	const body = hasHeader ? rows.slice(1) : rows;
	const width = Math.max(headers.length, ...body.map(r => r.length));
	while (headers.length < width) headers.push(`Column ${headers.length + 1}`);
	return { headers, rows: body.map(r => { while (r.length < width) r.push(''); return r; }), hasHeader };
}

function splitLine(line: string, delim: string): string[] {
	const out: string[] = [];
	let cur = '';
	let q = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (q) {
			if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
			else if (ch === '"') q = false;
			else cur += ch;
		} else if (ch === '"') q = true;
		else if (ch === delim) { out.push(cur); cur = ''; }
		else cur += ch;
	}
	out.push(cur);
	return out;
}

export function looksNumeric(s: string): boolean {
	return /^-?\d+([.,]\d+)?\s*[a-zA-Z%]*$/.test(s.trim());
}

/** Pull the first number out of a cell like "45", "45.2 ms", "52,5". */
export function parseNumber(s: string): number | undefined {
	const m = s.trim().match(/-?\d+(?:[.,]\d+)?/);
	if (!m) return undefined;
	const n = parseFloat(m[0].replace(',', '.'));
	return Number.isFinite(n) ? n : undefined;
}

export type DateOrder = 'dmy' | 'mdy';

const MONTHS: Record<string, number> = {
	jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
};

/** Parse a date cell into YYYY-MM-DD, or undefined. */
export function parseDate(s: string, order: DateOrder): string | undefined {
	const t = s.trim();
	if (!t) return undefined;
	let m: RegExpMatchArray | null;

	// ISO: 2026-01-12, 2026-01-12T07:30:00Z, 2026/01/12 07:30
	if ((m = t.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:[T\s].*)?$/))) {
		return mk(+m[1], +m[2], +m[3]);
	}
	// Numeric day/month or month/day: 12/01/2026, 12-01-26, 12.01.2026, with optional time
	if ((m = t.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})(?:[T\s,].*)?$/))) {
		let y = +m[3];
		if (y < 100) y += 2000;
		const a = +m[1], b = +m[2];
		if (order === 'dmy') return mk(y, b, a);
		return mk(y, a, b);
	}
	// 12 Jan 2026, 12 January 2026, 12-Jan-26
	if ((m = t.match(/^(\d{1,2})[\s-]+([A-Za-z]{3,9})\.?[\s-,]+(\d{2,4})/))) {
		const mo = MONTHS[m[2].slice(0, 3).toLowerCase()];
		let y = +m[3]; if (y < 100) y += 2000;
		if (mo) return mk(y, mo, +m[1]);
	}
	// Jan 12, 2026 / January 12 2026 / Mon, Jan 12, 2026
	if ((m = t.match(/(?:^|,\s*)([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/))) {
		const mo = MONTHS[m[1].slice(0, 3).toLowerCase()];
		if (mo) return mk(+m[3], mo, +m[2]);
	}
	// Excel serial date (days since 1899-12-30)
	if (/^\d{5}$/.test(t)) {
		const n = +t;
		if (n > 30000 && n < 80000) return isoFromDayNumber(n - 25569);
	}
	return undefined;
}

function mk(y: number, mo: number, d: number): string | undefined {
	if (y < 1990 || y > 2100 || mo < 1 || mo > 12 || d < 1 || d > 31) return undefined;
	const dt = new Date(Date.UTC(y, mo - 1, d));
	if (dt.getUTCMonth() !== mo - 1) return undefined;
	return dt.toISOString().slice(0, 10);
}

/**
 * Look at the numeric date cells and decide whether they read day-first or
 * month-first. Returns undefined if nothing in the column settles it.
 */
export function detectDateOrder(cells: string[]): DateOrder | undefined {
	let dayFirst = false, monthFirst = false;
	for (const c of cells) {
		const m = c.trim().match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/);
		if (!m) continue;
		if (+m[1] > 12) dayFirst = true;
		if (+m[2] > 12) monthFirst = true;
	}
	if (dayFirst && !monthFirst) return 'dmy';
	if (monthFirst && !dayFirst) return 'mdy';
	return undefined;
}

/** True if the numeric date cells are all of the ambiguous d/m/y shape. */
export function hasSlashDates(cells: string[]): boolean {
	return cells.some(c => /^\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}/.test(c.trim()));
}

export interface ColumnGuess { date: number; hrv: number; rhr: number } // -1 = none

/** Guess which columns hold the date, HRV and RHR from their header names. */
export function guessColumns(headers: string[], rows: string[][]): ColumnGuess {
	const h = headers.map(x => x.toLowerCase().replace(/[_\-]+/g, ' ').trim());
	const find = (tests: RegExp[]): number => {
		for (const re of tests) {
			const i = h.findIndex(x => re.test(x));
			if (i >= 0) return i;
		}
		return -1;
	};
	let date = find([
		/^date$/, /^day$/, /calendar date/, /cycle start/, /^timestamp$/, /\bdate\b/, /\bday\b/, /^time$/, /timestamp/, /^sleep/,
	]);
	let hrv = find([
		/^hrv$/, /^rmssd$/, /average hrv/, /avg hrv/, /hrv \(ms\)/, /heart rate variability/, /nightly hrv|overnight hrv|sleep hrv|hrv status|hrv average|hrv balance/, /\bhrv\b/, /rmssd/, /variability/,
	]);
	let rhr = find([
		/^rhr$/, /^resting heart rate/, /resting hr/, /resting heart rate/, /lowest resting/, /\brhr\b/, /\bresting\b/,
	]);
	if (hrv >= 0 && rhr === hrv) rhr = -1;

	// No usable headers: fall back to the first date-like column and the numeric ones after it.
	if (date < 0) {
		const width = headers.length;
		for (let i = 0; i < width && date < 0; i++) {
			const sample = rows.slice(0, 10).map(r => r[i] ?? '');
			if (sample.filter(c => parseDate(c, 'dmy')).length >= Math.max(1, sample.length / 2)) date = i;
		}
	}
	if (hrv < 0 && rhr < 0 && date >= 0) {
		const numeric: number[] = [];
		for (let i = 0; i < headers.length; i++) {
			if (i === date) continue;
			const sample = rows.slice(0, 10).map(r => r[i] ?? '').filter(Boolean);
			if (sample.length && sample.every(looksNumeric)) numeric.push(i);
		}
		// Two numeric columns: assume HRV then RHR, the order of the site's own template.
		if (numeric.length >= 1) hrv = numeric[0];
		if (numeric.length >= 2) rhr = numeric[1];
	}
	return { date, hrv, rhr };
}

export interface ImportResult {
	entries: Entry[];
	skipped: number; // rows with no readable date or no readable value
	duplicates: number; // rows in the file that repeat a date (later wins)
}

/** Build clean entries from a parsed table and a column mapping. */
export function buildImport(table: ParsedTable, cols: ColumnGuess, order: DateOrder): ImportResult {
	const map = new Map<string, Entry>();
	let skipped = 0, duplicates = 0;
	for (const r of table.rows) {
		const date = cols.date >= 0 ? parseDate(r[cols.date] ?? '', order) : undefined;
		if (!date) { skipped++; continue; }
		const hrv = cols.hrv >= 0 ? clamp(parseNumber(r[cols.hrv] ?? ''), 'hrv') : undefined;
		const rhr = cols.rhr >= 0 ? clamp(parseNumber(r[cols.rhr] ?? ''), 'rhr') : undefined;
		if (hrv === undefined && rhr === undefined) { skipped++; continue; }
		if (map.has(date)) duplicates++;
		const prev = map.get(date);
		map.set(date, { date, hrv: hrv ?? prev?.hrv, rhr: rhr ?? prev?.rhr });
	}
	const entries = [...map.values()].sort(byDate);
	return { entries, skipped, duplicates };
}

function clamp(n: number | undefined, metric: Metric): number | undefined {
	if (n === undefined) return undefined;
	const { min, max } = LIMITS[metric];
	return n >= min && n <= max ? n : undefined;
}

/** Merge imported entries into the store. Returns how many dates were new vs updated. */
export function mergeImport(store: Store, entries: Entry[]): { added: number; updated: number } {
	let added = 0, updated = 0;
	for (const e of entries) {
		if (upsertEntry(store, e)) updated++; else added++;
	}
	return { added, updated };
}

// ── CSV export ──

export function buildCSV(store: Store): string {
	const esc = (s: string) => /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
	const lines = ['Date,HRV (ms),Resting heart rate (bpm),Note'];
	for (const e of store.entries) {
		lines.push([e.date, e.hrv ?? '', e.rhr ?? '', esc(e.note ?? '')].join(','));
	}
	return lines.join('\n');
}

export function downloadCSV(store: Store): void {
	const blob = new Blob([buildCSV(store)], { type: 'text/csv;charset=utf-8' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = `hrv-rhr-log-${todayISO()}.csv`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(a.href);
}
