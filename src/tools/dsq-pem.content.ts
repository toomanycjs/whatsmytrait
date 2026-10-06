// REVIEW: interpretation copy for the DSQ-PEM, drafted for Craig's review.
// Single source for the visible section and the FAQPage JSON-LD.
//
// Sources, checked against the documents:
// - Cotler J, Holtzman C, Dudun C, Jason LA. A brief questionnaire to assess
//   post-exertional malaise. Diagnostics 2018;8(3):66 (full text, PMC6165517):
//   - Introduction: the five DSQ PEM items were recommended as a first step by
//     the NIH/CDC Common Data Elements PEM working group; in an earlier study
//     (Jason et al., ref 10) 97% of 704 patients with ME/CFS reported at least
//     one of them at half the time or more and moderate or worse.
//   - Methods 2.1: 376 ME/CFS, 157 multiple sclerosis (MS), 167 post-polio
//     syndrome (PPS); diagnoses were self-reported.
//   - Methods 2.2.1: 0-4 frequency and severity scales; six-month time frame.
//   - Results, ROC section: PEM lasting 14 h or more, sensitivity 87.5% and
//     specificity 77.8%; 24 h or more, sensitivity 73.4%, specificity 88.6%.
//   - Discussion: 99% of the 2018 sample met step 1.
//   - Table 2: quick recovery "yes" in 1.3% ME/CFS, 42.3% MS, 38.3% PPS.
//   - Table 3: PEM duration by illness (DURATION below).
//   - Appendix A: item wording. Appendix B: scoring. Step 1, a frequency and
//     severity of 2, 2 on any of items 1-5 indicates PEM. Step 2, item 7 or 8
//     yes and item 9 of 14 hours or more indicates ME/CFS; items 6 and 10
//     describe PEM for clinical evaluation only.
// - DePaul measures page: "All instruments are free to use."
// - NICE NG206 (2021), box 2 (PEM: often delayed by hours or days,
//   disproportionate, prolonged recovery) and recommendation 1.11.14 (do not
//   offer programmes with fixed incremental increases, e.g. graded exercise
//   therapy).
// No minimal important change has been published for the DSQ-PEM.

export const SOURCES = {
	cotler2018: { label: 'Cotler et al. 2018', href: 'https://doi.org/10.3390/diagnostics8030066' },
	depaul: { label: 'DePaul measures page', href: 'https://csh.depaul.edu/about/centers-and-institutes/ccr/myalgic-encephalomyelitis-cfs/Pages/measures.aspx' },
	nice: { label: 'NICE NG206', href: 'https://www.nice.org.uk/guidance/ng206' },
};

/** Cotler et al. 2018, Table 3: how long worsening after activity lasts, % of each group. */
export const DURATION = [
	{ duration: 'Not worse after activity', mecfs: '2.1', ms: '21.0', pps: '12.3' },
	{ duration: '1 hour or less', mecfs: '0.8', ms: '10.8', pps: '13.2' },
	{ duration: '2–3 hours', mecfs: '2.1', ms: '28.7', pps: '19.8' },
	{ duration: '4–10 hours', mecfs: '6.1', ms: '17.2', pps: '11.4' },
	{ duration: '11–13 hours', mecfs: '1.3', ms: '3.2', pps: '3.6' },
	{ duration: '14–23 hours', mecfs: '14.1', ms: '10.2', pps: '11.4' },
	{ duration: '24 hours or more', mecfs: '73.4', ms: '8.9', pps: '13.8' },
];

export const FAQ = {
	measures: {
		q: 'What is the DSQ-PEM?',
		a: 'The DSQ-PEM is a 10-question short form of the DePaul Symptom Questionnaire for post-exertional malaise (PEM), published by Cotler, Holtzman, Dudun and Jason in 2018. Five questions rate how often and how badly you have had PEM symptoms over the past six months. Five more ask how long the worsening lasts and what sets it off. It is free to use.',
	},
	scoring: {
		q: 'How is the DSQ-PEM scored?',
		a: 'Scoring has two steps. Step 1: PEM is indicated if any of the five symptoms happens at least half the time and is at least moderate, a frequency and severity of 2 or more out of 4. Step 2, the pattern that points to ME/CFS: you feel worse after minimal physical effort or after mental effort, and the worsening lasts 14 hours or more. The other two questions describe your PEM for a clinician but do not count towards either step.',
	},
	recovery: {
		q: 'Why does recovery time matter in the DSQ-PEM?',
		a: 'In the 2018 study, how long the worsening lasted was the question that best separated people with ME/CFS from people with multiple sclerosis or post-polio syndrome. A cut-off of 14 hours or more included 87.5% of the ME/CFS group and excluded 77.8% of the other two groups. 73.4% of people with ME/CFS said it lasted 24 hours or more, against 8.9% with multiple sclerosis and 13.8% with post-polio syndrome.',
	},
	change: {
		q: 'What is a meaningful change in DSQ-PEM results?',
		a: 'No minimal important change has been published. The symptom questions cover the past six months, so results a month apart overlap heavily. A change in whether PEM is indicated, or in how long the worsening lasts, says more than a small shift on a single symptom.',
	},
	diagnosis: {
		q: 'Does a positive DSQ-PEM result mean I have ME/CFS?',
		a: 'No. It means the pattern you reported is consistent with PEM. The 2018 study compared ME/CFS only with multiple sclerosis and post-polio syndrome, and relied on people reporting their own diagnosis. A diagnosis needs a clinician, who will also look for other causes.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'scoring', 'recovery', 'change', 'diagnosis'] as const;
