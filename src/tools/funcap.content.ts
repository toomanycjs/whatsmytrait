// REVIEW: interpretation copy for FUNCAP27, drafted for Craig's review.
// Single source for the visible section and the FAQPage JSON-LD.
//
// Source: Sommerfelt K, Schei T, Seton KA, Carding SR. Assessing functional
// capacity in ME/CFS: a patient-informed questionnaire. J Clin Med
// 2024;13:3486. Checked against the full text:
// - six survey rounds with patient feedback; FUNCAP55 for diagnosis and
//   disability assessment, FUNCAP27 for follow-up and research
// - Round 5: 1,263 people with ME/CFS and 178 healthy controls (under 60);
//   Round 4 international English-language: 1,387 people with ME/CFS
// - Table 5, FUNCAP27 means: total 3.3 (SD 1.1) ME/CFS, 5.8 (0.3) controls;
//   domains A-H as in REFERENCE below
// - total score = mean of the A-H domain scores
// - Round 6 test-retest, 301 people, two weeks apart: total ICC 0.98
// - Table 6: domain D floor effect 14.6% (FUNCAP27)
// - known-groups: means lower at each ICC severity level
// - limitations: does not assess quality of life or symptoms such as
//   fatigue, pain, nausea and unrefreshing sleep
// No cut-offs or minimal important change are published.

export const SOURCES = {
	sommerfelt: { label: 'Sommerfelt et al. 2024', href: 'https://doi.org/10.3390/jcm13123486' },
	funcapNo: { label: 'funcap.no', href: 'https://www.funcap.no' },
};

/** Table 5, FUNCAP27 domain and total means: ME/CFS (n = 1,263) and healthy controls (n = 178). */
export const REFERENCE = [
	{ domain: 'Personal hygiene and basic functions', mecfs: '4.5', healthy: '6.0' },
	{ domain: 'Walking and moving around', mecfs: '3.1', healthy: '5.9' },
	{ domain: 'Being upright', mecfs: '4.1', healthy: '5.9' },
	{ domain: 'Activities in the home', mecfs: '2.2', healthy: '5.7' },
	{ domain: 'Communication', mecfs: '3.3', healthy: '5.8' },
	{ domain: 'Activities outside the home', mecfs: '2.7', healthy: '5.8' },
	{ domain: 'Reactions to light and sound', mecfs: '3.4', healthy: '5.8' },
	{ domain: 'Concentration', mecfs: '3.2', healthy: '5.8' },
	{ domain: 'Total', mecfs: '3.3', healthy: '5.8' },
];

export const FAQ = {
	measures: {
		q: 'What is the FUNCAP questionnaire?',
		a: 'FUNCAP measures functional capacity in ME/CFS: what everyday activities cost you, rather than how bad your symptoms are. Each of 27 activities, in eight groups, is scored from 0 (I cannot do this) to 6 (does not affect other activities) for a typical day over the past month. Each group score is the mean of its activities, and the total is the mean of the eight group scores.',
	},
	normal: {
		q: 'What is a normal FUNCAP score?',
		a: 'There are no official cut-offs. In the validation study, the average FUNCAP27 total was 3.3 among 1,263 people with ME/CFS and 5.8 among 178 healthy controls. Average scores were lower at each step of ME/CFS severity, from mild to very severe.',
	},
	score3: {
		q: 'What does a FUNCAP score of 3 mean?',
		a: 'A total of 3 is close to the ME/CFS average in the validation study. On the answer scale, 3 means an activity leaves you able to do little else that day, so a total around 3 means many everyday activities carry roughly that cost.',
	},
	change: {
		q: 'What is a meaningful change in FUNCAP score?',
		a: 'No minimal important change has been published. When 301 people with ME/CFS answered FUNCAP27 twice, two weeks apart, their totals were highly repeatable, so a steady shift across several monthly results is more likely to be real than a one-off difference. Answer for a typical day each time, not a crash or a good patch.',
	},
	diagnosis: {
		q: 'Does FUNCAP diagnose ME/CFS?',
		a: 'No. It records what activities cost you, not why. It does not measure symptoms such as fatigue, pain or unrefreshing sleep, or quality of life, and a total can hide large differences between groups of activities.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'normal', 'score3', 'change', 'diagnosis'] as const;
