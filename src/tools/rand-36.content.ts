// REVIEW: interpretation copy for the RAND-36, drafted for Craig's review.
// Single source for the visible section and the FAQPage JSON-LD.
//
// Sources, checked against the documents:
// - Hays RD, Sherbourne CD, Mazel RM. The RAND 36-Item Health Survey 1.0.
//   Health Econ 1993;2(3):217-227. Abstract only (via Europe PMC): same items
//   as the SF-36; SF-36 items and scoring distributed by MOS Trust; RAND's
//   recommended scoring is "somewhat different".
// - RAND, 36-Item Short Form Survey (SF-36) scoring instructions (rand.org,
//   read via the Internet Archive copy): Table 1 recoding (matches this page),
//   Table 2 items per scale, Table 3 means from the baseline of the Medical
//   Outcomes Study (N = 2,471): physical functioning 70.61, role
//   physical 52.97, role emotional 65.78, energy/fatigue 52.15, emotional
//   well-being 70.38, social functioning 78.77, pain 70.77, general health
//   56.99. Rounded to whole numbers below. RAND describes the sample as
//   patients in the MOS, not a general population sample.
// - Nacul LC et al. The functional status and well being of people with
//   ME/CFS and their carers. BMC Public Health 2011;11:402 (full text,
//   PMC3123211): 170 people with ME/CFS in England, SF-36 version 2, scored
//   with QualityMetric software. Table 2 "standard scores" (0-100) means:
//   physical functioning 30.1, role-physical 19.5, bodily pain 28.1, general
//   health 24.9, vitality 15.5, social functioning 28.9, role-emotional 47.2,
//   mental health 50.9. Results: mean scores lower than population means for
//   10 other chronic conditions (Table 4, norm-based summary scores).
// The previous page copy said "a sustained change of around 5 to 10 points is
// generally considered meaningful"; no source was found, so it is removed. No
// minimal important change for RAND-36 scale scores in ME/CFS or long COVID
// was found. General-population averages and long COVID figures on the old
// page were unsourced and are removed.

export const SOURCES = {
	hays1993: { label: 'Hays et al. 1993', href: 'https://doi.org/10.1002/hec.4730020305' },
	rand: { label: 'RAND scoring instructions', href: 'https://www.rand.org/health-care/surveys_tools/mos/36-item-short-form/scoring.html' },
	nacul2011: { label: 'Nacul et al. 2011', href: 'https://doi.org/10.1186/1471-2458-11-402' },
};

/** Mean scale scores: RAND Table 3 (MOS baseline, N = 2,471) and Nacul et al. 2011 Table 2 standard scores (ME/CFS, n = 170). */
export const REFERENCE = [
	{ scale: 'Physical functioning', mos: '71', mecfs: '30' },
	{ scale: 'Role limitations (physical)', mos: '53', mecfs: '20' },
	{ scale: 'Role limitations (emotional)', mos: '66', mecfs: '47' },
	{ scale: 'Energy / fatigue', mos: '52', mecfs: '16' },
	{ scale: 'Emotional well-being', mos: '70', mecfs: '51' },
	{ scale: 'Social functioning', mos: '79', mecfs: '29' },
	{ scale: 'Pain', mos: '71', mecfs: '28' },
	{ scale: 'General health', mos: '57', mecfs: '25' },
];

export const FAQ = {
	difference: {
		q: 'What is the difference between the RAND-36 and the SF-36?',
		a: 'They have the same 36 questions, which came from the Medical Outcomes Study. The SF-36 is distributed with its own scoring rules under licence; the RAND 36-Item Health Survey 1.0 is RAND\'s version, with a simpler scoring method that is somewhat different, so scores from the two are not always directly comparable. This page uses RAND\'s scoring.',
	},
	scoring: {
		q: 'How is the RAND-36 scored?',
		a: 'Each answer is recoded to a value from 0 to 100 using RAND\'s key, so that a higher value always means better health. The recoded answers are then averaged within eight scales: physical functioning, role limitations due to physical health, role limitations due to emotional problems, energy/fatigue, emotional well-being, social functioning, pain and general health. There is no overall total, and question 2, on change in health over the past year, is reported on its own.',
	},
	normal: {
		q: 'What is a normal RAND-36 score?',
		a: 'There are no official cut-offs or bands. RAND publishes average scores from 2,471 patients at the start of the Medical Outcomes Study, for example 71 for physical functioning, 52 for energy/fatigue and 70 for emotional well-being. These are averages for patients, not healthy norms, so use them as a rough guide only.',
	},
	mecfs: {
		q: 'What RAND-36 scores do people with ME/CFS have?',
		a: 'In a study of 170 people with ME/CFS in England, average scores out of 100 were 30 for physical functioning, 20 for role limitations due to physical health and 16 for vitality (energy), but 51 for mental health. Their summary scores were lower than published averages for 10 other chronic conditions. That study used version 2 of the SF-36 and its own scoring, so the numbers are a rough comparison rather than an exact match.',
	},
	change: {
		q: 'What is a meaningful change in RAND-36 scores?',
		a: 'No single minimal important change has been published for RAND-36 scales, and we found none for ME/CFS or long COVID. Most questions cover the past 4 weeks, so monthly is the shortest sensible gap. Look for a change that holds over two or more results, on the scales that matter most to you.',
	},
} as const;

export const FAQ_ORDER = ['difference', 'scoring', 'normal', 'mecfs', 'change'] as const;
