// Post-COVID-19 Functional Status scale config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const pcfs: ToolConfig = {
	id: 'pcfs',
	version: '1',
	name: 'PCFS scale',
	path: '/tools/pcfs/',
	totalMin: 0,
	totalMax: 4,
	decimals: 0,
	direction: 'higher-worse',
	// No bands beyond the five grade names, and no published minimal important change.
	mic: null,
	subscores: [],
	topDomains: 0,
	reminderMonths: 1,
};
