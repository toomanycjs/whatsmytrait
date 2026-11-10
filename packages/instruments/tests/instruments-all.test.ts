// Every data file loads, and the smaller instruments match the counts their
// key pages give (items per scale, +keyed and -keyed). The two Big Five
// files have their own tests.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadInstrument, loadNorms } from '../src/load';
import { score } from '../src/score';
import type { Instrument, Responses } from '../src/instrument';

const dir = join(__dirname, '..', 'data');
const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
const load = (id: string): Instrument => loadInstrument(JSON.parse(readFileSync(join(dir, `${id}.json`), 'utf8')));

describe('every instrument file', () => {
	it.each(files)('%s loads and, if it names norms, its norms file loads against it', (file) => {
		const instrument = loadInstrument(JSON.parse(readFileSync(join(dir, file), 'utf8')));
		expect(instrument.id).toBe(file.replace(/\.json$/, ''));
		if (instrument.norms) {
			const norms = loadNorms(JSON.parse(readFileSync(join(dir, instrument.norms.file), 'utf8')), instrument);
			expect(Object.keys(norms.groups)).toEqual(expect.arrayContaining(instrument.norms.groups));
		}
	});
});

/** id: [scale id, +keyed, -keyed][] from the key pages, accessed 3 November 2026. */
const COUNTS: Record<string, [string, number, number][]> = {
	tipi: [['E', 1, 1], ['A', 1, 1], ['C', 1, 1], ['S', 1, 1], ['O', 1, 1]],
	rosenberg: [['SE', 5, 5]],
	'ipip-ei': [['PE', 6, 3], ['NE', 5, 5], ['AE', 5, 5], ['ED', 5, 4], ['RJ', 6, 4], ['RD', 5, 5], ['EC', 5, 5]],
	'ipip-ipc': [['PA', 4, 0], ['BC', 4, 0], ['DE', 4, 0], ['FG', 4, 0], ['HI', 4, 0], ['JK', 4, 0], ['LM', 4, 0], ['NO', 4, 0]],
	'ipip-assertiveness': [['T', 5, 5]],
	'ipip-orderliness': [['T', 5, 5]],
	'ipip-trust': [['T', 6, 4]],
	'ipip-patience': [['T', 5, 5]],
	'ipip-perfectionism': [['T', 8, 2]],
	'ipip-empathy': [['T', 7, 3]],
	'ipip-leadership': [['T', 4, 3]],
	'ipip-optimism': [['T', 4, 6]],
	'ipip-need-for-cognition': [['T', 6, 4]],
	'ipip-self-monitoring': [['T', 7, 3]],
	'ipip-shyness': [['T', 5, 5]],
	'ipip-locus-of-control': [['T', 10, 10]],
	'ipip-curiosity': [['T', 7, 3]],
	'ipip-perseverance': [['T', 5, 3]],
	'ipip-creativity': [['T', 5, 3]],
	'ipip-courage': [['T', 6, 4]],
	'ipip-emotional-stability-20': [['T', 5, 15]],
	'ipip-extraversion-20': [['T', 10, 10]],
	'onet-ip-short': [['R', 10, 0], ['I', 10, 0], ['A', 10, 0], ['S', 10, 0], ['E', 10, 0], ['C', 10, 0]],
};

describe('keyed item counts per scale, from the key pages', () => {
	for (const [id, scales] of Object.entries(COUNTS)) {
		it(id, () => {
			const instrument = load(id);
			for (const [sid, plus, minus] of scales) {
				const items = instrument.items.filter((it) => it.scale === sid);
				expect([sid, items.filter((it) => it.key === 1).length, items.filter((it) => it.key === -1).length]).toEqual([sid, plus, minus]);
			}
			expect(instrument.items).toHaveLength(scales.reduce((a, [, p, m]) => a + p + m, 0));
		});
	}
	it('the IPIP-VIA-R has 24 scales of two +keyed and two -keyed items', () => {
		const instrument = load('ipip-via-r');
		expect(instrument.scales).toHaveLength(24);
		for (const s of instrument.scales) {
			const items = instrument.items.filter((it) => it.scale === s.id);
			expect([s.id, items.filter((it) => it.key === 1).length, items.filter((it) => it.key === -1).length]).toEqual([s.id, 2, 2]);
		}
		expect(instrument.items).toHaveLength(96);
	});
});

describe('worked scoring examples', () => {
	it('TIPI: the average of two items, with the reverse item recoded, as the Gosling page shows', () => {
		// The page's example: Extraversion = (item 1 = 5, item 6 = 2 recoded to 6) / 2 = 5.5.
		const tipi = load('tipi');
		const r = score(tipi, { 1: 5, 2: 4, 3: 4, 4: 4, 5: 4, 6: 2, 7: 4, 8: 4, 9: 4, 10: 4 });
		expect(r.scales.E.raw).toBe(5.5);
		expect(r.scales.E.min).toBe(1);
		expect(r.scales.E.max).toBe(7);
	});

	it('Rosenberg: strongly agree first; all strongly agree scores 25 of 40, all agreeing with worth scores 40', () => {
		const rses = load('rosenberg');
		const all = (v: number): Responses => Object.fromEntries(rses.items.map((it) => [it.n, v]));
		// Option 1 is Strongly agree: +keyed items score 4, -keyed items score 1.
		expect(score(rses, all(1)).scales.SE.raw).toBe(5 * 4 + 5 * 1);
		const best: Responses = Object.fromEntries(rses.items.map((it) => [it.n, it.key === 1 ? 1 : 4]));
		expect(score(rses, best).scales.SE.raw).toBe(40);
		expect(score(rses, best).scales.SE.min).toBe(10);
	});

	it('O*NET: a check counts one, an empty box nought, per interest area', () => {
		const onet = load('onet-ip-short');
		const responses: Responses = Object.fromEntries(onet.items.map((it) => [it.n, it.scale === 'A' || it.n % 2 === 0 ? 2 : 1]));
		const r = score(onet, responses);
		expect(r.scales.A.raw).toBe(10);
		expect([r.scales.R.min, r.scales.R.max, r.scales.R.raw]).toEqual([0, 10, 5]);
		expect(r.complete).toBe(true);
	});
});

// The perfectionism test (test release T1), checked against the IPIP-HEXACO
// scoring key, https://ipip.ori.org/newHEXACO_PI_key.htm, 10 November 2026.
describe('ipip-perfectionism', () => {
	const inst = load('ipip-perfectionism');

	it('has the ten items of the key page, with items 9 and 10 reverse keyed', () => {
		expect(inst.items).toHaveLength(10);
		expect(inst.items.filter((i) => i.key < 0).map((i) => i.n)).toEqual([9, 10]);
		expect(inst.items[0].text).toBe('Pay attention to details.');
		expect(inst.items[9].text).toBe('Prefer to just let things happen.');
	});

	it("states the IPIP scale's own alpha from the comparison table, not the HEXACO-PI figure", () => {
		expect(inst.reliability?.T).toBe(0.72);
		expect(inst.reliabilitySource).toContain('newHEXACO_PI_table.htm');
	});

	it('scores a worked response set: reversed items count 6 minus the answer', () => {
		// Items 1 to 8 answered 4, 3, 5, 4, 2, 3, 4, 5 (sum 30); items 9 and 10
		// answered 2 and 4, which reverse to 4 and 2. Total 36 of a possible 10 to 50.
		const answers = [4, 3, 5, 4, 2, 3, 4, 5, 2, 4];
		const responses: Responses = Object.fromEntries(answers.map((a, i) => [i + 1, a]));
		const r = score(inst, responses).scales.T;
		expect(r.raw).toBe(36);
		expect(r.min).toBe(10);
		expect(r.max).toBe(50);
	});

	it('shares no statement with the patience facet, which comes from the same key page', () => {
		const patience = load('ipip-patience');
		const texts = new Set(patience.items.map((i) => i.text));
		expect(inst.items.some((i) => texts.has(i.text))).toBe(false);
		expect(patience.reliability?.T).toBe(0.8);
	});
});

// Test releases T2, T5, T6 and T7, checked against their key pages on
// 10 November 2026: reversed items, alpha, and one worked score each.
describe.each([
	{ id: 'ipip-empathy', reversed: [8, 9, 10], alpha: 0.8, first: "Feel others' emotions." },
	{ id: 'ipip-leadership', reversed: [5, 6, 7], alpha: 0.78, first: 'Try to make sure everyone in a group feels included.' },
	{ id: 'ipip-optimism', reversed: [5, 6, 7, 8, 9, 10], alpha: 0.86, first: 'Just know that I will be a success.' },
	{ id: 'ipip-need-for-cognition', reversed: [7, 8, 9, 10], alpha: 0.84, first: 'Like to solve complex problems.' },
	{ id: 'ipip-self-monitoring', reversed: [8, 9, 10], alpha: 0.82, first: 'Would make a good actor.' },
	{ id: 'ipip-shyness', reversed: [6, 7, 8, 9, 10], alpha: 0.86, first: 'Often feel uncomfortable around others.' },
	{ id: 'ipip-locus-of-control', reversed: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], alpha: 0.86, first: 'Feel comfortable with myself.' },
])('$id', ({ id, reversed, alpha, first }) => {
	const inst = load(id);

	it('has the key page items, reversed items and alpha', () => {
		expect(inst.items.filter((i) => i.key < 0).map((i) => i.n)).toEqual(reversed);
		expect(inst.items[0].text).toBe(first);
		expect(inst.reliability?.T).toBe(alpha);
	});

	it('scores every item answered 4 as 4 per scored-up item and 2 per reversed item', () => {
		const responses: Responses = Object.fromEntries(inst.items.map((i) => [i.n, 4]));
		const r = score(inst, responses).scales.T;
		expect(r.raw).toBe(4 * (inst.items.length - reversed.length) + 2 * reversed.length);
		expect(r.min).toBe(inst.items.length);
		expect(r.max).toBe(inst.items.length * 5);
	});
});

it('records the one spelling correction in the empathy scale', () => {
	const inst = load('ipip-empathy');
	expect(inst.items[6].text).toBe('Feel spiritually connected to other people.');
	expect(JSON.parse(readFileSync(join(dir, 'ipip-empathy.json'), 'utf8')).items_note).toContain('spiritally');
});

