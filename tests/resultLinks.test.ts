import { describe, expect, it } from 'vitest';
import { exerciseLinksBlocked, resultLinksFor } from '../src/scripts/results/resultLinks';
import type { ScoreResult } from '../src/scripts/results/types';

const r = (total: number | null, subscores: Record<string, number> = {}): ScoreResult => ({ total, subscores });
const hrefs = (tool: string, res: ScoreResult) => resultLinksFor(tool, res).map(l => l.href);
const none = () => null;

const LOW_SPOON = '/low-spoon-cooking/';
const PACING = '/tools/pacing-and-heart-rate/';
const PEM = '/evidence/post-exertional-malaise/';

describe('score-dependent result links', () => {
	it('Bell: 40 or below gets pacing, PEM and Low Spoon Cooking; 50 gets nothing', () => {
		expect(hrefs('bell-scale', r(40))).toEqual([PACING, PEM, LOW_SPOON]);
		expect(hrefs('bell-scale', r(0))).toEqual([PACING, PEM, LOW_SPOON]);
		expect(hrefs('bell-scale', r(50))).toEqual([]);
	});

	it('FUNCAP: total and home domain are judged separately, low means rounds to 3 or below', () => {
		expect(hrefs('funcap', r(3.49, { home: 5 }))).toEqual([PACING, PEM]);
		expect(hrefs('funcap', r(3.5, { home: 3.49 }))).toEqual([LOW_SPOON]);
		expect(hrefs('funcap', r(4, { home: 4 }))).toEqual([]);
	});

	it('PCFS: grades 3 and 4 only', () => {
		expect(hrefs('pcfs', r(2))).toEqual([]);
		expect(hrefs('pcfs', r(3))).toEqual([LOW_SPOON]);
		expect(hrefs('pcfs', r(4))).toEqual([LOW_SPOON]);
	});

	it('Chalder uses the bimodal cut-off of 4; FSS the 4.0 band', () => {
		expect(hrefs('chalder-fatigue-scale', r(30, { bimodal: 3 }))).toEqual([]);
		expect(hrefs('chalder-fatigue-scale', r(10, { bimodal: 4 }))).toEqual([LOW_SPOON]);
		expect(hrefs('fss', r(3.9))).toEqual([]);
		expect(hrefs('fss', r(4))).toEqual([LOW_SPOON]);
	});

	it('DSQ-PEM and DSQ-Brief', () => {
		expect(hrefs('dsq-pem', r(null, { pem: 1 }))).toEqual([PACING, PEM]);
		expect(hrefs('dsq-pem', r(null, { pem: 0 }))).toEqual([]);
		expect(hrefs('dsq-brief', r(null, { met: 4 }))).toEqual(['/tools/dsq-2/']);
		expect(hrefs('dsq-brief', r(null, { met: 3 }))).toEqual([]);
	});

	it('never includes an exercise page', () => {
		const all = ['bell-scale', 'funcap', 'pcfs', 'chalder-fatigue-scale', 'fss', 'dsq-pem', 'dsq-brief']
			.flatMap(t => hrefs(t, r(0, { pem: 1, home: 0, bimodal: 11, met: 4 })));
		expect(all.some(h => /exercise-|chop-levine/.test(h))).toBe(false);
	});
});

describe('exercise link exclusion', () => {
	it('follows the current result', () => {
		expect(exerciseLinksBlocked('dsq-pem', r(null, { pem: 1 }), none)).toBe(true);
		expect(exerciseLinksBlocked('dsq-pem', r(null, { pem: 0 }), none)).toBe(false);
		expect(exerciseLinksBlocked('bell-scale', r(40), none)).toBe(true);
		expect(exerciseLinksBlocked('funcap', r(3.4, {}), none)).toBe(true);
		expect(exerciseLinksBlocked('funcap', r(3.5, {}), none)).toBe(false);
	});

	it('follows the latest saved DSQ-PEM, Bell or FUNCAP result on other pages', () => {
		const saved = (tool: string) => (tool === 'dsq-pem' ? { total: null, subscores: { pem: 1 } } : null);
		expect(exerciseLinksBlocked('ipaq-short-form', r(600), saved)).toBe(true);
		expect(exerciseLinksBlocked('ipaq-short-form', r(600), none)).toBe(false);
	});

	it('lets the current result replace its own saved one', () => {
		const saved = (tool: string) => (tool === 'dsq-pem' ? { total: null, subscores: { pem: 1 } } : null);
		expect(exerciseLinksBlocked('dsq-pem', r(null, { pem: 0 }), saved)).toBe(false);
	});
});
