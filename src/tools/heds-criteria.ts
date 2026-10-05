// hEDS 2017 criteria checklist config for saved results, history and
// reminders. There is no single total, so results store total: null; the
// outcome is which criteria were met (0/1 sub-scores, with 0/1 flags for
// Criterion 2 undecided and Criterion 3 not assessed), alongside the Beighton
// score and Feature A count entered.

import type { ResultEntry, ToolConfig } from '../scripts/results/types';

export function hedsOutcome(e: Pick<ResultEntry, 'subscores'>): string {
	const s = e.subscores;
	if (s.c1 !== 1) return 'criterion 1 not met';
	if (s.c2 !== 1) return s.c2open === 1 ? 'criterion 1 met, criterion 2 undecided' : 'criterion 1 met only';
	if (s.c3 !== 1) return s.c3open === 1 ? 'criteria 1 and 2 met, criterion 3 not assessed' : 'criteria 1 and 2 met, criterion 3 not met';
	return 'all three criteria met';
}

export const hedsCriteria: ToolConfig = {
	id: 'heds-criteria',
	version: '1',
	name: 'hEDS criteria checklist',
	path: '/tools/heds-criteria/',
	direction: 'higher-worse',
	mic: null,
	subscores: [
		{ key: 'beighton', label: 'Beighton', sentenceLabel: 'Beighton score', max: 9 },
		{ key: 'featurea', label: 'Feature A', sentenceLabel: 'Feature A signs present', max: 12 },
		{ key: 'c1', label: 'Criterion 1 met', inTable: false },
		{ key: 'c2', label: 'Criterion 2 met', inTable: false },
		{ key: 'c3', label: 'Criterion 3 met', inTable: false },
		{ key: 'c2open', label: 'Criterion 2 undecided', inTable: false },
		{ key: 'c3open', label: 'Criterion 3 not assessed', inTable: false },
	],
	topDomains: 0,
	outcome: hedsOutcome,
	reminderMonths: 1,
};
