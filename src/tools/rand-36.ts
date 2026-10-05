// RAND-36 config for saved results, history and reminders. The RAND-36 has no
// single total, so results store total: null; the outcome names the physical
// functioning and energy scales, alongside all eight scale scores (0-100).

import type { ResultEntry, ToolConfig } from '../scripts/results/types';

export function rand36Outcome(e: Pick<ResultEntry, 'subscores'>): string {
	const pf = e.subscores.physical;
	const en = e.subscores.energy;
	if (pf === undefined || en === undefined) return '';
	return `physical functioning ${Math.round(pf)}, energy ${Math.round(en)}`;
}

export const rand36: ToolConfig = {
	id: 'rand-36',
	version: '1',
	name: 'RAND-36',
	path: '/tools/rand-36/',
	direction: 'higher-better',
	mic: null,
	subscores: [
		{ key: 'physical', label: 'Physical functioning', max: 100, inTable: false },
		{ key: 'rolephysical', label: 'Role (physical)', sentenceLabel: 'Role limitations (physical health)', max: 100 },
		{ key: 'roleemotional', label: 'Role (emotional)', sentenceLabel: 'Role limitations (emotional problems)', max: 100, inTable: false },
		{ key: 'energy', label: 'Energy', sentenceLabel: 'Energy / fatigue', max: 100, inTable: false },
		{ key: 'emotional', label: 'Emotional', sentenceLabel: 'Emotional well-being', max: 100 },
		{ key: 'social', label: 'Social', sentenceLabel: 'Social functioning', max: 100 },
		{ key: 'pain', label: 'Pain', max: 100, inTable: false },
		{ key: 'general', label: 'General health', max: 100 },
	],
	outcome: rand36Outcome,
	topDomains: 0,
	reminderMonths: 1,
};
