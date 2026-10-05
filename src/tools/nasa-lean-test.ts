// NASA lean test config for saved results, history and reminders. The headline
// number is the heart-rate rise on standing (peak standing minus final supine, bpm).

import type { ToolConfig } from '../scripts/results/types';

export const nasaLeanTest: ToolConfig = {
	id: 'nasa-lean-test',
	version: '1',
	name: 'NASA lean test',
	path: '/tools/nasa-lean-test/',
	// No fixed range: the rise can be negative and has no ceiling.
	decimals: 0,
	direction: 'higher-worse',
	mic: null,
	topDomains: 0,
	subscores: [
		{ key: 'supinehr', label: 'Supine HR', sentenceLabel: 'Final supine heart rate' },
		{ key: 'peakhr', label: 'Peak HR', sentenceLabel: 'Peak standing heart rate' },
		{ key: 'sysdrop', label: 'Systolic drop', sentenceLabel: 'Systolic blood pressure drop' },
		{ key: 'diadrop', label: 'Diastolic drop', sentenceLabel: 'Diastolic blood pressure drop', inTable: false },
		{ key: 'supinesymptoms', label: 'Supine symptoms', sentenceLabel: 'Supine symptom severity', max: 10, inTable: false },
		{ key: 'standingsymptoms', label: 'Standing symptoms', sentenceLabel: 'Standing symptom severity', max: 10, inTable: false },
	],
	reminderMonths: 1,
};
