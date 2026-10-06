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
	// REVIEW: two or more "yes" answers is a positive screen (Hakim AJ, Grahame R.
	// Int J Clin Pract 2003;57(3):163-166, abstract). Integer totals 0-5, so the
	// bands cover every possible value without overlap.
	bands: [
		{ min: 0, max: 1, label: 'negative screen' },
		{ min: 2, max: 5, label: 'positive screen' },
	],
	bandSentence: (t, band) => `${t} of 5 "yes" answers is a ${band.label} for generalised joint hypermobility, where the published threshold is 2 or more.`,
	// No published minimal important change.
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
