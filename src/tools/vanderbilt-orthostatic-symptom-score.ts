// Vanderbilt Orthostatic Symptom Score (VOSS) config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

/** When the symptoms were rated, stored as a number: 0 at rest, 1 standing under 10 minutes, 2 end of a 10-minute stand. */
export const VOSS_CONTEXT_CODES: Record<string, number> = { rest: 0, short: 1, stand: 2 };

export const vanderbiltOrthostaticSymptomScore: ToolConfig = {
	id: 'vanderbilt-orthostatic-symptom-score',
	version: '1',
	name: 'VOSS',
	path: '/tools/vanderbilt-orthostatic-symptom-score/',
	totalMin: 0,
	totalMax: 90,
	decimals: 0,
	direction: 'higher-worse',
	// No validated cut-off and no published minimal important change.
	mic: null,
	topDomains: 0,
	// Item ratings (0-10) and the rating context, kept for the record but out of the history table.
	subscores: [
		{ key: 'clouding', label: 'Mental clouding', max: 10, inTable: false },
		{ key: 'vision', label: 'Blurred vision', max: 10, inTable: false },
		{ key: 'dyspnoea', label: 'Breathlessness', sentenceLabel: 'Shortness of breath', max: 10, inTable: false },
		{ key: 'heartbeat', label: 'Rapid heartbeat', max: 10, inTable: false },
		{ key: 'tremor', label: 'Tremulousness', max: 10, inTable: false },
		{ key: 'chest', label: 'Chest discomfort', max: 10, inTable: false },
		{ key: 'headache', label: 'Headache', max: 10, inTable: false },
		{ key: 'lightheaded', label: 'Lightheadedness', max: 10, inTable: false },
		{ key: 'nausea', label: 'Nausea', max: 10, inTable: false },
		{ key: 'context', label: 'Rated when', sentenceLabel: 'Rating context (0 rest, 1 short stand, 2 10-minute stand)', max: 2, inTable: false },
	],
	// Only compare ratings made in the same context (at rest vs after standing).
	comparableBy: 'context',
	reminderMonths: 1,
};
