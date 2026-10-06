// REVIEW: interpretation copy for the SEBQ, drafted for Craig's review.
// Single source for the visible "Understanding your SEBQ score" section and
// the page's FAQPage JSON-LD: every FAQ answer is rendered word for word.
//
// Figures, each checked against the source named:
// - Courtney & Greenwood 2009, Int J Osteopath Med 12(4):121-127 (abstract,
//   via the University of the Sunshine Coast repository; full text not
//   accessible): 17-item version given to 83 adults; two factors, "lack of
//   air" and "perception of inappropriate or restricted breathing"; moderate
//   correlation with the Nijmegen Questionnaire.
// - Mitchell, Bacon & Moran 2016, Appl Psychophysiol Biofeedback 41(1):111-120
//   (PubMed abstract, PMID 26400252; full text not accessible): 25-item SEBQ,
//   180 participants online, 155 repeated after two weeks; ICC 0.89 (95% CI
//   0.85-0.92); mean 15.1 (SD 11.6) at test, 14.7 (SD 12.4) at retest;
//   standard error of measurement ("typical error") 4.0; Cronbach's alpha
//   0.93; single factor structure; smoking, reported respiratory disease,
//   recent respiratory illness and female gender predicted higher scores.
//   The abstract does not say how participants were recruited, so the page
//   no longer calls them a "community sample".
// - Kiesel et al. 2017, Int J Sports Phys Ther 12(5):774-786 (full text,
//   PMC5685417), Methods, "Psychophysiological dimension": "there is no
//   established cut-score confirmed in the literature ... Expert opinion
//   suggests a score of 25". (Methods say >=25; Tables 3, 6 and 7 say >25.)
// - Bondarenko et al. 2026, ERJ Open Res 00092-2026 (full text, PMC13501441),
//   SEBQ section and Table 2: 25 items, 4-point scale, total 0-75; air hunger
//   items correlate with the Nijmegen, restricted-breathing items do not;
//   high test-retest reliability; responsiveness shown in small cohorts;
//   "expert opinion suggests a cut-off score of >=25 for diagnosis, this has
//   not been verified"; best considered complementary rather than diagnostic.
// No validated cut-off, normal range or minimal important change is published,
// so the tool config has no bands and no mic.

export const SOURCES = {
	courtney2009: { label: 'Courtney and Greenwood 2009', href: 'https://doi.org/10.1016/j.ijosm.2009.02.001' },
	mitchell2016: { label: 'Mitchell et al. 2016', href: 'https://doi.org/10.1007/s10484-015-9316-7' },
	kiesel2017: { label: 'Kiesel et al. 2017', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5685417/' },
	bondarenko2026: { label: 'Bondarenko et al. 2026', href: 'https://doi.org/10.1183/23120541.00092-2026' },
};

export const FAQ = {
	measures: {
		q: 'What does the SEBQ measure?',
		a: 'The Self-Evaluation of Breathing Questionnaire measures how often you notice breathing sensations linked with dysfunctional breathing, such as breathlessness out of proportion to effort, sighing, and shallow, restricted or unsatisfying breaths. You rate 25 statements from 0 (never or not true at all) to 3 (very frequently or very true), giving a total from 0 to 75. Higher means more breathing symptoms.',
	},
	normal: {
		q: 'What is a normal SEBQ score?',
		a: 'No normal range or validated cut-off has been established. In a 2016 study of 180 people who completed the questionnaire online, the average was 15.1, with wide variation (standard deviation 11.6). A score of 25 or more has been used in research on the basis of expert opinion, but a 2026 review notes that it has not been verified.',
	},
	nijmegen: {
		q: 'How does the SEBQ differ from the Nijmegen questionnaire?',
		a: 'The Nijmegen questionnaire was designed for hyperventilation and includes symptoms beyond breathing, such as tingling, palpitations and anxiety. The SEBQ asks only about breathing. In its development study, its items fell into two groups: lack of air, which overlaps with the Nijmegen, and a sense of restricted or inappropriate breathing, which does not. That second group is what the SEBQ adds.',
	},
	change: {
		q: 'What is a meaningful change in SEBQ score?',
		a: 'No minimal important change has been published. When people repeated it two weeks apart, their scores were very consistent, with a typical error of about 4 points, so a difference of a few points between two results may just be noise. Small studies have shown scores falling after breathing treatment. Look for a steady trend across several results.',
	},
	diagnosis: {
		q: 'Does the SEBQ diagnose breathing pattern disorder?',
		a: 'No. It measures breathing symptoms, not how you breathe, and a 2026 review recommends treating it as a complement to other assessment rather than as a diagnostic test. Breathlessness has many causes, including heart and lung disease, which need investigating in their own right.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'normal', 'nijmegen', 'change', 'diagnosis'] as const;
