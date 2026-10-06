// Beighton score config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const beightonScore: ToolConfig = {
	id: 'beighton-score',
	version: '1',
	name: 'Beighton score',
	path: '/tools/beighton-score/',
	totalMin: 0,
	totalMax: 9,
	decimals: 0,
	direction: 'higher-worse',
	// Age-dependent cut-off only, and no published minimal important change.
	// REVIEW: no bands on purpose. The cut-off depends on the age group (6, 5
	// or 4 or more; Malfait et al. 2017), which a single band list cannot
	// express, so the page states the cut-off result itself.
	mic: null,
	subscores: [
		{ key: 'fingers', label: 'Little fingers', max: 2 },
		{ key: 'thumbs', label: 'Thumbs', sentenceLabel: 'Thumbs to forearm', max: 2 },
		{ key: 'elbows', label: 'Elbows', max: 2 },
		{ key: 'knees', label: 'Knees', max: 2 },
		{ key: 'palms', label: 'Palms to floor', max: 1, inTable: false },
		{ key: 'met', label: 'Cut-off met', sentenceLabel: 'Age-adjusted cut-off met', inTable: false },
	],
	topDomains: 0,
	reminderMonths: 1,
};
