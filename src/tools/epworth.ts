// Epworth Sleepiness Scale config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const epworth: ToolConfig = {
	id: 'epworth',
	version: '1',
	name: 'Epworth Sleepiness Scale',
	path: '/tools/epworth/',
	totalMin: 0,
	totalMax: 24,
	decimals: 0,
	direction: 'higher-worse',
	mic: null,
	subscores: [],
	topDomains: 0,
	reminderMonths: 1,
};
