// REVIEW: interpretation copy for the DSQ-2, drafted for Craig's review.
// Single source for the visible section and the FAQPage JSON-LD.
//
// Sources, checked against the documents:
// - Jason LA, Sunnquist M. Front Pediatr 2018;6:330 and its Supplementary
//   Data Sheet 2: DePaul's case-definition scoring rules and SPSS syntax.
// - Bedree H, Sunnquist M, Jason LA. Fatigue 2019;7(3):166-79: the 2/2
//   threshold, per-item composite, and the eight-factor structure (Table 5).
// - DSQ-2 REDCap data dictionary (item wording and codes); DePaul measures
//   page: "All instruments are free to use."
// - RAND 36-Item Health Survey scoring, as directed by Data Sheet 2.
// - NICE NG206 (2021): suspect after 6 weeks, diagnose after 3 months, four
//   core symptoms.
// No cut-offs, norms or minimal important change exist for DSQ-2 domain scores.

export const SOURCES = {
	jason2018: { label: 'Jason and Sunnquist 2018', href: 'https://doi.org/10.3389/fped.2018.00330' },
	bedree2019: { label: 'Bedree et al. 2019', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7367506/' },
	rand: { label: 'RAND 36-Item Health Survey scoring', href: 'https://www.rand.org/health-care/surveys_tools/mos/36-item-short-form/scoring.html' },
	nice: { label: 'NICE NG206', href: 'https://www.nice.org.uk/guidance/ng206' },
};

/** Short summary of each definition's requirements, per Data Sheet 2. */
export const DEFINITIONS = [
	{ name: 'IOM / NAM (2015)', needs: 'Reduced functioning, fatigue for 6 months or more, post-exertional malaise, unrefreshing sleep, and cognitive problems or orthostatic intolerance' },
	{ name: 'Canadian Consensus (2003)', needs: 'As IOM, plus frequent fatigue, sleep problems, pain, two neurological or cognitive symptoms, and symptoms in two of the autonomic, neuroendocrine and immune areas' },
	{ name: 'ME International Consensus (2011)', needs: 'A 50% drop in activity, post-exertional exhaustion, and symptoms across neurological, immune or gut, and energy groups' },
	{ name: 'Fukuda (1994)', needs: 'Reduced functioning, fatigue for 6 months or more, and at least 4 of 8 symptoms, counted at a lower threshold' },
];

export const FAQ = {
	measures: {
		q: 'What is the DePaul Symptom Questionnaire (DSQ-2)?',
		a: 'The DSQ-2 is a symptom questionnaire for ME/CFS developed at DePaul University by Leonard Jason and colleagues. It asks how often and how severely you have had each of 79 symptoms over the past six months, plus questions about how your illness began and how much it limits you. Its main use is checking reported symptoms against published ME/CFS case definitions. It is free to use.',
	},
	scoring: {
		q: 'How are the DSQ-2 case definitions scored?',
		a: 'A symptom counts when it happens at least half the time and is at least moderate, a frequency and severity of 2 or more out of 4; for Fukuda, minor symptoms count at 1 or more. Each definition then needs its own combination of symptoms, illness length and loss of function, following DePaul\'s published scoring rules.',
	},
	change: {
		q: 'What is a meaningful change in DSQ-2 results?',
		a: 'No minimal important change or cut-offs have been published for DSQ-2 scores. The questions cover the past six months, so results a month apart overlap heavily; look at the trend over several months. A change in which definitions you meet says more than small shifts in domain scores.',
	},
	diagnosis: {
		q: 'Does meeting a case definition on the DSQ-2 mean I have ME/CFS?',
		a: 'No. Meeting a case definition on a self-report questionnaire is not a clinical diagnosis, which needs a clinician, an examination and tests to rule out other conditions with similar symptoms. Not meeting a definition here does not rule ME/CFS out either.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'scoring', 'change', 'diagnosis'] as const;
