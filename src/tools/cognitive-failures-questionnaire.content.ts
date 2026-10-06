// REVIEW: interpretation copy for the Cognitive Failures Questionnaire (CFQ),
// drafted for Craig's review. Single source for the visible section and the
// FAQPage JSON-LD.
//
// Every figure used, and where it comes from (all opened and read):
// - Broadbent DE, Cooper PF, FitzGerald P, Parkes KR. Br J Clin Psychol
//   1982;21(1):1-16 (PubMed abstract only; full text is paywalled): measures
//   self-reported failures in perception, memory and motor function; correlates
//   with ratings by the respondent's spouse; reasonably stable over long periods,
//   like a trait; frequently correlates with current psychiatric symptoms.
//   No norms or cut-offs are taken from it here because the full text was not
//   available.
// - Goodman ZT et al. Psychol Assess 2022;34(7):671-683 (PMC10044453): 839 adults aged
//   16-85 from the Nathan Kline Institute-Rockland Sample (US community);
//   Table 2: CFQ total mean 31.71 (SD 12.70). A single factor fitted best;
//   subscales "are not recommended for use in future research or clinical
//   contexts" (abstract). CFQ total correlated only with one of the objective
//   tasks (r = .11) (Results). Table 1 lists the items in each factor of the
//   Rast et al. 2009 three-factor solution (Forgetfulness 1, 2, 5, 6, 7, 13, 16,
//   17, 20, 21, 22, 23; Distractibility 2, 5, 7, 8, 9, 10, 11, 14, 15, 16, 18,
//   19, 21, 25; False Triggering 1-6, 12, 13, 15, 17, 18, 20, 23, 24); the
//   page's sub-scores use these lists. Rast 2009 itself (Assessment
//   16(2):145-158) was not opened.
// - Bland AR et al. Sci Rep 2024;14:13368 (PMC11166972): Table 1, CFQ total
//   44.42 post-COVID syndrome (n = 50), 34.71 recovered (n = 59), 32.66 never
//   had COVID-19 (n = 53); recall period 2 weeks (Methods); subjective and
//   objective cognition not significantly related; subjective difficulties
//   driven by stress and fatigue (abstract).
// - Holland J et al. Brain Behav 2024;14:e70027 (PMC11422179): Table 2, CFQ
//   50.22 (SD 20.23) in 71 post-COVID clinic patients, 25.88 (SD 16.23) in 50
//   community controls who had COVID-19 without lasting symptoms (Ireland).
// - Miskowiak KW et al. J Affect Disord 2023;324:162-169 (PMC9795797): Table 1,
//   Copenhagen long COVID clinic, CFQ total 63.5 (SD 17.0), CFQ available for
//   182 of 194 patients; 164 (90%) scored 43 or more ("severe complaints").
//   Objective impairment correlated weakly with CFQ (r = -0.23).
// - Attree EA et al. Psychol Res Behav Manag 2014;7:67-76 (PMC3940708):
//   Table 1, CFQ 57.37 (SD 18.88) in 87 people with ME/CFS (85 women);
//   fatigue and depression directly associated with cognitive failures.
// - Berentschot JC et al. (CO-FLOW) J Intensive Care 2024;12:47 (PMC11546104):
//   uses CFQ cutoff > 43, citing a Dutch reference paper (Ponds, van Boxtel,
//   Jolles 2006, not opened). Berentschot JC et al. Lancet Reg Health Eur
//   2025;53:101290 (PMC12237789), Discussion: "the MCID has not been previously determined
//   for the CFQ".
// - Bridger RS et al. Ergonomics 2013;56(10):1515-1524 (abstract): two-year
//   test-retest reliability of the CFQ total 0.71.
// Removed from the old page because they could not be verified from a source
// opened here: Broadbent's original sample means (35-37, student nurses 52),
// UK naval personnel 37.6 (SD 14.0), the "one standard deviation above a Dutch
// reference mean" rationale for 43, and the Danish "61-67 / 83-90%" range
// (replaced by Miskowiak 2023, which gives 63.5 and 90%).
// No clinical cut-off and no minimal important change are published.

export const SOURCES = {
	broadbent: { label: 'Broadbent et al. 1982', href: 'https://doi.org/10.1111/j.2044-8260.1982.tb01421.x' },
	goodman: { label: 'Goodman et al. 2022', href: 'https://doi.org/10.1037/pas0001127' },
	rast: { label: 'Rast et al. 2009', href: 'https://doi.org/10.1177/1073191108324440' },
	bland: { label: 'Bland et al. 2024', href: 'https://doi.org/10.1038/s41598-024-62050-x' },
	holland: { label: 'Holland et al. 2024', href: 'https://doi.org/10.1002/brb3.70027' },
	miskowiak: { label: 'Miskowiak et al. 2023', href: 'https://doi.org/10.1016/j.jad.2022.12.122' },
	attree: { label: 'Attree et al. 2014', href: 'https://doi.org/10.2147/PRBM.S50645' },
	coflow: { label: 'Berentschot et al. 2025', href: 'https://doi.org/10.1016/j.lanepe.2025.101290' },
	bridger: { label: 'Bridger et al. 2013', href: 'https://doi.org/10.1080/00140139.2013.821172' },
};

/** Average CFQ totals reported in published studies (see header for tables). */
export const REFERENCE = [
	{ group: 'Irish adults who had COVID-19 without lasting symptoms (50)', mean: '25.9', source: 'holland' },
	{ group: 'US community adults (839)', mean: '31.7', source: 'goodman' },
	{ group: 'UK adults who had never had COVID-19 (53)', mean: '32.7', source: 'bland' },
	{ group: 'UK adults with post-COVID syndrome (50)', mean: '44.4', source: 'bland' },
	{ group: 'Irish post-COVID clinic patients (71)', mean: '50.2', source: 'holland' },
	{ group: 'People with ME/CFS (87)', mean: '57.4', source: 'attree' },
	{ group: 'Danish long COVID clinic patients (182)', mean: '63.5', source: 'miskowiak' },
] as const;

export const FAQ = {
	measures: {
		q: 'What is the Cognitive Failures Questionnaire?',
		a: 'The Cognitive Failures Questionnaire (CFQ) was published by Donald Broadbent and colleagues in 1982. It asks how often 25 everyday slips of attention, memory and action happen to you, each rated from 0 (never) to 4 (very often), for a total from 0 to 100. Higher scores mean more frequent lapses. It is widely used in research on brain fog after COVID-19 and in ME/CFS.',
	},
	normal: {
		q: 'What is a normal CFQ score?',
		a: 'There are no official cut-offs. A US community sample of 839 adults averaged 31.7, and UK adults who had never had COVID-19 averaged 32.7. Groups with long COVID have averaged between 44 and 64, and one group with ME/CFS 57. Some studies treat a score above 43 as high, but that is a research convention, not a validated threshold.',
	},
	impairment: {
		q: 'Does a high CFQ score mean I have cognitive impairment?',
		a: 'Not necessarily. The CFQ records how often you notice everyday slips, not how well you do on tests. In studies including people after COVID-19, CFQ scores were weakly linked or not linked to objective test results, and rose with fatigue, stress and low mood. A high score is a valid record of what you live with, but it is not a test of cognitive function.',
	},
	change: {
		q: 'What counts as a meaningful change in CFQ score?',
		a: 'No minimal important change has been published for the CFQ. It behaves like a stable trait: when adults were retested two years apart, their totals correlated at 0.71. This version asks about the past six months, so it moves slowly. Compare results taken several months apart and look for a steady trend rather than one difference.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'normal', 'impairment', 'change'] as const;
