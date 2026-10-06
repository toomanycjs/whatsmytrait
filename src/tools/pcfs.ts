// Post-COVID-19 Functional Status scale config for saved results, history and reminders.

import type { ToolConfig } from '../scripts/results/types';

// REVIEW: Layer 1 grade descriptions, paraphrased from the PCFS manual
// (version 2, July 2020): Table 1 (scale grades), Table 2 (patient
// questionnaire) and structured interview section 3 (basic ADL examples).
export const PCFS_GRADE_TEXT = [
	'no symptoms, pain, depression or anxiety, and no limits on everyday life',
	'you can still do all your usual duties and activities at the same intensity, despite some symptoms, pain, depression or anxiety',
	'you do your usual duties and activities at a lower intensity, or occasionally avoid, reduce or spread them out, but you can still do them all without help',
	'you can no longer do all your usual duties and activities, so some have been cut back or taken over by others, but you can look after yourself without help',
	'you need help from another person with activities of daily living, such as eating, using the toilet, washing or walking',
];

export const pcfs: ToolConfig = {
	id: 'pcfs',
	version: '1',
	name: 'PCFS scale',
	path: '/tools/pcfs/',
	totalMin: 0,
	totalMax: 4,
	decimals: 0,
	direction: 'higher-worse',
	// The grades are the bands: names from the PCFS manual v2 (July 2020), Table 1,
	// and Klok et al., Eur Respir J 2020;56:2001494, figure 1. Integer grades only.
	bands: [
		{ min: 0, max: 0, label: 'no functional limitations' },
		{ min: 1, max: 1, label: 'negligible functional limitations' },
		{ min: 2, max: 2, label: 'slight functional limitations' },
		{ min: 3, max: 3, label: 'moderate functional limitations' },
		{ min: 4, max: 4, label: 'severe functional limitations' },
	],
	// REVIEW: Layer 1 band sentence.
	bandSentence: (t, band) => `Grade ${t} means ${band.label}: ${PCFS_GRADE_TEXT[Number(t)] ?? ''}.`,
	// No published minimal important change.
	mic: null,
	subscores: [],
	topDomains: 0,
	reminderMonths: 1,
};
