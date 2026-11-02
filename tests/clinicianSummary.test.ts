import { describe, expect, it } from 'vitest';
import { HISTORY_ROWS, historyRows } from '../src/scripts/results/clinicianSummary';
import type { ResultEntry } from '../src/scripts/results/types';

const e = (i: number): ResultEntry => ({
	id: `r${i}`, tool: 'compass-31', toolVersion: '2', date: `2026-${String((i % 12) + 1).padStart(2, '0')}-01T10:00:00`,
	total: 30 + i, subscores: {}, band: null, summary: '',
});

describe('clinician summary history', () => {
	it('is left out when the only saved result is the current one, or nothing is saved', () => {
		expect(historyRows({ entries: [e(0)], currentId: 'r0' }).hasEarlier).toBe(false);
		expect(historyRows({ entries: [], currentId: null }).hasEarlier).toBe(false);
	});

	it('is shown when an earlier result exists, or the current one was not kept', () => {
		expect(historyRows({ entries: [e(0), e(1)], currentId: 'r1' }).hasEarlier).toBe(true);
		expect(historyRows({ entries: [e(0)], currentId: null }).hasEarlier).toBe(true);
	});

	it('keeps the most recent rows and counts the rest', () => {
		const entries = Array.from({ length: 15 }, (_, i) => e(i));
		const { rows, hidden } = historyRows({ entries, currentId: 'r14' });
		expect(rows).toHaveLength(HISTORY_ROWS);
		expect(rows[rows.length - 1].id).toBe('r14');
		expect(hidden).toBe(15 - HISTORY_ROWS);
	});
});
