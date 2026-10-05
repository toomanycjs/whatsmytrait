// Fatigue Severity Scale config for saved results, history and reminders. The total is the mean of the nine items (1-7).

import type { ToolConfig } from '../scripts/results/types';

export const fss: ToolConfig = {
	id: 'fss',
	version: '1',
	name: 'FSS',
	path: '/tools/fss/',
	totalMin: 1,
	totalMax: 7,
	decimals: 1,
	direction: 'higher-worse',
	mic: null,
	subscores: [],
	topDomains: 0,
	reminderMonths: 1,
};
