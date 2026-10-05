// COMPASS-31 config for saved results, history, export and reminders.
// Bump `version` whenever the scoring changes, so stored results say which
// scoring produced them.

import type { ToolConfig } from '../scripts/results/types';

export const compass31: ToolConfig = {
	id: 'compass-31',
	// 2: published items, answer options and weights (October 2026).
	version: '2',
	name: 'COMPASS-31',
	path: '/tools/compass-31/',
	totalMin: 0,
	totalMax: 100,
	decimals: 1,
	direction: 'higher-worse',
	// No agreed severity bands and no published minimal important change.
	bands: [],
	mic: null,
	subscores: [
		{ key: 'orthostatic', label: 'Orthostatic', sentenceLabel: 'Orthostatic intolerance', max: 40 },
		{ key: 'vasomotor', label: 'Vasomotor', max: 5 },
		{ key: 'secretomotor', label: 'Secretomotor', max: 15 },
		{ key: 'gi', label: 'Gastrointestinal', max: 25 },
		{ key: 'bladder', label: 'Bladder', max: 10 },
		{ key: 'pupillomotor', label: 'Pupillomotor', max: 5 },
	],
	reminderMonths: 1,
};
