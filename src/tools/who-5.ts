// WHO-5 Well-Being Index config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const who5: ToolConfig = {
	id: 'who-5',
	version: '1',
	name: 'WHO-5',
	path: '/tools/who-5/',
	totalMin: 0,
	totalMax: 100,
	decimals: 0,
	direction: 'higher-better',
	mic: null,
	subscores: [],
	topDomains: 0,
	reminderMonths: 1,
};
