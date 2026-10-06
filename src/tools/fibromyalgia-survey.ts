// 2016 fibromyalgia survey config for saved results, history and reminders.
// The stored total is the fibromyalgia severity (FS) score, 0-31; whether the
// criteria were met is kept as a 0/1 sub-score and in the summary.

import type { ToolConfig } from '../scripts/results/types';

export const fibromyalgiaSurvey: ToolConfig = {
	id: 'fibromyalgia-survey',
	// 2: jaw, chest and abdomen excluded from generalised pain, per Wolfe et al. 2016 (October 2026).
	version: '2',
	name: 'fibromyalgia survey',
	path: '/tools/fibromyalgia-survey/',
	totalMin: 0,
	totalMax: 31,
	decimals: 0,
	direction: 'higher-worse',
	// Polysymptomatic distress (FS) categories: Wolfe et al., J Rheumatol 2015;42(8):1494-501.
	bands: [
		{ min: 0, max: 3, label: 'none' },
		{ min: 4, max: 7, label: 'mild' },
		{ min: 8, max: 11, label: 'moderate' },
		{ min: 12, max: 19, label: 'severe' },
		{ min: 20, max: 31, label: 'very severe' },
	],
	// REVIEW: Layer 1 band sentence.
	bandSentence: (t, band) => `A fibromyalgia severity score of ${t} is in the "${band.label}" category of the published severity scale.`,
	// No published minimal important change for the FS score.
	mic: null,
	subscores: [
		{ key: 'wpi', label: 'Pain index', sentenceLabel: 'Widespread pain index', max: 19 },
		{ key: 'sss', label: 'Symptom severity', sentenceLabel: 'Symptom severity scale', max: 12 },
		{ key: 'regions', label: 'Regions', sentenceLabel: 'Regions with pain', max: 5 },
		{ key: 'criteria', label: 'Criteria met', inTable: false },
	],
	// Layer 1 states the two components directly instead.
	topDomains: 0,
	reminderMonths: 1,
};
