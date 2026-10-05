// Orthostatic Grading Scale (OGS) config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const orthostaticGradingScale: ToolConfig = {
	id: 'orthostatic-grading-scale',
	version: '1',
	name: 'Orthostatic Grading Scale',
	path: '/tools/orthostatic-grading-scale/',
	totalMin: 0,
	totalMax: 20,
	decimals: 0,
	direction: 'higher-worse',
	// No bands stored here, and no published minimal important change.
	mic: null,
	topDomains: 0,
	// Item scores (0-4), kept for the record but out of the history table.
	subscores: [
		{ key: 'frequency', label: 'Frequency', max: 4, inTable: false },
		{ key: 'severity', label: 'Severity', max: 4, inTable: false },
		{ key: 'conditions', label: 'Conditions', max: 4, inTable: false },
		{ key: 'adl', label: 'Daily activities', max: 4, inTable: false },
		{ key: 'standing', label: 'Standing time', max: 4, inTable: false },
	],
	reminderMonths: 1,
};
