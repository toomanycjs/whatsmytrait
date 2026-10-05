// Five-part questionnaire (5PQ) config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const fivePartQuestionnaire: ToolConfig = {
	id: 'five-part-questionnaire',
	version: '1',
	name: '5PQ',
	path: '/tools/five-part-questionnaire/',
	totalMin: 0,
	totalMax: 5,
	decimals: 0,
	direction: 'higher-worse',
	// Two or more "yes" is a positive screen; no published minimal important change.
	mic: null,
	subscores: [
		{ key: 'q1', label: 'Hands flat', sentenceLabel: 'Hands flat on the floor (now or ever)', inTable: false },
		{ key: 'q2', label: 'Thumb', sentenceLabel: 'Thumb to forearm (now or ever)', inTable: false },
		{ key: 'q3', label: 'Contortions', sentenceLabel: 'Contortions or the splits as a child', inTable: false },
		{ key: 'q4', label: 'Dislocations', sentenceLabel: 'Shoulder or kneecap dislocated more than once', inTable: false },
		{ key: 'q5', label: 'Double-jointed', inTable: false },
	],
	topDomains: 0,
	reminderMonths: 1,
};
