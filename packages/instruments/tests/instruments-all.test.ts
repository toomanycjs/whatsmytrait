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
