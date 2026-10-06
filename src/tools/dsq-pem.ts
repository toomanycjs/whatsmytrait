// DSQ-PEM config for saved results, history and reminders. The headline is
// whether PEM is indicated, so results store total: null with 0/1 sub-scores,
// alongside the count of core symptoms at the 2/2 threshold.

import type { ResultEntry, ToolConfig } from '../scripts/results/types';

export function dsqPemOutcome(e: Pick<ResultEntry, 'subscores'>): string {
	return e.subscores.pem === 1 ? 'PEM indicated' : 'PEM not indicated';
}

export const dsqPem: ToolConfig = {
	id: 'dsq-pem',
	version: '1',
	name: 'DSQ-PEM',
	path: '/tools/dsq-pem/',
	direction: 'higher-worse',
	mic: null,
	subscores: [
		{ key: 'symptoms', label: 'Symptoms met', sentenceLabel: 'Core symptoms at threshold', max: 5 },
		{ key: 'longrecovery', label: 'Recovery 14h+', sentenceLabel: 'Recovery of 14 hours or more', inTable: false },
		{ key: 'pem', label: 'PEM indicated', inTable: false },
		{ key: 'physical', label: 'Worse after physical effort', inTable: false },
		{ key: 'mental', label: 'Worse after mental effort', inTable: false },
	],
	topDomains: 0,
	outcome: dsqPemOutcome,
	reminderMonths: 1,
};
