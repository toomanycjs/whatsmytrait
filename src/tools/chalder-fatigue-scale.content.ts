// REVIEW: interpretation copy for the Chalder Fatigue Scale (CFQ-11), drafted for Craig's review.
// Single source for the visible "Understanding your Chalder Fatigue Scale
// score" section and the page's FAQPage JSON-LD: every FAQ answer is rendered
// word for word.
//
// Figures, each checked against the source named:
// - Chalder et al. 1993, J Psychosom Res 37(2):147-153 (PubMed abstract, PMID
//   8463991; full text not accessible): 14-item scale; 274 new registrations
//   at a general practice; 100 attenders compared with the fatigue item of
//   the revised Clinical Interview Schedule; two factors (physical, mental);
//   "using an arbitrary cut off score of 3/4": sensitivity 75.5, specificity 74.5.
// - Cella & Chalder 2010, J Psychosom Res 69(1):17-22 (PubMed abstract, PMID
//   20630259; full text not accessible): 361 people with CFS, 1,615 in the
//   community; two components; ROC area under the curve .91. The Likert means
//   are as quoted by papers that cite it:
//     * 14.2 (SD 4.6), "adult attendees to UK general practice": White et al.
//       2011, Lancet (PACE), full text PMC3065633, Methods, Outcomes
//     * 24.4 (SD 5.8) in 361 CFS and 14.2 (SD 4.6) in 1,615: Hofmann et al.
//       2023, Front Med, full text PMC10725950, Methods 2.3.3; also Isman et
//       al. 2024, Brain Behav Immun Health, PMC10862402
// - White et al. 2011, Lancet 377:823-836 (PACE), full text PMC3065633,
//   Methods: Likert scoring 0-33 as primary outcome (changed from bimodal);
//   entry required bimodal >= 6; "clinically useful difference" between group
//   means = 0.5 SD at baseline = 2 points; "normal range" = less than mean
//   plus 1 SD of 14.2 (+4.6), "score of 18 or less".
// - Stavem et al. 2021, Int J Environ Res Public Health 18(4):2030, full text
//   PMC7921928: 11 items scored 0-3, total 0-33; physical 7 items 0-21; mental
//   4 items 0-12; bimodal 0 (answers 0-1) or 1 (answers 2-3), 0-11, case
//   cut-off >= 4. 458 non-hospitalised adults about four months after COVID-19:
//   bimodal mean 3.9, 46% scored 4 or more; Likert (n = 456) mean 15.1 (SD 5.0),
//   physical 10.1 (3.8), mental 5.0 (1.8). Norwegian general population: 22%
//   scored 4 or more (Loge et al. 1998, as reported in the Discussion).
//
// Removed from the old page because they could not be checked against a
// source that was opened:
// - "A Likert score of 29 or more separated the two groups in 96% of cases".
//   Only a secondary paper (Isman 2024) repeats it, the primary full text was
//   not accessible, and with a CFS mean of 24.4 a cut-off of 29 cannot
//   classify 96% of both groups correctly (the 96% is probably specificity).
// - "Some 2023 long COVID trials have used 16 or more on physical and 8 or
//   more on mental" (no source found).
// - "Roughly one in seven people in general-population samples score 4 or
//   more" (replaced by the sourced Norwegian 22%).
// - Bimodal means of 9.1 (CFS) and 3.3 (community) for Cella & Chalder 2010.
// - Sensitivity and specificity described as being for the 11-item version:
//   the 1993 abstract reports them for the 14-item scale.

export const SOURCES = {
	chalder1993: { label: 'Chalder et al. 1993', href: 'https://doi.org/10.1016/0022-3999(93)90081-p' },
	cella2010: { label: 'Cella and Chalder 2010', href: 'https://doi.org/10.1016/j.jpsychores.2009.10.007' },
	white2011: { label: 'White et al. 2011', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3065633/' },
	stavem2021: { label: 'Stavem et al. 2021', href: 'https://doi.org/10.3390/ijerph18042030' },
};

/** Likert reference points (0-33). */
export const REFERENCE = [
	{ score: '14.2', group: 'Average of 1,615 adults attending UK general practice', source: 'cella2010' },
	{ score: '15.1', group: 'Average of 456 non-hospitalised adults about four months after COVID-19, in Norway', source: 'stavem2021' },
	{ score: '18', group: 'Top of the PACE trial\'s "normal range" (14.2 plus one standard deviation of 4.6)', source: 'white2011' },
	{ score: '24.4', group: 'Average of 361 people with chronic fatigue syndrome', source: 'cella2010' },
] as const;

export const FAQ = {
	scoring: {
		q: 'How is the Chalder Fatigue Scale scored?',
		a: 'Each of the 11 questions has four answers. Likert scoring gives them 0, 1, 2 and 3, for a total from 0 to 33, with a physical fatigue subscale (questions 1 to 7, 0 to 21) and a mental fatigue subscale (questions 8 to 11, 0 to 12). Bimodal scoring counts the first two answers as 0 and the last two as 1, for a total from 0 to 11. On both, higher means more fatigue.',
	},
	normal: {
		q: 'What is a normal Chalder Fatigue Scale score?',
		a: 'In a UK study, 1,615 adults attending general practice averaged 14.2 on Likert scoring, with a standard deviation of 4.6, and 361 people with chronic fatigue syndrome averaged 24.4. On bimodal scoring, 4 or more is the conventional cut-off for significant fatigue; in a Norwegian general population survey, 22% scored at that level.',
	},
	bimodal: {
		q: 'What does a bimodal score of 4 or more mean?',
		a: 'It means you chose one of the two higher answers on at least four questions. In the 1993 study that developed the scale, then 14 questions long, a cut-off between 3 and 4, which the authors called arbitrary, agreed with a psychiatric interview\'s rating of fatigue with about 75% sensitivity and 75% specificity. It marks significant fatigue, not any particular condition.',
	},
	change: {
		q: 'What is a meaningful change in Chalder Fatigue Scale score?',
		a: 'No minimal important change has been published for individuals. The PACE trial treated a 2-point difference in average Likert scores between treatment groups as clinically useful, set at half the starting standard deviation, but that is a rule for comparing groups, not for one person. The questions cover the past month, so repeat it monthly and look at the trend.',
	},
	diagnosis: {
		q: 'Does the Chalder Fatigue Scale diagnose ME/CFS?',
		a: 'No. It measures how much fatigue you have compared with when you were last well, not why. It does not ask about post-exertional malaise, which is central to ME/CFS, and fatigue has many causes that a doctor will want to rule out.',
	},
} as const;

export const FAQ_ORDER = ['scoring', 'normal', 'bimodal', 'change', 'diagnosis'] as const;
