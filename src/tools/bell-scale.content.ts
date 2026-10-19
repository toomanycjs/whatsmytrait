// REVIEW: interpretation copy for the Bell scale, drafted for Craig's review.
// Single source for the visible section and the FAQPage JSON-LD.
//
// Sources:
// - Bell DS. The measurement of disability. In: The Doctor's Guide to Chronic
//   Fatigue Syndrome, 2nd ed. 1995, pp 119-31: the 11 level descriptions.
// - ClinicalTrials.gov NCT07724834: ME/CFS trial using change in Bell score
//   as an outcome.
// No published validation study, normative data or minimal important change
// was found for the Bell scale.

export const SOURCES = {
	trial: { label: 'ClinicalTrials.gov NCT07724834', href: 'https://clinicaltrials.gov/study/NCT07724834' },
};

/** The 11 published level descriptions, used by the form and the per-score headings. */
export const LEVELS = [
	{ value: 100, description: 'No symptoms at rest or with exercise. Normal overall activity. Able to work full-time without difficulty.' },
	{ value: 90, description: 'No symptoms at rest. Mild symptoms with activity. Normal overall activity. Able to work full-time without difficulty.' },
	{ value: 80, description: 'Mild symptoms at rest, made worse by exertion. Activity only slightly restricted, and only for activities that need exertion. Able to work full-time, with difficulty in jobs that need exertion.' },
	{ value: 70, description: 'Mild symptoms at rest. Some limitation of daily activity, clearly noticeable. Overall functioning close to 90% of expected, except for activities that need exertion. Able to work full-time with difficulty.' },
	{ value: 60, description: 'Mild to moderate symptoms at rest. Limitation of daily activity, clearly noticeable. Overall functioning 70–90% of expected. Unable to work full-time in jobs involving physical labour, but able to work full-time in light work if hours are flexible.' },
	{ value: 50, description: 'Moderate symptoms at rest. Moderate to severe symptoms with exercise or activity. Overall activity reduced to 70% of expected. Unable to do strenuous work, but able to do light duties or desk work for 4–5 hours a day, with rest periods.' },
	{ value: 40, description: 'Moderate symptoms at rest. Moderate to severe symptoms with exercise or activity. Overall activity reduced to 50–70% of expected. Not confined to the house. Unable to do strenuous work; able to do light duties or desk work for 3–4 hours a day, with rest periods.' },
	{ value: 30, description: 'Moderate to severe symptoms at rest. Severe symptoms with any exercise. Overall activity reduced to 50% of expected. Usually confined to the house. Unable to do any strenuous tasks. Able to do desk work for 2–3 hours a day, with rest periods.' },
	{ value: 20, description: 'Moderate to severe symptoms at rest. Unable to do strenuous activity. Overall activity 30–50% of expected. Rarely able to leave the house. In bed most of the day. Unable to concentrate for more than an hour a day.' },
	{ value: 10, description: 'Severe symptoms at rest. Bedridden most of the time. No travel outside the house. Marked cognitive symptoms that prevent concentration.' },
	{ value: 0, description: 'Severe symptoms all the time. Bedridden constantly. Unable to care for self.' },
];

export const FAQ = {
	measures: {
		q: 'What does the Bell CFIDS Disability Scale measure?',
		a: 'It rates your overall level of functioning from 0 to 100 in steps of 10. Each step describes symptoms at rest and with activity, how much of a normal level of activity you manage, and how much work you could do. 100 means no symptoms and full activity; 0 means bedridden all the time and unable to care for yourself.',
	},
	bands: {
		q: 'Does the Bell scale have score bands?',
		a: 'No. Each of its 11 steps is its own description, so there are no separate bands. The descriptions give activity as a share of what would be expected: close to 90% at 70, 70 to 90% at 60, about 70% at 50, 50 to 70% at 40, about 50% at 30 and 30 to 50% at 20. From 30 down, they describe being mostly confined to the house; at 10 and 0, bedridden.',
	},
	score40: {
		q: 'What does a Bell scale score of 40 mean?',
		a: 'A score of 40 describes moderate symptoms at rest and moderate to severe symptoms with activity, overall activity at 50 to 70% of what would be expected, not being confined to the house, and being able to do light or desk work for 3 to 4 hours a day with rest periods.',
	},
	change: {
		q: 'What is a meaningful change on the Bell scale?',
		a: 'No minimal important change has been published for the Bell scale. Because it moves in steps of 10, one step is the smallest change it can record. Function in ME/CFS often varies from week to week, so a change is more convincing when it holds over several weeks than when it appears once.',
	},
	diagnosis: {
		q: 'Can the Bell scale diagnose ME/CFS?',
		a: 'No. It is a single overall rating of function, not a diagnostic test. It does not show which activities cost you most, how long crashes after exertion last, or which symptoms dominate.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'bands', 'score40', 'change', 'diagnosis'] as const;
