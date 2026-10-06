// Orthostatic Grading Scale (OGS) config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const orthostaticGradingScale: ToolConfig = {
	id: 'orthostatic-grading-scale',
	version: '1',
	name: 'Orthostatic Grading Scale',
	path: '/tools/orthostatic-grading-scale/',
	totalMin: 0,
	totalMax: 20,
	decimals: 0,
	direction: 'higher-worse',
	// Thresholds of 4 or more (consistent with orthostatic intolerance) and 9 or
	// more (consistent with orthostatic hypotension), as stated in Słomko et al.,
	// J Clin Med 2020;9(8):2531, Methods, citing Schrezenmaier et al., Mayo Clin
	// Proc 2005;80(3):330-334. Integer totals, so 0-3, 4-8 and 9-20 leave no gaps.
	bands: [
		{ min: 0, max: 3, label: 'below 4' },
		{ min: 4, max: 8, label: '4 to 8' },
		{ min: 9, max: 20, label: '9 or more' },
	],
	// REVIEW: Layer 1 band sentence.
	bandSentence: (t, band) =>
		band.min >= 9
			? `A total of ${t} is 9 or more, the level that studies treat as consistent with orthostatic hypotension. It is not a diagnosis.`
			: band.min >= 4
				? `A total of ${t} is at or above 4, the level that studies treat as consistent with orthostatic intolerance, and below 9.`
				: `A total of ${t} is below 4, the lowest threshold used in published studies.`,
	// No published minimal important change.
	mic: null,
	topDomains: 0,
	// Item scores (0-4), kept for the record but out of the history table.
	subscores: [
		{ key: 'frequency', label: 'Frequency', max: 4, inTable: false },
		{ key: 'severity', label: 'Severity', max: 4, inTable: false },
		{ key: 'conditions', label: 'Conditions', max: 4, inTable: false },
		{ key: 'adl', label: 'Daily activities', max: 4, inTable: false },
		{ key: 'standing', label: 'Standing time', max: 4, inTable: false },
	],
	reminderMonths: 1,
};
