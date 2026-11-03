import { describe, expect, it } from 'vitest';
import {
	deleteAll, deleteEntry, deleteTool, isAvailable, isValidEntry, localIso, MAX_PER_TOOL,
	readAll, readTool, saveEntry, STORE_KEY, type StorageLike,
} from '../src/store';
import type { ResultEntry } from '../src/types';

function memoryStorage(initial?: Record<string, string>): StorageLike & { data: Map<string, string> } {
	const data = new Map(Object.entries(initial ?? {}));
	return {
		data,
		getItem: k => data.get(k) ?? null,
		setItem: (k, v) => { data.set(k, v); },
		removeItem: k => { data.delete(k); },
	};
}

const throwing: StorageLike = {
	getItem: () => { throw new Error('SecurityError'); },
	setItem: () => { throw new Error('QuotaExceededError'); },
	removeItem: () => { throw new Error('SecurityError'); },
};

let n = 0;
function entry(over: Partial<ResultEntry> = {}): ResultEntry {
	n++;
	return {
		id: `id-${n}`,
		tool: 'big-five',
		toolVersion: '2',
		date: `2026-01-01T10:00:${String(n % 60).padStart(2, '0')}`,
		total: 30,
		subscores: { extraversion: 12 },
		band: null,
		summary: 'Big Five 30',
		...over,
	};
}

describe('resultsStore', () => {
	it('saves and reads back, oldest first, filtered by tool', () => {
		const s = memoryStorage();
		expect(saveEntry(entry({ id: 'b', date: '2026-03-01T09:00:00' }), s)).toBe(true);
		expect(saveEntry(entry({ id: 'a', date: '2026-02-01T09:00:00' }), s)).toBe(true);
		expect(saveEntry(entry({ id: 'c', tool: 'self-esteem', date: '2026-01-01T09:00:00' }), s)).toBe(true);
		expect(readTool('big-five', s).map(e => e.id)).toEqual(['a', 'b']);
		expect(readAll(s).map(e => e.id)).toEqual(['c', 'a', 'b']);
		expect(Array.isArray(JSON.parse(s.data.get(STORE_KEY)!))).toBe(true);
	});

	it('replaces an entry with the same id', () => {
		const s = memoryStorage();
		saveEntry(entry({ id: 'x', total: 10 }), s);
		saveEntry(entry({ id: 'x', total: 20 }), s);
		const all = readAll(s);
		expect(all).toHaveLength(1);
		expect(all[0].total).toBe(20);
	});

	it(`caps each tool at ${MAX_PER_TOOL} entries, dropping the oldest, without touching other tools`, () => {
		const s = memoryStorage();
		saveEntry(entry({ id: 'other', tool: 'self-esteem', date: '2020-01-01T00:00:00' }), s);
		for (let i = 0; i < MAX_PER_TOOL + 5; i++) {
			const d = new Date(2026, 0, 1 + i, 9);
			saveEntry(entry({ id: `e${i}`, date: localIso(d) }), s);
		}
		const tool = readTool('big-five', s);
		expect(tool).toHaveLength(MAX_PER_TOOL);
		expect(tool[0].id).toBe('e5');
		expect(tool[tool.length - 1].id).toBe(`e${MAX_PER_TOOL + 4}`);
		expect(readTool('self-esteem', s)).toHaveLength(1);
	});

	it('accepts null totals for instruments with no single total', () => {
		const s = memoryStorage();
		expect(saveEntry(entry({ tool: 'career-interests', total: null, band: 'RIA' }), s)).toBe(true);
		expect(readTool('career-interests', s)[0].total).toBeNull();
	});

	it('ignores invalid entries and corrupt data instead of throwing', () => {
		const good = entry({ id: 'good' });
		const s = memoryStorage({ [STORE_KEY]: JSON.stringify([good, { id: 'bad' }, null, 7, { ...good, id: 'nan', total: 'x' }, { ...good, id: 'baddate', date: 'yesterday' }]) });
		expect(readAll(s).map(e => e.id)).toEqual(['good']);
		expect(readAll(memoryStorage({ [STORE_KEY]: '{not json' }))).toEqual([]);
		expect(readAll(memoryStorage({ [STORE_KEY]: '{"v":1}' }))).toEqual([]);
		expect(saveEntry({ ...good, id: '' }, memoryStorage())).toBe(false);
	});

	it('migrates entries missing optional fields', () => {
		const old = { id: 'old', tool: 'big-five', toolVersion: 1, date: '2026-01-01T09:00:00', total: 12, subscores: { openness: 3 } };
		const s = memoryStorage({ [STORE_KEY]: JSON.stringify([old]) });
		const [e] = readAll(s);
		expect(e).toMatchObject({ id: 'old', toolVersion: '1', band: null, summary: '' });
		expect(isValidEntry(e)).toBe(true);
	});

	it('works silently when storage is unavailable', () => {
		for (const s of [throwing, null]) {
			expect(isAvailable(s)).toBe(false);
			expect(readAll(s)).toEqual([]);
			expect(readTool('big-five', s)).toEqual([]);
			expect(saveEntry(entry(), s)).toBe(false);
			expect(deleteEntry('x', s)).toBe(false);
			expect(() => deleteAll(s)).not.toThrow();
		}
		expect(isAvailable(memoryStorage())).toBe(true);
	});

	it('deletes one entry, one tool, or everything', () => {
		const s = memoryStorage();
		saveEntry(entry({ id: 'a' }), s);
		saveEntry(entry({ id: 'b' }), s);
		saveEntry(entry({ id: 'c', tool: 'self-esteem' }), s);
		deleteEntry('a', s);
		expect(readAll(s).map(e => e.id).sort()).toEqual(['b', 'c']);
		deleteTool('big-five', s);
		expect(readAll(s).map(e => e.id)).toEqual(['c']);
		deleteAll(s);
		expect(s.data.has(STORE_KEY)).toBe(false);
	});

	it('formats local date-times without an offset', () => {
		expect(localIso(new Date(2026, 6, 2, 9, 5, 3))).toBe('2026-07-02T09:05:03');
	});
});
