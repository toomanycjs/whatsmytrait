// Godin-Shephard Leisure-Time Exercise Questionnaire config for saved results,
// history and reminders. The total is the 2011 health score (9 x strenuous +
// 5 x moderate); sub-scores are the weekly counts and the traditional total.

import type { ToolConfig } from '../scripts/results/types';

export const godinShephard: ToolConfig = {
	id: 'godin-shephard-leisure-time-exercise-questionnaire',
	version: '1',
	name: 'Godin-Shephard questionnaire',
	path: '/tools/godin-shephard-leisure-time-exercise-questionnaire/',
	totalMin: 0,
	// No fixed maximum worth showing; the chart scales to the data.
	decimals: 0,
	direction: 'higher-better',
	mic: null,
	subscores: [
		{ key: 'strenuous', label: 'Strenuous', sentenceLabel: 'Strenuous sessions per week' },
		{ key: 'moderate', label: 'Moderate', sentenceLabel: 'Moderate sessions per week' },
		{ key: 'mild', label: 'Mild', sentenceLabel: 'Mild sessions per week' },
		{ key: 'traditional', label: 'Traditional total', sentenceLabel: 'Traditional total (all three)', inTable: false },
	],
	topDomains: 0,
	reminderMonths: 1,
};
