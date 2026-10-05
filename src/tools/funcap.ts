// FUNCAP27 config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const funcap: ToolConfig = {
	id: 'funcap',
	// 2: total is the mean of the eight domain scores, per Sommerfelt et al. 2024 (October 2026).
	version: '2',
	name: 'FUNCAP27',
	path: '/tools/funcap/',
	totalMin: 0,
	totalMax: 6,
	decimals: 2,
	direction: 'higher-better',
	// No official cut-offs and no published minimal important change.
	mic: null,
	subscores: [
		{ key: 'hygiene', label: 'Hygiene', sentenceLabel: 'Personal hygiene and basic functions', max: 6 },
		{ key: 'walking', label: 'Walking', sentenceLabel: 'Walking and moving around', max: 6 },
		{ key: 'upright', label: 'Upright', sentenceLabel: 'Being upright', max: 6 },
		{ key: 'home', label: 'Home', sentenceLabel: 'Activities in the home', max: 6 },
		{ key: 'communication', label: 'Communication', max: 6 },
		{ key: 'outside', label: 'Outside', sentenceLabel: 'Activities outside the home', max: 6 },
		{ key: 'lightsound', label: 'Light and sound', sentenceLabel: 'Reactions to light and sound', max: 6 },
		{ key: 'concentration', label: 'Concentration', max: 6 },
	],
	reminderMonths: 1,
};
