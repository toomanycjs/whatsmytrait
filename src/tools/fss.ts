// Fatigue Severity Scale config for saved results, history and reminders. The total is the mean of the nine items (1-7).

import type { ToolConfig } from '../scripts/results/types';

export const fss: ToolConfig = {
	id: 'fss',
	version: '1',
	name: 'FSS',
	path: '/tools/fss/',
	totalMin: 1,
	totalMax: 7,
	decimals: 1,
	// The page shows the mean as 4.0, not 4; history and exports match.
	fixedDecimals: true,
	direction: 'higher-worse',
	// REVIEW: cut-off of 4 from Valko et al. 2008, Sleep, PMC2579971
	// (Discussion: "a FSS score >= 4 be interpreted as indicative of fatigue").
	// The page records and compares the mean rounded to one decimal, so 3.95
	// shows as 4.0 and falls in the upper band; 3.9 and 4.0 leave no gap.
	bands: [
		{ min: 1, max: 3.9, label: 'below the cut-off of 4' },
		{ min: 4, max: 7, label: 'at or above the cut-off of 4' },
	],
	bandSentence: (t, band) => `A score of ${Number(t).toFixed(1)} is ${band.label} that the largest validation study suggested as a sign of fatigue.`,
	// No minimal important change for post-viral illness. Rooney et al. 2019
	// (MS, cross-sectional) estimated 0.45-0.88; described in the copy, not set here.
	mic: null,
	subscores: [],
	topDomains: 0,
	reminderMonths: 1,
};
