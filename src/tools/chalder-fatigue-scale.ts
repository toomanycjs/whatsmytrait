// Chalder Fatigue Scale (CFQ-11) config for saved results, history and reminders. The total is the Likert score (0-33).

import type { ToolConfig } from '../scripts/results/types';

export const chalderFatigueScale: ToolConfig = {
	id: 'chalder-fatigue-scale',
	version: '1',
	name: 'Chalder Fatigue Scale',
	path: '/tools/chalder-fatigue-scale/',
	totalMin: 0,
	totalMax: 33,
	decimals: 0,
	direction: 'higher-worse',
	// REVIEW: no published Likert bands, and no minimal important change for
	// individuals (PACE's 2 points was a between-group difference; see
	// chalder-fatigue-scale.content.ts). The bimodal cut-off of 4 applies to a
	// subscore, so the page states it rather than storing it as a band.
	mic: null,
	subscores: [
		{ key: 'physical', label: 'Physical', sentenceLabel: 'Physical fatigue', max: 21 },
		{ key: 'mental', label: 'Mental', sentenceLabel: 'Mental fatigue', max: 12 },
		{ key: 'bimodal', label: 'Bimodal', sentenceLabel: 'Bimodal score', max: 11 },
	],
	topDomains: 0,
	reminderMonths: 1,
};
