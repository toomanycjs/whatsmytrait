// Cognitive Failures Questionnaire config for saved results, history and reminders. Sub-scores are mean item scores (0-4).

import type { ToolConfig } from '../scripts/results/types';

export const cognitiveFailuresQuestionnaire: ToolConfig = {
	id: 'cognitive-failures-questionnaire',
	version: '1',
	name: 'Cognitive Failures Questionnaire',
	path: '/tools/cognitive-failures-questionnaire/',
	totalMin: 0,
	totalMax: 100,
	decimals: 0,
	direction: 'higher-worse',
	// REVIEW: no bands on purpose. The CFQ has no published clinical cut-offs;
	// the page compares with published averages instead (see
	// cognitive-failures-questionnaire.content.ts). No minimal important change
	// has been published either (Berentschot et al., Lancet Reg Health Eur 2025).
	mic: null,
	subscores: [
		{ key: 'forgetfulness', label: 'Forgetfulness', max: 4 },
		{ key: 'distractibility', label: 'Distractibility', max: 4 },
		{ key: 'blunders', label: 'Blunders', sentenceLabel: 'False triggering (blunders)', max: 4 },
	],
	topDomains: 0,
	reminderMonths: 1,
};
