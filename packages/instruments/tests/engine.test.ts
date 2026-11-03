// The engine against a small made-up instrument: validation, item values,
// facets rolling up to domains, mean scoring, screens, percentiles and the
// attempt autosave. The IPIP-50 file has its own test.
import { describe, expect, it } from 'vitest';
import type { Instrument, NormTable } from '../src/instrument';
import { loadInstrument, loadNorms } from '../src/load';
import { density, interquartile, ordinal, percentile, scoreAtPercentile } from '../src/percentile';
import { minutes, screens } from '../src/plan';
import { itemValue, score, unanswered } from '../src/score';
import { attemptKey, clearAttempt, readAttempt, saveAttempt } from '../src/attempt';
import type { StorageLike } from '../src/store';

const base = () => ({
	id: 'demo',
	version: 2,
	name: 'Demo scale',
	source: { paper: 'Someone (2020). A paper', keyUrl: 'https://example.org/key', accessed: '2026-11-03' },
	licence: { text: 'Public domain', url: 'https://example.org/licence' },
	response: { type: 'likert', points: 5, labels: ['a', 'b', 'c', 'd', 'e'] },
	scales: [
		{ id: 'D', name: 'Domain', facets: ['D1', 'D2'] },
		{ id: 'D1', name: 'Facet one', parent: 'D' },
		{ id: 'D2', name: 'Facet two', parent: 'D' },
		{ id: 'X', name: 'Other' },
	],
	items: [
		{ n: 1, text: 'One.', scale: 'D1', key: 1 },
		{ n: 2, text: 'Two.', scale: 'D2', key: -1 },
		{ n: 3, text: 'Three.', scale: 'X', key: 1 },
		{ n: 4, text: 'Four.', scale: 'D1', key: -1 },
	],
	scoring: { method: 'sum', reverse: 'points+1-x' },
	norms: null,
});

const demo = loadInstrument(base());

describe('loadInstrument', () => {
	it('accepts a well-formed file', () => {
		expect(demo.id).toBe('demo');
		expect(demo.items).toHaveLength(4);
	});

	it.each([
		['a duplicate item number', (d: any) => { d.items[1].n = 1; }, 'unique'],
		['items out of order', (d: any) => { d.items[2].n = 10; d.items[3].n = 9; }, 'ascending'],
		['an unknown scale', (d: any) => { d.items[0].scale = 'Q'; }, 'does not exist'],
		['a bad key', (d: any) => { d.items[0].key = 2; }, 'key must be 1 or -1'],
		['the wrong number of labels', (d: any) => { d.response.labels = ['a', 'b']; }, 'exactly 5 labels'],
		['a scale with no items', (d: any) => { d.scales.push({ id: 'Z', name: 'Empty' }); }, 'has no items'],
		['a facet whose parent is wrong', (d: any) => { d.scales[2].parent = 'X'; }, 'must name D as its parent'],
		['padded item text', (d: any) => { d.items[0].text = ' One.'; }, 'leading or trailing space'],
		['reliability without its source', (d: any) => { d.reliability = { X: 0.8 }; }, 'reliabilitySource'],
		['a missing accessed date', (d: any) => { delete d.source.accessed; }, 'accessed'],
	])('rejects %s', (_, mutate, message) => {
		const d = base();
		mutate(d);
		expect(() => loadInstrument(d)).toThrow(message);
	});
});

describe('scoring', () => {
	it('reverses -keyed items as points+1-x', () => {
		expect(itemValue(demo, demo.items[0], 4)).toBe(4);
		expect(itemValue(demo, demo.items[1], 4)).toBe(2);
		expect(() => itemValue(demo, demo.items[0], 6)).toThrow(RangeError);
		expect(() => itemValue(demo, demo.items[0], 0)).toThrow(RangeError);
	});

	it('rolls facets up into their domain', () => {
		const r = score(demo, { 1: 5, 2: 1, 3: 3, 4: 2 });
		expect(r.scales.D1).toEqual({ raw: 5 + 4, answered: 2, of: 2, min: 2, max: 10 });
		expect(r.scales.D2).toEqual({ raw: 5, answered: 1, of: 1, min: 1, max: 5 });
		expect(r.scales.D).toEqual({ raw: 14, answered: 3, of: 3, min: 3, max: 15 });
		expect(r.scales.X.raw).toBe(3);
		expect(r.complete).toBe(true);
	});

	it('lists unanswered items in order and marks the result incomplete', () => {
		const r = score(demo, { 1: 5, 3: 3 });
		expect(r.complete).toBe(false);
		expect(unanswered(demo, { 1: 5, 3: 3 })).toEqual([2, 4]);
	});

	it('averages for mean-scored instruments', () => {
		const m = loadInstrument({ ...base(), scoring: { method: 'mean', reverse: 'points+1-x' } });
		const r = score(m, { 1: 5, 2: 1, 3: 3, 4: 2 });
		expect(r.scales.D).toEqual({ raw: 14 / 3, answered: 3, of: 3, min: 1, max: 5 });
	});
});

describe('screens and minutes', () => {
	it('groups items ten per screen in published order', () => {
		const items = Array.from({ length: 23 }, (_, i) => ({ n: i + 1, text: `Item ${i + 1}.`, scale: 'X', key: 1 as const }));
		const big = loadInstrument({ ...base(), scales: [{ id: 'X', name: 'Other' }], items });
		const s = screens(big);
		expect(s.map((x) => x.items.length)).toEqual([10, 10, 3]);
		expect(s[2].index).toBe(3);
		expect(s[1].items[0].n).toBe(11);
		expect(minutes(big)).toBe(2);
		expect(minutes(demo)).toBe(1);
	});
});

describe('percentiles', () => {
	// Ten people on scale X (1 to 5): one 1, two 2s, four 3s, two 4s, one 5.
	const table: NormTable = loadNorms({
		instrument: 'demo',
		version: 2,
		source: { name: 'made up', url: 'https://example.org/data', inputSha256: 'abc', generated: '2026-11-03', script: 'none' },
		groups: { all: { label: 'Everyone', n: 10, scales: { X: { min: 1, counts: [1, 2, 4, 2, 1] } } } },
	}, demo);

	it('uses the mid-rank definition', () => {
		expect(percentile(table, 'X', 'all', 1)).toBe(5);
		expect(percentile(table, 'X', 'all', 2)).toBe(20);
		expect(percentile(table, 'X', 'all', 3)).toBe(50);
		expect(percentile(table, 'X', 'all', 5)).toBe(95);
	});

	it('clamps scores outside the table, and never shows 0 or 100', () => {
		expect(percentile(table, 'X', 'all', 0)).toBe(1);
		expect(percentile(table, 'X', 'all', 9)).toBe(99);
	});

	it('finds the score at a percentile and the middle 50%', () => {
		expect(scoreAtPercentile(table, 'X', 'all', 50)).toBe(3);
		expect(scoreAtPercentile(table, 'X', 'all', 10)).toBe(1);
		expect(interquartile(table, 'X', 'all')).toEqual({ q1: 2, median: 3, q3: 4 });
		expect(density(table, 'X', 'all').map((d) => d.share)).toEqual([0.1, 0.2, 0.4, 0.2, 0.1]);
	});

	it('refuses a norms file whose counts disagree with n or that names an unknown scale', () => {
		const bad = { instrument: 'demo', version: 2, source: table.source, groups: { all: { label: 'Everyone', n: 9, scales: { X: { min: 1, counts: [1, 2, 4, 2, 1] } } } } };
		expect(() => loadNorms(bad, demo)).toThrow('counts sum to 10');
		const unknown = { ...bad, groups: { all: { label: 'Everyone', n: 10, scales: { Q: { min: 1, counts: [10] } } } } };
		expect(() => loadNorms(unknown, demo)).toThrow('unknown scale Q');
		expect(() => loadNorms({ ...bad, version: 1 }, demo)).toThrow('version 1');
	});

	it('writes ordinals', () => {
		expect([1, 2, 3, 4, 11, 12, 13, 21, 72, 100].map(ordinal)).toEqual(['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '72nd', '100th']);
	});
});

describe('attempt autosave', () => {
	function memory(): StorageLike & { data: Map<string, string> } {
		const data = new Map<string, string>();
		return { data, getItem: (k) => data.get(k) ?? null, setItem: (k, v) => { data.set(k, v); }, removeItem: (k) => { data.delete(k); } };
	}

	it('saves and restores under a versioned key', () => {
		const s = memory();
		expect(saveAttempt(demo, { 1: 4, 2: 2 }, 1, s, new Date(2026, 10, 3, 9, 5, 7))).toBe(true);
		expect(attemptKey(demo)).toBe('tests:attempt:demo:v2');
		expect(readAttempt(demo, s)).toEqual({ responses: { 1: 4, 2: 2 }, screen: 1, saved: '2026-11-03T09:05:07' });
		const other: Instrument = { ...demo, version: 3 };
		expect(readAttempt(other, s)).toBeNull();
	});

	it('removes the attempt when there are no responses, and on clear', () => {
		const s = memory();
		saveAttempt(demo, { 1: 4 }, 1, s);
		saveAttempt(demo, {}, 1, s);
		expect(s.data.has(attemptKey(demo))).toBe(false);
		saveAttempt(demo, { 1: 4 }, 2, s);
		clearAttempt(demo, s);
		expect(readAttempt(demo, s)).toBeNull();
	});

	it('ignores corrupt or out-of-range saved data', () => {
		const s = memory();
		s.setItem(attemptKey(demo), '{not json');
		expect(readAttempt(demo, s)).toBeNull();
		s.setItem(attemptKey(demo), JSON.stringify({ responses: { 1: 9 }, screen: 1, saved: 'x' }));
		expect(readAttempt(demo, s)).toBeNull();
		s.setItem(attemptKey(demo), JSON.stringify({ responses: { 99: 3 }, screen: 1, saved: 'x' }));
		expect(readAttempt(demo, s)).toBeNull();
	});

	it('is silent without storage', () => {
		expect(saveAttempt(demo, { 1: 1 }, 1, null)).toBe(false);
		expect(readAttempt(demo, null)).toBeNull();
		expect(() => clearAttempt(demo, null)).not.toThrow();
	});
});
