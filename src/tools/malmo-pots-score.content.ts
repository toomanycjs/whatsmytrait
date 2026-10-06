// REVIEW: interpretation copy for the Malmö POTS Symptom Score (MAPS), drafted
// for Craig's review. Single source for the visible "Understanding your MAPS
// score" section and the page's FAQPage JSON-LD: every FAQ answer is rendered
// on the page word for word.
//
// Figures, all checked against the full text:
// Spahic JM, Hamrefors V, Johansson M, et al. J Intern Med 2023;293(1):91-99
// (open access, PMC10087729).
// - 12 items rated 0 (no symptoms) to 10 (very pronounced symptoms) for the
//   previous 7 days, total 0-120; five cardiac and seven non-cardiac items:
//   Methods, "Malmö POTS symptom score".
// - items chosen from symptoms reported by at least 75% of 4,835 respondents
//   to a large international POTS survey: same section.
// - 62 people with POTS confirmed by head-up tilt, 50 healthy controls; POTS
//   following COVID-19 was an exclusion: Methods, "Study design and population".
// - mean total 78 (SD 20) in POTS vs 14 (SD 12) in controls: Abstract and
//   Results, "Correlation of MAPS with symptom severity in POTS".
// - optimal cut-off a total of 42 or more ("≥42"), Youden method, sensitivity
//   97%, specificity 98%: Abstract, Results, Figure 3 legend. The paper uses
//   "≥42" throughout; it never says "above 42".
// - single centre, highly selected POTS group, needs external validation:
//   "Strengths and limitations".
// - serial use to track treatment proposed for future studies: Discussion and
//   "Perspectives".
// - COMPASS-31 described as deemphasising some POTS symptoms: Discussion,
//   citing Rea et al. 2017 (not read by us; attributed to the MAPS authors).
// Stick M, et al. Eur J Neurol 2024;31:e16402 (PMC11414806), Table 1:
// - German translation of MAPS, 27 people with POTS, mean 63.04 (SEM 3.8).
// No severity bands beyond the 42 cut-off, and no minimal important change,
// have been published.

export const SOURCES = {
	spahic: { label: 'Spahic et al. 2023', href: 'https://doi.org/10.1111/joim.13566' },
	stick: { label: 'Stick et al. 2024', href: 'https://doi.org/10.1111/ene.16402' },
};

/** Average MAPS totals in published studies. */
export const REFERENCE = [
	{ group: 'Healthy controls (Sweden)', n: '50', mean: '14 (SD 12)', source: 'spahic' },
	{ group: 'POTS confirmed by tilt test (Sweden)', n: '62', mean: '78 (SD 20)', source: 'spahic' },
	{ group: 'POTS, specialist clinic (Germany)', n: '27', mean: '63', source: 'stick' },
] as const;

export const FAQ = {
	measures: {
		q: 'What is the Malmö POTS Symptom Score?',
		a: 'MAPS is a 12-question self-rating score designed specifically for POTS, published by a team in Malmö, Sweden, in 2023. You rate five cardiac symptoms (such as palpitations and dizziness) and seven non-cardiac symptoms (such as fatigue, brain fog and nausea) from 0 (no symptoms) to 10 (very pronounced) for the past 7 days. The total runs from 0 to 120; higher means a heavier symptom burden.',
	},
	compass: {
		q: 'How is MAPS different from the COMPASS-31?',
		a: 'The COMPASS-31 was built for autonomic disorders in general. MAPS was built for POTS and asks only about the past 7 days, which suits regular tracking. Its authors cite earlier work suggesting the COMPASS-31 underweights some symptoms that matter in POTS.',
	},
	high: {
		q: 'What is a high MAPS score?',
		a: 'The only published cut-off is 42. In the original study, a total of 42 or more best separated 62 people with tilt-confirmed POTS from 50 healthy controls, with 97% sensitivity and 98% specificity. People with POTS averaged 78 and healthy controls 14. No mild, moderate or severe bands have been published.',
	},
	change: {
		q: 'What is a meaningful change in MAPS score?',
		a: 'No minimal important change has been published, and the original study scored each person once, so it did not measure how much totals vary from week to week. The authors suggest MAPS for tracking symptoms and treatment response but say this still needs testing. A change that holds across several weekly results is more likely to be real than a one-off difference.',
	},
	diagnosis: {
		q: 'Does a high MAPS score mean I have POTS?',
		a: 'No. MAPS measures symptoms, not heart rate. The study compared POTS only with healthy people, so it cannot tell POTS apart from other conditions with similar symptoms, such as ME/CFS, and it excluded people whose POTS followed COVID-19. POTS is diagnosed from a sustained heart rate rise on standing or tilt, with symptoms, once other causes have been ruled out.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'high', 'change', 'compass', 'diagnosis'] as const;
