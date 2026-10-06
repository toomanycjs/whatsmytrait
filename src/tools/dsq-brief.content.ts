// REVIEW: interpretation copy for the DSQ-Brief, drafted for Craig's review.
// Single source for the visible section and the FAQPage JSON-LD.
//
// Sources:
// - Jason LA, Benner S, Furst J, Cathey P. Developing and validating a brief
//   screening scale for ME/CFS. Fatigue: Biomed Health Behav
//   2023;11(2-4):176-187 (volume and pages from Crossref). The full text is
//   paywalled and was NOT read. Checked against the abstract (via Semantic
//   Scholar): 4 items chosen to identify those positive for the IOM ME/CFS case
//   definition; over 2,000 people with ME/CFS and over 350 controls; also MS,
//   post-polio syndrome (PPS) and long COVID groups; random forest analyses;
//   accuracy lower against other illnesses; better accuracy by giving the
//   DSQ-SF or DSQ-1 afterwards.
// - ME Research UK research summary of the paper (secondary source, read in
//   full): 3,427 participants (2,313 ME/CFS, 299 long COVID, 268 MS, 192 PPS,
//   355 healthy controls); ACCURACY below, for ME/CFS vs healthy controls and
//   ME/CFS vs the other illnesses combined.
// - DSQ-Brief form, DePaul (leonardjason.com, DSQ-Brief.docx): the four item
//   wordings, 0-4 frequency and severity scales, past six months.
// - The 2/2 rule for counting a symptom is DePaul's standard: Cotler et al.
//   2018, Appendix B (doi:10.3390/diagnostics8030066). Requiring all four is
//   this site's rule; no published cut-off exists.
// - NICE NG206 (2021), box 2 and recommendations 1.2.2 and 1.4.1: four symptoms
//   needed to suspect ME/CFS (fatigue worsened by activity, PEM, unrefreshing
//   sleep, cognitive difficulties including short-term memory problems),
//   persisting 6 weeks in adults to suspect, 3 months to diagnose.
// No minimal important change has been published for the DSQ-Brief.

export const SOURCES = {
	jason2023: { label: 'Jason et al. 2023', href: 'https://doi.org/10.1080/21641846.2023.2252613' },
	meResearch: { label: 'ME Research UK summary', href: 'https://www.meresearch.org.uk/can-a-brief-screening-scale-accurately-detect-me-cfs/' },
	form: { label: 'DSQ-Brief form (DePaul)', href: 'https://www.leonardjason.com/wp-content/uploads/2023/09/DSQ-Brief.docx' },
	cotler2018: { label: 'Cotler et al. 2018', href: 'https://doi.org/10.3390/diagnostics8030066' },
	nice: { label: 'NICE NG206', href: 'https://www.nice.org.uk/guidance/ng206' },
};

/** Accuracy in the validation study, as reported in the ME Research UK summary of Jason et al. 2023. */
export const ACCURACY = [
	{ version: 'DSQ-Brief (4 items)', controls: '96 / 94 / 98', illness: '84 / 85 / 81' },
	{ version: 'DSQ-SF (14 items)', controls: '98 / 97 / 99', illness: '93 / 93 / 94' },
	{ version: 'DSQ-1 (54 items)', controls: '99 / 98 / 99', illness: '94 / 95 / 94' },
];

export const FAQ = {
	measures: {
		q: 'What is the DSQ-Brief?',
		a: 'The DSQ-Brief is a 4-question screen for ME/CFS from DePaul University, published by Jason, Benner, Furst and Cathey in 2023. It asks how often and how severely you have had fatigue, physical tiredness after minimal exercise, unrefreshing sleep and problems remembering things over the past six months. The four questions were chosen to pick out people who meet the Institute of Medicine (IOM) case definition for ME/CFS.',
	},
	accuracy: {
		q: 'How accurate is the DSQ-Brief?',
		a: 'In the validation study of 3,427 people, the DSQ-Brief told people with ME/CFS apart from healthy controls with 96% accuracy (94% sensitivity, 98% specificity). Against a group with long COVID, multiple sclerosis or post-polio syndrome, accuracy fell to 84% (85% sensitivity, 81% specificity). The authors suggest following it with a longer DePaul questionnaire.',
	},
	scoring: {
		q: 'How is the DSQ-Brief scored on this site?',
		a: 'Each symptom is rated for frequency and severity from 0 to 4. As in DePaul\'s other questionnaires, a symptom counts when both are 2 or more: at least half the time and at least moderate. The paper tested the four questions with a statistical model rather than a simple cut-off, so the rule for a positive screen here is this site\'s own: all four symptoms must count.',
	},
	change: {
		q: 'What is a meaningful change in DSQ-Brief results?',
		a: 'No minimal important change has been published. The questions cover the past six months, so repeat it every few months rather than weekly, and watch whether the number of symptoms at the threshold changes rather than small shifts in the 0 to 100 item scores.',
	},
	diagnosis: {
		q: 'Does a positive DSQ-Brief screen mean I have ME/CFS?',
		a: 'No. A positive screen means your answers match the four symptoms the screen looks for. It is less accurate at telling ME/CFS apart from other illnesses that cause fatigue, and a diagnosis needs a clinician to assess you and rule out other causes. A negative screen does not rule ME/CFS out either.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'accuracy', 'scoring', 'change', 'diagnosis'] as const;
