import { describe, expect, it } from 'vitest';
import { comparisonSentence, defaultSummary, formatDate } from '../src/scripts/results/format';
import { interpretResult } from '../src/scripts/results/interpretation';
import type { ResultEntry, ToolConfig } from '../src/scripts/results/types';

const compass: ToolConfig = {
	id: 'compass-31', version: '2', name: 'COMPASS-31', path: '/tools/compass-31/',
	totalMin: 0, totalMax: 100, decimals: 1,
	subscores: [
		{ key: 'orthostatic', label: 'Orthostatic intolerance', max: 40 },
		{ key: 'gi', label: 'Gastrointestinal', max: 25 },
		{ key: 'bladder', label: 'Bladder', max: 10 },
	],
};
const withMic: ToolConfig = { ...compass, mic: { value: 5, source: 'test' }, bands: [{ min: 0, max: 20, label: 'low' }, { min: 20.1, max: 100, label: 'high' }] };

const e = (date: string, total: number | null, over: Partial<ResultEntry> = {}): ResultEntry =>
	({ id: date, tool: 'compass-31', toolVersion: '2', date, total, subscores: {}, band: null, summary: '', ...over });

describe('comparison sentence', () => {
	const now = new Date(2026, 9, 5, 12);
	it('reads like the brief', () => {
		expect(comparisonSentence(compass, e('2026-07-02T09:00:00', 34), e('2026-10-05T11:00:00', 23), now))
			.toBe('34 on 2 July 2026, 23 today: down 11 points.');
	});
	it('names the date when the latest is not today, and handles single points and no change', () => {
		expect(comparisonSentence(compass, e('2026-07-02T09:00:00', 34), e('2026-08-01T09:00:00', 35), now))
			.toBe('34 on 2 July 2026, 35 on 1 August 2026: up 1 point.');
		expect(comparisonSentence(compass, e('2026-07-02T09:00:00', 34), e('2026-08-01T09:00:00', 34), now))
			.toBe('34 on 2 July 2026, 34 on 1 August 2026: no change.');
	});
	it('adds the MIC clause only where one is published', () => {
		const s = comparisonSentence(withMic, e('2026-07-02T09:00:00', 34), e('2026-10-05T11:00:00', 23), now);
		expect(s).toContain('larger than the published minimal important change of 5 points');
	});
	it('uses outcomes when there is no total', () => {
		const cfg: ToolConfig = { ...compass, outcome: x => x.band ?? 'none' };
		expect(comparisonSentence(cfg, e('2026-07-02T09:00:00', null, { band: 'meets IOM' }), e('2026-10-05T11:00:00', null, { band: 'meets IOM and CCC' }), now))
			.toBe('On 2 July 2026: meets IOM. Today: meets IOM and CCC.');
	});
});

describe('interpretation (Layer 1)', () => {
	it('gives the band, the top domains and the MIC comparison', () => {
		const text = interpretResult(withMic, { total: 34, subscores: { orthostatic: 20, gi: 12.5, bladder: 0 } }, e('2026-07-02T09:00:00', 23));
		expect(text).toBe('A COMPASS-31 total of 34 is in the high range. The largest contributions came from orthostatic intolerance and gastrointestinal. Since your last result on 2 July 2026 your total is up 11 points, which is larger than the published minimal important change of 5 points.');
	});
	it('says nothing about significance without a MIC, and ranks lowest domains for higher-better scales', () => {
		const text = interpretResult({ ...compass, direction: 'higher-better' }, { total: 50, subscores: { orthostatic: 40, gi: 5, bladder: 9 } }, e('2026-07-02T09:00:00', 40));
		expect(text).toBe('Your lowest domains were gastrointestinal and bladder.');
	});
});

describe('formatting', () => {
	it('formats dates in British style', () => {
		expect(formatDate('2026-11-28T10:00:00')).toBe('28 November 2026');
	});
	it('builds a one-line summary', () => {
		expect(defaultSummary(compass, { total: 47.25, subscores: { orthostatic: 24, gi: 5.357 } }))
			.toBe('COMPASS-31 47.3 out of 100. Orthostatic intolerance 24, Gastrointestinal 5.4');
	});
});
