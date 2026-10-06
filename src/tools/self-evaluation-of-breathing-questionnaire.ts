// Self-Evaluation of Breathing Questionnaire (SEBQ) config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const selfEvaluationOfBreathingQuestionnaire: ToolConfig = {
	id: 'self-evaluation-of-breathing-questionnaire',
	version: '1',
	name: 'SEBQ',
	path: '/tools/self-evaluation-of-breathing-questionnaire/',
	totalMin: 0,
	totalMax: 75,
	decimals: 0,
	direction: 'higher-worse',
	// REVIEW: no bands. The 25 point is expert opinion only (Kiesel et al. 2017,
	// PMC5685417: "no established cut-score"), not verified (Bondarenko et al.
	// 2026, PMC13501441). No published minimal important change.
	mic: null,
	topDomains: 0,
	// Statement ratings (0-3) as i1..i25, kept for the record but out of the history table.
	subscores: Array.from({ length: 25 }, (_, i) => ({ key: `i${i + 1}`, label: `Statement ${i + 1}`, max: 3, inTable: false })),
	reminderMonths: 1,
};
