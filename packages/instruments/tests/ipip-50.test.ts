// The IPIP-50 data file against the published key. The key page
// (https://ipip.ori.org/newBigFive5broadKey.htm) gives, per factor, how many
// items are +keyed and -keyed; the 50-item administration page gives each
// item's factor and key. Both are copied here independently of the data
// file, so a typo in the file fails this test.
import { describe, expect, it } from 'vitest';
import data from '../data/ipip-50.json';
import { loadInstrument } from '../src/load';
import { score } from '../src/score';
import type { Responses } from '../src/instrument';

const instrument = loadInstrument(data);

/** From the key page: +keyed and -keyed item counts per factor. */
const KEY_COUNTS = { E: { plus: 5, minus: 5 }, A: { plus: 6, minus: 4 }, C: { plus: 6, minus: 4 }, S: { plus: 2, minus: 8 }, I: { plus: 7, minus: 3 } };

/** From the 50-item page: the -keyed item numbers. */
const REVERSE_KEYED = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 29, 30, 32, 34, 36, 38, 39, 44, 46, 49];

/** From the 50-item page: the factor column cycles 1 to 5 (E, A, C, S, I) through all 50 items. */
const FACTOR_OF: Record<number, string> = {};
const CYCLE = ['E', 'A', 'C', 'S', 'I'];
for (let n = 1; n <= 50; n++) FACTOR_OF[n] = CYCLE[(n - 1) % 5];

const all = (value: number): Responses => Object.fromEntries(instrument.items.map((it) => [it.n, value]));

describe('IPIP-50 data file against the published key', () => {
	it('has 50 items numbered 1 to 50 in order', () => {
		expect(instrument.items.map((it) => it.n)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
	});

	it('assigns each item to the factor the 50-item page gives', () => {
		for (const it of instrument.items) expect([it.n, it.scale]).toEqual([it.n, FACTOR_OF[it.n]]);
	});

	it('reverse-keys exactly the items the 50-item page marks with a minus', () => {
		expect(instrument.items.filter((it) => it.key === -1).map((it) => it.n)).toEqual(REVERSE_KEYED);
	});

	it('matches the key page counts of +keyed and -keyed items per factor', () => {
		for (const [scale, counts] of Object.entries(KEY_COUNTS)) {
			const items = instrument.items.filter((it) => it.scale === scale);
			expect({ scale, plus: items.filter((it) => it.key === 1).length, minus: items.filter((it) => it.key === -1).length })
				.toEqual({ scale, ...counts });
		}
	});

	it('uses the five IPIP response labels', () => {
		expect(instrument.response.labels).toEqual(['Very Inaccurate', 'Moderately Inaccurate', 'Neither Accurate Nor Inaccurate', 'Moderately Accurate', 'Very Accurate']);
	});

	it('keeps the published wording, including American spellings and straight apostrophes', () => {
		const text = Object.fromEntries(instrument.items.map((it) => [it.n, it.text]));
		expect(text[1]).toBe('Am the life of the party.');
		expect(text[17]).toBe("Sympathize with others' feelings.");
		expect(text[41]).toBe("Don't mind being the center of attention.");
		expect(text[28]).toBe('Often forget to put things back in their proper place.');
		for (const it of instrument.items) {
			expect(it.text.endsWith('.')).toBe(true);
			expect(it.text).not.toMatch(/[‘’“”]/);
		}
	});

	it('states its licence, key source and reliability source', () => {
		expect(instrument.licence.url).toBe('https://ipip.ori.org/newPermission.htm');
		expect(instrument.source.keyUrl).toBe('https://ipip.ori.org/newBigFive5broadKey.htm');
		expect(instrument.reliability).toEqual({ E: 0.87, A: 0.82, C: 0.79, S: 0.86, I: 0.84 });
		expect(instrument.reliabilitySource).toContain('newBigFive5broadKey');
		expect(instrument.norms).toBeNull();
	});
});

describe('IPIP-50 scoring, worked from the scoring instructions', () => {
	// Scoring page: +keyed Very Inaccurate=1 ... Very Accurate=5; -keyed the reverse; scale score is the sum.
	it('scores every item Very Accurate as 5 per +keyed item and 1 per -keyed item', () => {
		const r = score(instrument, all(5));
		expect(r.complete).toBe(true);
		expect(Object.fromEntries(Object.entries(r.scales).map(([k, v]) => [k, v.raw]))).toEqual({
			E: 5 * 5 + 5 * 1,
			A: 6 * 5 + 4 * 1,
			C: 6 * 5 + 4 * 1,
			S: 2 * 5 + 8 * 1,
			I: 7 * 5 + 3 * 1,
		});
	});

	it('scores every item Very Inaccurate as the mirror image', () => {
		const r = score(instrument, all(1));
		expect(Object.fromEntries(Object.entries(r.scales).map(([k, v]) => [k, v.raw]))).toEqual({ E: 30, A: 26, C: 26, S: 42, I: 22 });
	});

	it('scores the neutral response as 30 on every scale, the midpoint of 10 to 50', () => {
		const r = score(instrument, all(3));
		for (const s of Object.values(r.scales)) expect([s.raw, s.min, s.max]).toEqual([30, 10, 50]);
	});

	it('reaches 50 on Extraversion only by agreeing with the +keyed and disagreeing with the -keyed items', () => {
		const responses: Responses = {};
		for (const it of instrument.items) responses[it.n] = it.key === 1 ? 5 : 1;
		const r = score(instrument, responses);
		for (const s of Object.values(r.scales)) expect(s.raw).toBe(50);
	});

	it('reports an incomplete attempt', () => {
		const responses = all(4);
		delete responses[6];
		const r = score(instrument, responses);
		expect(r.complete).toBe(false);
		expect(r.scales.E.answered).toBe(9);
		expect(r.scales.A.answered).toBe(10);
	});
});
