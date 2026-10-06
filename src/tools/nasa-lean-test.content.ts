// REVIEW: interpretation copy for the NASA lean test, drafted for Craig's
// review. Single source for the visible "Understanding your NASA lean test
// result" section and the page's FAQPage JSON-LD: every FAQ answer is
// rendered on the page word for word.
//
// Figures and where they come from:
// Sheldon RS, et al. 2015 HRS expert consensus statement. Heart Rhythm
// 2015;12(6):e41-63 (PMC5267948), POTS definition section:
// - heart rate rise of 30 bpm or more from lying to standing (more than 30
//   seconds), 40 bpm or more at ages 12 to 19; no orthostatic hypotension
//   (systolic drop over 20 mmHg). A standing rate of 120 or more is described
//   as common, not required.
// Vernino S, et al. Auton Neurosci 2021;235:102828 (PMC8455420), section 2
// "Clinical description":
// - sustained rise of at least 30 bpm within 10 minutes of standing or
//   head-up tilt (at least 40 at ages 12 to 19); no sustained systolic drop of
//   20 mmHg or more; frequent symptoms on standing; symptoms for at least 3
//   months; no other cause of fast heart rate.
// Spahic JM, et al. J Intern Med 2023;293(1):91-99 (PMC10087729), Introduction:
// - European Society of Cardiology criteria also accept a heart rate above
//   120 bpm upright. Used only to explain where "120" comes from; we did not
//   read the ESC guideline itself.
// Lee J, et al. J Transl Med 2020;18:314 (PMC7429890):
// - 150 people with ME/CFS and 75 healthy controls; readings every minute for
//   10 minutes; at least 5 minutes needed to see changes (Results, abstract).
// - definitions: orthostatic hypotension = systolic drop of 20 mmHg or more or
//   diastolic drop of 10 or more in the first 3 minutes; POTS = rise over 30
//   or rate over 120, averaged over the last 3 minutes (Methods).
// - by 10 minutes, 33% of healthy controls and 40% of people with ME/CFS met
//   their POTS heart rate criteria (Table 2).
// Iftekhar N, et al. Front Neurol 2025;16:1625216 (PMC12527860), abstract:
// - 112 adults without orthostatic intolerance; average rise on standing 9.89
//   (SD 8.15) bpm, sustained rise 6.23 (SD 6.94); none met criteria for
//   symptomatic orthostatic hypotension or POTS.
// Issa A, et al. J Clin Med 2025;14(17):6269 (PMC12428951), Methods and Table 2:
// - MCAM lean test, POTS = rise of 30 or more or 120 or more without
//   orthostatic hypotension; POTS in 10.6% of people with ME/CFS tested and
//   4.8% of healthy controls (390 people tested).
// Teuschl Y, et al. Clin Auton Res 2025;35(3):529-531 (PMC12137516), letter:
// - no validation studies against tilt or active stand testing; the test "may
//   currently not be used as a diagnostic tool"; active stand tests preferred;
//   a 1975 NASA experiment (Hyatt et al.) in five men found larger heart rate
//   changes with the lean than with 70-degree tilt.
// Spahic 2023, Methods: cardiovascular medication stopped 48 h before testing,
// fasting from the evening before (example of controlled test conditions).
// No minimal important change, and no figure for day-to-day variation of a
// home lean test, has been published that we could find.

export const SOURCES = {
	sheldon: { label: 'Sheldon et al. 2015', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5267948/' },
	vernino: { label: 'Vernino et al. 2021', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8455420/' },
	spahic: { label: 'Spahic et al. 2023', href: 'https://doi.org/10.1111/joim.13566' },
	lee: { label: 'Lee et al. 2020', href: 'https://doi.org/10.1186/s12967-020-02481-y' },
	iftekhar: { label: 'Iftekhar et al. 2025', href: 'https://doi.org/10.3389/fneur.2025.1625216' },
	issa: { label: 'Issa et al. 2025', href: 'https://doi.org/10.3390/jcm14176269' },
	teuschl: { label: 'Teuschl et al. 2025', href: 'https://doi.org/10.1007/s10286-024-01097-2' },
};

/** How often a 10-minute lean test met POTS heart rate criteria in published studies. */
export const REFERENCE = [
	{ group: 'Healthy adults (UK)', n: '112', result: 'None', source: 'iftekhar' },
	{ group: 'Healthy controls (US, MCAM)', n: '131 tested', result: '4.8%', source: 'issa' },
	{ group: 'Healthy controls (US, Lee)', n: '75', result: '33% by 10 minutes', source: 'lee' },
	{ group: 'ME/CFS (US, MCAM)', n: '258 tested', result: '10.6%', source: 'issa' },
	{ group: 'ME/CFS (US, Lee)', n: '150', result: '40% by 10 minutes', source: 'lee' },
] as const;

export const FAQ = {
	what: {
		q: 'What is the NASA lean test?',
		a: 'A simple test of how heart rate and blood pressure respond to being upright. You lie flat for 10 minutes, then lean with your shoulder blades against a wall, heels about 15 cm out, for 10 minutes. Your result here is the rise in heart rate: the peak while leaning minus the last reading lying down.',
	},
	threshold: {
		q: 'What heart rate rise counts as POTS on a lean test?',
		a: 'The consensus definitions of POTS use a sustained rise of 30 bpm or more within 10 minutes of standing or tilt (40 bpm or more at ages 12 to 19), without a sustained drop in systolic blood pressure of 20 mmHg or more, with symptoms on standing for at least 3 months. Some definitions also accept a standing heart rate above 120 bpm. These criteria were set for standing and tilt tests, not the lean test.',
	},
	normal: {
		q: 'What is a normal heart rate rise on a lean test?',
		a: 'In 112 UK adults without orthostatic symptoms, heart rate rose by about 10 bpm on average and none met POTS criteria. Other studies differ: in one US study a third of healthy controls met its POTS heart rate criteria by the tenth minute. So a rise over 30 is not, on its own, a diagnosis.',
	},
	diagnose: {
		q: 'Can a home NASA lean test diagnose POTS?',
		a: 'No. Autonomic specialists point out that the lean test has not been validated against tilt-table or standard standing tests, and that home readings can be inaccurate. A diagnosis also needs symptoms over time and other causes ruled out. A home result is a reason to ask for proper testing.',
	},
	repeat: {
		q: 'Why does my lean test result change from day to day?',
		a: 'Clinical tests control things that affect heart rate, such as recent meals and heart rate medication, and home tests usually cannot. We found no published figure for how much a home lean test varies between days, so look for a pattern across several tests done the same way.',
	},
} as const;

export const FAQ_ORDER = ['what', 'threshold', 'normal', 'diagnose', 'repeat'] as const;
