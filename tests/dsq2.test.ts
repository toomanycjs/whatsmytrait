import { describe, expect, it } from 'vitest';
import { SYMPTOMS } from '../src/tools/dsq-2.items';
import { domainScores, scoreCaseDefinitions, sf36Subscales, type DsqAnswers } from '../src/tools/dsq-2.scoring';

const ALL = Object.keys(SYMPTOMS).map(Number);

/** No symptoms, ill for 1-2 years, not lifelong, light activity, healthy SF-36 answers. */
function base(): DsqAnswers {
	return {
		freq: Object.fromEntries(ALL.map(n => [n, 0])),
		sev: Object.fromEntries(ALL.map(n => [n, 0])),
		codes: { q63a: 2, q92: 0, q93: 0, q94: 3, q106: 3, q127: 0, q128: 0, q129: 0 },
		hours: { q119a: 5, q119d: 0 },
		rand: { 13: 2, 14: 2, 15: 2, 16: 2, 20: 1, 32: 5, 23: 1, 27: 1, 29: 6, 31: 6 },
	};
}
const set = (a: DsqAnswers, items: number[], f: number, s = f) => { for (const n of items) { a.freq[n] = f; a.sev[n] = s; } return a; };
/** SF-36 answers giving role physical 0, social functioning 0, vitality 0. */
const impaired = (a: DsqAnswers) => { a.rand = { 13: 1, 14: 1, 15: 1, 16: 1, 20: 5, 32: 1, 23: 6, 27: 6, 29: 1, 31: 1 }; return a; };
const get = (a: DsqAnswers, key: string) => scoreCaseDefinitions(a).find(d => d.key === key)!;

describe('SF-36 subscales (RAND scoring)', () => {
	it('scores best and worst answers as 100 and 0', () => {
		expect(sf36Subscales(base().rand)).toEqual({ rolePhysical: 100, socialFunctioning: 100, vitality: 100 });
		expect(sf36Subscales(impaired(base()).rand)).toEqual({ rolePhysical: 0, socialFunctioning: 0, vitality: 0 });
	});
	it('averages within a subscale', () => {
		const r = { ...base().rand, 13: 1, 14: 1, 15: 2, 16: 2, 20: 3, 32: 3, 23: 4, 27: 4, 29: 3, 31: 3 };
		expect(sf36Subscales(r)).toEqual({ rolePhysical: 50, socialFunctioning: 50, vitality: 40 });
	});
});

describe('no symptoms', () => {
	it('meets no definition', () => {
		expect(scoreCaseDefinitions(base()).every(d => !d.met)).toBe(true);
	});
});

describe('IOM 2015', () => {
	const iomCase = () => set(set(set(impaired(base()), [18], 3), [20], 2), [36], 2);
	it('is met by reduction, 6 months, PEM, unrefreshing sleep (any of 19-22, 24) and cognitive problems', () => {
		expect(get(iomCase(), 'iom').met).toBe(true);
	});
	it('does not require the fatigue item itself', () => {
		const a = iomCase();
		a.freq[13] = 0; a.sev[13] = 0;
		expect(get(a, 'iom').met).toBe(true);
	});
	it('accepts orthostatic intolerance instead of cognitive problems, including Q90', () => {
		const a = set(iomCase(), [36], 0);
		expect(get(a, 'iom').met).toBe(false);
		expect(get(set(a, [90], 2), 'iom').met).toBe(true);
	});
	it('fails under 6 months, with lifelong fatigue, or with 60+ hours of household and work activity', () => {
		const short = iomCase(); short.codes.q94 = 1;
		expect(get(short, 'iom').met).toBe(false);
		const lifelong = iomCase(); lifelong.codes = { ...lifelong.codes, q92: 1, q94: 5, q106: 7 };
		expect(get(lifelong, 'iom').met).toBe(false);
		const childhoodNotLifelong = iomCase(); childhoodNotLifelong.codes = { ...childhoodNotLifelong.codes, q92: 0, q94: 5, q106: 7 };
		expect(get(childhoodNotLifelong, 'iom').met).toBe(true);
		const busy = iomCase(); busy.hours = { q119a: 30, q119d: 30 };
		expect(get(busy, 'iom').met).toBe(false);
	});
	it('needs 2 of 3 SF-36 cut-offs', () => {
		const a = iomCase();
		a.rand = { ...a.rand, 13: 2, 14: 2, 15: 2, 16: 2 }; // role physical 100, others still impaired
		expect(get(a, 'iom').met).toBe(true);
		a.rand = { ...a.rand, 20: 1, 32: 5 }; // social functioning 100 too
		expect(get(a, 'iom').met).toBe(false);
	});
	it('uses the 2/2 threshold', () => {
		expect(get(set(iomCase(), [18], 1, 3), 'iom').met).toBe(false);
	});
});

describe('Fukuda 1994', () => {
	const fukudaCase = () => set(impaired(base()), [36, 19, 26, 25], 1);
	it('counts minor symptoms at frequency and severity of 1 or more', () => {
		expect(get(fukudaCase(), 'fukuda').met).toBe(true);
		expect(get(set(fukudaCase(), [25], 0), 'fukuda').met).toBe(false);
	});
	it('only counts headaches that are new or worse (Q93)', () => {
		const a = set(set(fukudaCase(), [25], 0), [31], 2);
		expect(get(a, 'fukuda').met).toBe(false);
		a.codes.q93 = 1;
		expect(get(a, 'fukuda').met).toBe(true);
	});
	it('counts mentally tired after effort (Q16) as post-exertional malaise', () => {
		expect(get(set(set(fukudaCase(), [25], 0), [16], 1), 'fukuda').met).toBe(true);
	});
});

describe('Canadian Consensus Criteria 2003', () => {
	const cccCase = () => set(impaired(base()), [13, 14, 84, 28, 32, 41, 46, 91], 2);
	it('is met with chest pain as pain, twitches and focus as neurocognitive, and bladder and temperature fluctuation as the two areas', () => {
		expect(get(cccCase(), 'ccc').met).toBe(true);
	});
	it('requires fatigue at 2/2', () => {
		expect(get(set(cccCase(), [13], 1), 'ccc').met).toBe(false);
	});
	it('lets alcohol avoidance (Q63a) satisfy the neuroendocrine area', () => {
		const a = set(cccCase(), [91], 0);
		expect(get(a, 'ccc').met).toBe(false);
		a.codes.q63a = 1;
		expect(get(a, 'ccc').met).toBe(true);
	});
	it('needs two neurocognitive symptoms', () => {
		expect(get(set(cccCase(), [41], 0), 'ccc').met).toBe(false);
	});
});

describe('ME-ICC 2011', () => {
	const meiccCase = () => {
		const a = set(base(), [17, 78, 27, 24, 87, 48, 88, 50], 2);
		a.codes.q127 = 1;
		return a;
	};
	it('is met with the official domain items', () => {
		expect(get(meiccCase(), 'meicc').met).toBe(true);
	});
	it('needs the 50% reduction (Q127), not the SF-36', () => {
		const a = meiccCase(); a.codes.q127 = 0;
		expect(get(a, 'meicc').met).toBe(false);
	});
	it('credits frequent viral infections (Q128) and temperature intolerance (Q129) yes/no answers', () => {
		const a = set(meiccCase(), [88, 50], 0);
		expect(get(a, 'meicc').met).toBe(false);
		a.codes.q128 = 1; a.codes.q129 = 1;
		expect(get(a, 'meicc').met).toBe(true);
	});
});

describe('domain summary', () => {
	it('averages item composites per Bedree factor', () => {
		const a = set(base(), [21, 22, 23], 4);
		const sleep = domainScores(a).find(d => d.key === 'sleep')!;
		expect(sleep).toMatchObject({ avg: 100, met: 3, total: 3 });
	});
});
