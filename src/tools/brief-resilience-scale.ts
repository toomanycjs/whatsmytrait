// Brief Resilience Scale (BRS) config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const briefResilienceScale: ToolConfig = {
	id: 'brief-resilience-scale',
	version: '1',
	name: 'BRS',
	path: '/tools/brief-resilience-scale/',
	totalMin: 1,
	totalMax: 5,
	decimals: 2,
	direction: 'higher-better',
	mic: null,
	subscores: [],
	topDomains: 0,
	reminderMonths: 1,
};
