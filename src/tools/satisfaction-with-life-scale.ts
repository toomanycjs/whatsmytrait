// Satisfaction with Life Scale (SWLS) config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const satisfactionWithLifeScale: ToolConfig = {
	id: 'satisfaction-with-life-scale',
	version: '1',
	name: 'SWLS',
	path: '/tools/satisfaction-with-life-scale/',
	totalMin: 5,
	totalMax: 35,
	decimals: 0,
	direction: 'higher-better',
	mic: null,
	subscores: [],
	topDomains: 0,
	reminderMonths: 1,
};
