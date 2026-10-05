// Client-side store for saved questionnaire results, shared by every tool page
// and the my-results page.
//
// Everything lives in localStorage on the user's device, under one versioned
// key holding a JSON array of entries. Nothing is sent anywhere. Every access
// is wrapped in try/catch: Safari private windows and locked-down browsers can
// throw on localStorage, and the page must keep working with history silently
// unavailable.

import type { ResultEntry } from './types';

export const STORE_KEY = 'pvr:results:v1';
export const MAX_PER_TOOL = 100;

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function resolve(storage?: StorageLike | null): StorageLike | null {
	if (storage !== undefined) return storage;
	try {
		return globalThis.localStorage ?? null;
	} catch {
		return null;
	}
}

/** True when the store can be both written and read back. */
export function isAvailable(storage?: StorageLike | null): boolean {
	try {
		const s = resolve(storage);
		if (!s) return false;
		const probe = 'pvr:probe';
		s.setItem(probe, '1');
		const ok = s.getItem(probe) === '1';
		s.removeItem(probe);
		return ok;
	} catch {
		return false;
	}
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;

const isShortString = (x: unknown, max: number, allowEmpty = false): x is string =>
	typeof x === 'string' && x.length <= max && (allowEmpty || x.length > 0);

export function isValidEntry(x: unknown): x is ResultEntry {
	if (!x || typeof x !== 'object' || Array.isArray(x)) return false;
	const e = x as Record<string, unknown>;
	if (!isShortString(e.id, 64) || !isShortString(e.tool, 64) || !isShortString(e.toolVersion, 32)) return false;
	if (typeof e.date !== 'string' || !DATE_RE.test(e.date) || isNaN(new Date(e.date).getTime())) return false;
	if (e.total !== null && (typeof e.total !== 'number' || !Number.isFinite(e.total))) return false;
	if (e.band !== null && !isShortString(e.band, 120)) return false;
	if (!isShortString(e.summary, 500, true)) return false;
	if (!e.subscores || typeof e.subscores !== 'object' || Array.isArray(e.subscores)) return false;
	const subs = Object.entries(e.subscores as Record<string, unknown>);
	if (subs.length > 50) return false;
	return subs.every(([k, v]) => k.length > 0 && k.length <= 64 && typeof v === 'number' && Number.isFinite(v));
}

/**
 * Bring an entry up to the current shape where that is simple: fill optional
 * fields that may be missing. Anything still invalid afterwards is dropped.
 */
export function migrateEntry(x: unknown): unknown {
	if (!x || typeof x !== 'object' || Array.isArray(x)) return x;
	const e = { ...(x as Record<string, unknown>) };
	if (e.band === undefined) e.band = null;
	if (e.summary === undefined) e.summary = '';
	if (e.subscores === undefined) e.subscores = {};
	if (e.total === undefined) e.total = null;
	if (typeof e.toolVersion === 'number') e.toolVersion = String(e.toolVersion);
	return e;
}

const byDate = (a: ResultEntry, b: ResultEntry) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0);

/** Every valid stored entry, all tools, oldest first. Invalid entries are ignored, not thrown on. */
export function readAll(storage?: StorageLike | null): ResultEntry[] {
	try {
		const s = resolve(storage);
		const raw = s?.getItem(STORE_KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.map(migrateEntry).filter(isValidEntry).sort(byDate);
	} catch {
		return [];
	}
}

function writeAll(entries: ResultEntry[], storage?: StorageLike | null): boolean {
	try {
		const s = resolve(storage);
		if (!s) return false;
		s.setItem(STORE_KEY, JSON.stringify(entries));
		return true;
	} catch {
		return false;
	}
}

/** One tool's entries, oldest first. */
export function readTool(tool: string, storage?: StorageLike | null): ResultEntry[] {
	return readAll(storage).filter(e => e.tool === tool);
}

/**
 * Add an entry, or replace the stored entry with the same id. Keeps at most
 * MAX_PER_TOOL entries per tool, dropping the oldest. Returns false if the
 * entry is invalid or storage is unavailable.
 */
export function saveEntry(entry: ResultEntry, storage?: StorageLike | null): boolean {
	if (!isValidEntry(entry)) return false;
	const all = readAll(storage).filter(e => e.id !== entry.id);
	all.push(entry);
	all.sort(byDate);
	const forTool = all.filter(e => e.tool === entry.tool);
	const excess = new Set(forTool.slice(0, Math.max(0, forTool.length - MAX_PER_TOOL)).map(e => e.id));
	return writeAll(all.filter(e => !excess.has(e.id)), storage);
}

export function deleteEntry(id: string, storage?: StorageLike | null): boolean {
	return writeAll(readAll(storage).filter(e => e.id !== id), storage);
}

export function deleteTool(tool: string, storage?: StorageLike | null): boolean {
	return writeAll(readAll(storage).filter(e => e.tool !== tool), storage);
}

export function deleteAll(storage?: StorageLike | null): boolean {
	try {
		resolve(storage)?.removeItem(STORE_KEY);
		return true;
	} catch {
		return false;
	}
}

export function newId(): string {
	try {
		if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
	} catch { /* fall through */ }
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Local date-time as ISO 8601 without an offset, to the second. */
export function localIso(d = new Date()): string {
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
