// IPAQ short form config for saved results, history and reminders. The total is MET-minutes per week (no fixed maximum).

import type { ToolConfig } from '../scripts/results/types';

export const ipaqShortForm: ToolConfig = {
	id: 'ipaq-short-form',
	// 2: the first "high" criterion uses total MET-minutes, not vigorous alone, per the 2005 guidelines (November 2026).
	version: '2',
	name: 'IPAQ',
	path: '/tools/ipaq-short-form/',
	totalMin: 0,
	decimals: 0,
	direction: 'higher-better',
	mic: null,
	subscores: [
		{ key: 'vigorous', label: 'Vigorous', sentenceLabel: 'Vigorous MET-minutes' },
		{ key: 'moderate', label: 'Moderate', sentenceLabel: 'Moderate MET-minutes' },
		{ key: 'walking', label: 'Walking', sentenceLabel: 'Walking MET-minutes' },
		{ key: 'sitting', label: 'Sitting (min/day)', sentenceLabel: 'Weekday sitting minutes', inTable: false },
	],
	topDomains: 0,
	reminderMonths: 1,
};
