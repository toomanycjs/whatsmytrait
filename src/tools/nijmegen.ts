// Nijmegen Questionnaire config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

const ITEMS = [
	'Chest pain', 'Feeling tense', 'Blurred vision', 'Dizziness',
	'Confusion', 'Faster or deeper breathing', 'Short of breath', 'Tight chest',
	'Bloating', 'Tingling fingers', 'Unable to breathe deeply', 'Stiff fingers or arms',
	'Tight around mouth', 'Cold hands or feet', 'Palpitations', 'Anxiety',
];

export const nijmegen: ToolConfig = {
	id: 'nijmegen',
	version: '1',
	name: 'Nijmegen Questionnaire',
	path: '/tools/nijmegen/',
	totalMin: 0,
	totalMax: 64,
	decimals: 0,
	direction: 'higher-worse',
	// REVIEW: cut-off of "a sum score of >22" (23 or above), van Dixhoorn &
	// Folgering 2015, ERJ Open Res, PMC5005127 ("Elevated Nijmegen Questionnaire
	// score..." section); Bondarenko et al. 2026 call >=23 "commonly accepted".
	// Integer totals 0-64, so 0-22 and 23-64 leave no gap.
	bands: [
		{ min: 0, max: 22, label: 'below the usual cut-off of 23' },
		{ min: 23, max: 64, label: 'at or above the usual cut-off of 23' },
	],
	bandSentence: (t, band) => `A Nijmegen total of ${t} is ${band.label}, the score most often used to flag possible breathing pattern disorder.`,
	// No published minimal important change (Thomas et al. 2015 call for one).
	mic: null,
	topDomains: 0,
	// Item scores (0-4) as q1..q16, kept for the record but out of the history table.
	subscores: ITEMS.map((label, i) => ({ key: `q${i + 1}`, label, max: 4, inTable: false })),
	reminderMonths: 1,
};
