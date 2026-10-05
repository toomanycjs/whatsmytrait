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
	// No bands stored here, and no published minimal important change.
	mic: null,
	topDomains: 0,
	// Item scores (0-4) as q1..q16, kept for the record but out of the history table.
	subscores: ITEMS.map((label, i) => ({ key: `q${i + 1}`, label, max: 4, inTable: false })),
	reminderMonths: 1,
};
