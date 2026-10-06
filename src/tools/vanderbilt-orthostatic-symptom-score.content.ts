// REVIEW: interpretation copy for the Vanderbilt Orthostatic Symptom Score
// (VOSS), drafted for Craig's review. Single source for the visible
// "Understanding your VOSS score" section and the page's FAQPage JSON-LD:
// every FAQ answer is rendered on the page word for word.
//
// Figures and where they come from:
// Raj SR, et al. Circulation 2005;111(21):2734-2740 (PubMed 15911704), abstract:
// - 17 people with POTS; symptoms assessed seated and after standing up to
//   10 minutes; fall in symptom burden within 4 hours -10.4 (SD 14.0) on
//   pyridostigmine vs +0.6 (SD 7.5) on placebo.
// Raj SR, et al. Circulation 2009;120(9):725-734 (PMC2758650), Methods
// "Symptoms" and Table 2:
// - 9 symptoms rated 0-10 and summed (named the "Vanderbilt POTS Symptom
//   Score" in this paper); rated immediately before and 2 and 4 hours after
//   the study drug.
// - 36 people with symptom data for both days; median 17 (IQR 9-29) before
//   propranolol 20 mg, 16 (7.25-28.5) before placebo; change at 2 hours
//   median -4.5 vs 0 (P = 0.044).
// Stick M, et al. Eur J Neurol 2024;31:e16402 (PMC11414806):
// - 30 people with POTS; total fell by 5.38 (95% CI 0.36 to 10.43) with
//   slow deep breathing during a 10-minute tilt: Abstract and Results.
// - "lacks psychometric validation": Discussion (limitations).
// Bourne KM, et al. Can J Cardiol 2026;42(6):1320- (PMC13370740), Abstract and Table 1:
// - 18 women with POTS, 10-minute active stands, VOSS range 0-90; median 35
//   (IQR 25-60) without and 29 (16-45) with an abdominal garment in the
//   morning.
// Pereira TJ, Edgell H. Physiol Rep 2025;13:e70402 (PMC12177107), Methods and Table 2:
// - 27 healthy adults, VOSS at the end of 10 minutes of tilt; total 12
//   (SD 12) in the control (unmasked) trial.
// Removed from the old page because the full texts could not be read or the
// figures were not found: the Bourne 2021 JACC tilt figures (26, SD 17; 12
// with full compression), post-COVID POTS 41 falling to 33 after exercise, a
// mild post-COVID median of 1, "seated baselines of 14-27" and "treatment
// effects of 5-14 points".
// Differences vs comparator used for "roughly 4 to 11 points": 4.5 (Raj 2009),
// 11.0 (Raj 2005), 5.4 (Stick 2024), 6 (Bourne 2026, 35 vs 29).
// No validated cut-off and no minimal important change have been published.

export const SOURCES = {
	raj2005: { label: 'Raj et al. 2005', href: 'https://doi.org/10.1161/CIRCULATIONAHA.104.497594' },
	raj2009: { label: 'Raj et al. 2009', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2758650/' },
	stick: { label: 'Stick et al. 2024', href: 'https://doi.org/10.1111/ene.16402' },
	bourne: { label: 'Bourne et al. 2026', href: 'https://doi.org/10.1016/j.cjca.2025.11.038' },
	pereira: { label: 'Pereira and Edgell 2025', href: 'https://doi.org/10.14814/phy2.70402' },
};

/** Published VOSS totals, with the conditions they were rated under. */
export const REFERENCE = [
	{ group: 'Healthy adults', when: 'End of 10 minutes of tilt', n: '27', value: 'Average 12 (SD 12)', source: 'pereira' },
	{ group: 'POTS', when: 'Before a dose of propranolol or placebo, in a trial clinic', n: '36', value: 'Median 17', source: 'raj2009' },
	{ group: 'POTS', when: 'End of a 10-minute stand, no compression', n: '18', value: 'Median 35', source: 'bourne' },
] as const;

export const FAQ = {
	measures: {
		q: 'What is the Vanderbilt Orthostatic Symptom Score?',
		a: 'The VOSS is a nine-symptom rating used in POTS research, first by the Vanderbilt Autonomic Dysfunction Center. You rate mental clouding, blurred vision, shortness of breath, rapid heartbeat, tremulousness, chest discomfort, headache, lightheadedness and nausea from 0 (absent) to 10 for how you feel right now. The total runs from 0 to 90. Trials usually ask for it at the end of a stand or tilt.',
	},
	high: {
		q: 'What is a high VOSS score?',
		a: 'There is no validated cut-off. As rough reference points, 27 healthy adults averaged 12 at the end of 10 minutes of tilt, and 18 women with POTS had a median of 35 at the end of a 10-minute stand. Scores depend heavily on when and how you are rated, so compare your own results under the same conditions rather than against these figures.',
	},
	change: {
		q: 'What is a meaningful change in VOSS score?',
		a: 'No minimal important change has been published. In trials, treatments that helped lowered the total by roughly 4 to 11 points more than placebo or no treatment, but those were group averages measured in a clinic. For your own tracking, a change that repeats across several ratings made the same way is more likely to be real.',
	},
	compare: {
		q: 'How is the VOSS different from the Malmö POTS score or COMPASS-31?',
		a: 'The VOSS rates how you feel at one moment, usually while upright, so it pairs with a NASA lean test or tilt on the day. The Malmö POTS score covers the past 7 days, and the COMPASS-31 covers symptoms across six areas of autonomic function.',
	},
	diagnosis: {
		q: 'Can the VOSS diagnose POTS?',
		a: 'No. It has no validated cut-off and has not had a formal validation study. Healthy people report some symptoms after 10 minutes upright too. POTS is diagnosed from a sustained heart rate rise on standing or tilt, with symptoms, once other causes have been ruled out.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'high', 'change', 'compare', 'diagnosis'] as const;
