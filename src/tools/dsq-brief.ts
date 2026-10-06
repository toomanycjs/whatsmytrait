// DSQ-Brief config for saved results, history and reminders. The headline is
// the screen verdict, so results store total: null; sub-scores are the count of
// symptoms at the 2/2 threshold and each item's 0-100 composite.

import type { ResultEntry, ToolConfig } from '../scripts/results/types';

export function dsqBriefOutcome(e: Pick<ResultEntry, 'subscores'>): string {
	const met = e.subscores.met ?? 0;
	if (met === 4) return 'screen positive';
	if (met >= 1) return `partial, ${met} of 4`;
	return 'screen negative';
}

export const dsqBrief: ToolConfig = {
	id: 'dsq-brief',
	// 2: items 3 and 4 corrected to the published DSQ-Brief (unrefreshing sleep and
	// memory problems), October 2026. Earlier results used two PEM items instead.
	version: '2',
	name: 'DSQ-Brief',
	path: '/tools/dsq-brief/',
	direction: 'higher-worse',
	// No published bands or minimal important change (Jason et al. 2023 used a
	// random forest model, not a cut-off); the 4-of-4 rule is this site's own.
	mic: null,
	subscores: [
		{ key: 'fatigue', label: 'Fatigue', max: 100 },
		{ key: 'minexercise', label: 'Exercise', sentenceLabel: 'Tired after minimal exercise', max: 100 },
		{ key: 'unrefreshed', label: 'Sleep', sentenceLabel: 'Unrefreshed after waking', max: 100 },
		{ key: 'memory', label: 'Memory', sentenceLabel: 'Problems remembering things', max: 100 },
		{ key: 'met', label: 'Symptoms met', sentenceLabel: 'Symptoms at threshold', max: 4, inTable: false },
	],
	topDomains: 0,
	outcome: dsqBriefOutcome,
	reminderMonths: 1,
};
