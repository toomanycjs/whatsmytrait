// Bell CFIDS Disability Scale config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

export const bellScale: ToolConfig = {
	id: 'bell-scale',
	// 2: level descriptions restored to Bell 1995 (October 2026).
	version: '2',
	name: 'Bell scale',
	path: '/tools/bell-scale/',
	totalMin: 0,
	totalMax: 100,
	decimals: 0,
	direction: 'higher-better',
	// No bands beyond the 11 descriptions, and no published minimal important change.
	mic: null,
	subscores: [],
	reminderMonths: 1,
};

/**
 * One-line summaries of each level, for the result sentence that names the
 * chosen step and its neighbours. Each is a condensed form of Bell's
 * description (Bell 1995, pp 119-31). REVIEW.
 */
export const BELL_SHORT: Record<number, string> = {
	100: 'no symptoms, normal activity and full-time work without difficulty',
	90: 'symptoms only with activity, and normal activity and work',
	80: 'mild symptoms at rest, limits only on exertion, and full-time work that is hard in physical jobs',
	70: 'functioning close to 90% of expected, and full-time work with difficulty',
	60: 'functioning at 70 to 90% of expected, and full-time light work only with flexible hours',
	50: 'activity at about 70% of expected, and light or desk work for 4 to 5 hours a day',
	40: 'activity at 50 to 70% of expected, not confined to the house, and desk work for 3 to 4 hours a day',
	30: 'activity at about 50% of expected, usually confined to the house, and desk work for 2 to 3 hours a day',
	20: 'activity at 30 to 50% of expected, rarely leaving the house, and in bed most of the day',
	10: 'bedridden most of the time, with no travel outside the house',
	0: 'bedridden all the time and unable to care for yourself',
};
