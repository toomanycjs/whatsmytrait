import { describe, expect, it } from 'vitest';
import { comparisonSentence, defaultSummary, formatDate } from '../src/format';
import type { ResultEntry, ToolConfig } from '../src/types';

const base: ToolConfig = {
	id: 'self-esteem', version: '2', name: 'Self-esteem', path: '/tests/self-esteem/',
	totalMin: 0, totalMax: 100, decimals: 1,
	subscores: [
		{ key: 'extraversion', label: 'Extraversion', max: 40 },
		{ key: 'openness', label: 'Openness', max: 25 },
		{ key: 'agreeableness', label: 'Agreeableness', max: 10 },
	],
};

const e = (date: string, total: number | null, over: Partial<ResultEntry> = {}): ResultEntry =>
	({ id: date, tool: 'self-esteem', toolVersion: '2', date, total, subscores: {}, band: null, summary: '', ...over });

describe('comparison sentence', () => {
	const now = new Date(2026, 9, 5, 12);
	it('reads like the brief', () => {
		expect(comparisonSentence(base, e('2026-07-02T09:00:00', 34), e('2026-10-05T11:00:00', 23), now))
			.toBe('34 on 2 July 2026, 23 today: down 11 points.');
	});
	it('names the date when the latest is not today, and handles single points and no change', () => {
		expect(comparisonSentence(base, e('2026-07-02T09:00:00', 34), e('2026-08-01T09:00:00', 35), now))
			.toBe('34 on 2 July 2026, 35 on 1 August 2026: up 1 point.');
		expect(comparisonSentence(base, e('2026-07-02T09:00:00', 34), e('2026-08-01T09:00:00', 34), now))
			.toBe('34 on 2 July 2026, 34 on 1 August 2026: no change.');
	});
	it('uses outcomes when there is no total', () => {
		const cfg: ToolConfig = { ...base, outcome: x => x.band ?? 'none' };
		expect(comparisonSentence(cfg, e('2026-07-02T09:00:00', null, { band: 'RIA' }), e('2026-10-05T11:00:00', null, { band: 'RIS' }), now))
			.toBe('On 2 July 2026: RIA. Today: RIS.');
	});
});

describe('formatting', () => {
	it('formats dates in British style', () => {
		expect(formatDate('2026-11-28T10:00:00')).toBe('28 November 2026');
	});
	it('builds a one-line summary', () => {
		expect(defaultSummary(base, { total: 47.25, subscores: { extraversion: 24, openness: 5.357 } }))
			.toBe('Self-esteem 47.3 out of 100. Extraversion 24, Openness 5.4');
	});
});
