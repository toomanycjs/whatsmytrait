// DSQ-2 config for saved results, history and reminders. The DSQ-2 has no
// single total, so results store total: null; the outcome is which case
// definitions were met (0/1 sub-scores), alongside this site's eight domain
// summaries (0-100).

import type { ResultEntry, ToolConfig } from '../scripts/results/types';

const DEFINITIONS: [string, string][] = [['iom', 'IOM'], ['ccc', 'CCC'], ['meicc', 'ME-ICC'], ['fukuda', 'Fukuda']];

export function dsqOutcome(e: Pick<ResultEntry, 'subscores'>): string {
	const met = DEFINITIONS.filter(([k]) => e.subscores[k] === 1).map(([, name]) => name);
	return met.length ? `meets ${met.join(', ')}` : 'no definition met';
}

export const dsq2: ToolConfig = {
	id: 'dsq-2',
	// 2: all 79 symptom items and DePaul's official case-definition rules (October 2026).
	version: '2',
	name: 'DSQ-2',
	path: '/tools/dsq-2/',
	direction: 'higher-worse',
	mic: null,
	subscores: [
		{ key: 'pem', label: 'PEM', sentenceLabel: 'Post-exertional malaise', max: 100 },
		{ key: 'cognitive', label: 'Cognitive', sentenceLabel: 'Cognitive impairment', max: 100 },
		{ key: 'orthostatic', label: 'Orthostatic', sentenceLabel: 'Orthostatic intolerance', max: 100 },
		{ key: 'sleep', label: 'Sleep', sentenceLabel: 'Sleep disruption', max: 100, inTable: false },
		{ key: 'pain', label: 'Pain', max: 100, inTable: false },
		{ key: 'feverflu', label: 'Fever and flu', max: 100, inTable: false },
		{ key: 'genitourinary', label: 'Genitourinary', max: 100, inTable: false },
		{ key: 'temperature', label: 'Temperature', sentenceLabel: 'Temperature intolerance', max: 100, inTable: false },
		{ key: 'iom', label: 'IOM met', inTable: false },
		{ key: 'ccc', label: 'CCC met', inTable: false },
		{ key: 'meicc', label: 'ME-ICC met', inTable: false },
		{ key: 'fukuda', label: 'Fukuda met', inTable: false },
	],
	outcome: dsqOutcome,
	reminderMonths: 1,
};
