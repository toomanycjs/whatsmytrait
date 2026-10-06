// REVIEW: interpretation copy for the Fatigue Severity Scale, drafted for Craig's review.
// Single source for the visible "Understanding your FSS score" section and the
// page's FAQPage JSON-LD: every FAQ answer is rendered word for word.
//
// Figures, each checked against the source named:
// - Krupp et al. 1989, Arch Neurol 46(10):1121-1123 (PubMed abstract, PMID
//   2803071; full text not accessible): 25 people with MS, 29 with SLE, 20
//   healthy adults; internally consistent; separated patients from controls;
//   detected predicted change over time; largely independent of depressive
//   symptoms. The healthy mean of 2.3 (SD 0.7) is as quoted by Valko 2008
//   (Discussion). The old page's MS 4.7 and lupus 4.6 figures for this study
//   could not be checked and were removed.
// - Valko et al. 2008, Sleep 31(11):1601-1607 (full text, PMC2579971):
//   * Methods: nine items, past week, each 1-7, score = mean of the items
//   * Abstract and Table 1: mean (SD) 3.00 (1.08) in 454 healthy subjects,
//     4.66 (1.64) in 188 with MS, 3.90 (1.85) in 235 after ischaemic stroke,
//     4.34 (1.64) in 429 with sleep-wake disorders
//   * Table 1: score >= 4.0 in 18% healthy, 69% MS, 49% stroke, 62% sleep-wake
//   * Results, "Normal range and cutoff": healthy mean +/- 2 SD = 0.8-5.2;
//     with 5.2 as the cut-off, 3.5% of healthy controls had fatigue
//   * Discussion: "we suggest that a FSS score >= 4 be interpreted as
//     indicative of fatigue"; there was previously "no clearly defined FSS
//     cut-off"
//   * test-retest in 104 healthy subjects: 2.94 vs 2.90
// - Rooney et al. 2019, Mult Scler Relat Disord (PubMed abstract,
//   PMID 31400557): cross-sectional online survey of 365 people with MS;
//   anchor-based MID estimates 0.45-0.88; "a difference of at least 0.45
//   points on the FSS". Different population and a between-person design, so
//   it is described in the copy but not set as the config mic.
// The old page's "a change of 0.5 or more is generally considered clinically
// meaningful" had no source and was replaced with the Rooney figures above.

export const SOURCES = {
	krupp: { label: 'Krupp et al. 1989', href: 'https://doi.org/10.1001/archneur.1989.00520460115022' },
	valko: { label: 'Valko et al. 2008', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2579971/' },
	rooney: { label: 'Rooney et al. 2019', href: 'https://doi.org/10.1016/j.msard.2019.07.028' },
};

/** Valko et al. 2008, Table 1, plus the Krupp 1989 healthy mean as quoted by Valko. */
export const REFERENCE = [
	{ group: 'Healthy adults, original study (n = 20)', mean: '2.3', over4: 'not reported', source: 'krupp' },
	{ group: 'Healthy adults (n = 454)', mean: '3.0', over4: '18%', source: 'valko' },
	{ group: 'After ischaemic stroke (n = 235)', mean: '3.9', over4: '49%', source: 'valko' },
	{ group: 'Sleep-wake disorders (n = 429)', mean: '4.3', over4: '62%', source: 'valko' },
	{ group: 'Multiple sclerosis (n = 188)', mean: '4.7', over4: '69%', source: 'valko' },
] as const;

export const FAQ = {
	measures: {
		q: 'What does the Fatigue Severity Scale measure?',
		a: 'It measures how much fatigue affects your daily life: your motivation, exercise, physical functioning, duties, and work, family or social life. You rate nine statements about the past week from 1 (strongly disagree) to 7 (strongly agree), and your score is the average of the nine, from 1 to 7. Higher means fatigue has more impact.',
	},
	normal: {
		q: 'What is a normal FSS score?',
		a: 'In the largest validation study, 454 healthy adults in Switzerland averaged 3.0, and the authors suggested reading a score of 4 or more as a sign of fatigue. Even so, 18% of that healthy group scored 4 or more. In the original 1989 study, 20 healthy adults averaged 2.3.',
	},
	score5: {
		q: 'What does an FSS score of 5 or more mean?',
		a: 'A score of 5 or more is above the cut-off of 4 and above the average of every patient group in the Swiss validation study, which ranged from 3.9 after stroke to 4.7 in multiple sclerosis. Only 3.5% of the healthy adults scored above 5.2, the healthy average plus two standard deviations. It means fatigue is having a large effect on your life, but it does not say why.',
	},
	change: {
		q: 'What is a meaningful change in FSS score?',
		a: 'No minimal important change has been published for post-viral illness or ME/CFS. In a survey of 365 people with multiple sclerosis, differences of 0.45 to 0.88 points went with a meaningful difference in quality of life, and the authors suggest at least 0.45. That compared different people at one point in time rather than one person over time, so treat it as a rough guide.',
	},
	diagnosis: {
		q: 'Does the FSS diagnose ME/CFS or long COVID?',
		a: 'No. It measures how much fatigue gets in the way, not what causes it, and it does not ask about post-exertional malaise, sleep or thinking problems. High scores are common in many conditions, including multiple sclerosis, stroke and sleep disorders.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'normal', 'score5', 'change', 'diagnosis'] as const;
