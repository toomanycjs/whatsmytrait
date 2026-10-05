// Malmö POTS Symptom Score (MAPS) config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const malmoPotsScore: ToolConfig = {
	id: 'malmo-pots-score',
	version: '1',
	name: 'Malmö POTS score',
	path: '/tools/malmo-pots-score/',
	totalMin: 0,
	totalMax: 120,
	decimals: 0,
	direction: 'higher-worse',
	// No bands stored here, and no published minimal important change.
	mic: null,
	topDomains: 0,
	// Item ratings (0-10), kept for the record but out of the history table.
	subscores: [
		{ key: 'dizziness', label: 'Dizziness', max: 10, inTable: false },
		{ key: 'presyncope', label: 'Presyncope', max: 10, inTable: false },
		{ key: 'palpitations', label: 'Palpitations', max: 10, inTable: false },
		{ key: 'dyspnoea', label: 'Breathlessness', sentenceLabel: 'Shortness of breath', max: 10, inTable: false },
		{ key: 'chestpain', label: 'Chest pain', max: 10, inTable: false },
		{ key: 'headache', label: 'Headache', max: 10, inTable: false },
		{ key: 'concentration', label: 'Concentration', max: 10, inTable: false },
		{ key: 'myalgia', label: 'Muscle pain', max: 10, inTable: false },
		{ key: 'nausea', label: 'Nausea', max: 10, inTable: false },
		{ key: 'gi', label: 'GI', sentenceLabel: 'Gastrointestinal symptoms', max: 10, inTable: false },
		{ key: 'fatigue', label: 'Fatigue', max: 10, inTable: false },
		{ key: 'insomnia', label: 'Insomnia', max: 10, inTable: false },
	],
	reminderMonths: 1,
};
