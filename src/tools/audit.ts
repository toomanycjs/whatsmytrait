// AUDIT config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const audit: ToolConfig = {
	id: 'audit',
	version: '1',
	name: 'AUDIT',
	path: '/tools/audit/',
	totalMin: 0,
	totalMax: 40,
	decimals: 0,
	direction: 'higher-worse',
	mic: null,
	subscores: [
		{ key: 'consumption', label: 'Consumption', max: 12 },
		{ key: 'dependence', label: 'Dependence', max: 12 },
		{ key: 'harm', label: 'Harm', max: 16 },
	],
	topDomains: 0,
	reminderMonths: 1,
};
