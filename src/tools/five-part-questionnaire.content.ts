// REVIEW: interpretation copy for the five-part questionnaire (5PQ), drafted
// for Craig's review. Single source for the visible section and the FAQPage
// JSON-LD.
//
// Every figure used, and where it comes from (all opened and read):
// - Hakim AJ, Grahame R. A simple questionnaire to detect hypermobility: an
//   adjunct to the assessment of patients with diffuse musculoskeletal pain.
//   Int J Clin Pract 2003;57(3):163-166 (abstract; full text paywalled):
//   212 consecutive hypermobile women attending hypermobility clinics at two
//   London teaching hospitals, and 57 healthy volunteers; two or more "yes"
//   answers gave the best combined sensitivity and specificity; sensitivity
//   84% and specificity 89% in the first cohort; 84% and 80% in a second
//   cohort of 170 hypermobile patients and 50 controls. (The abstract also says
//   "Overall the questionnaire correctly identified 84% of all cases and
//   controls"; the copy reports sensitivity and specificity separately.)
// - Glans M et al. BMC Musculoskelet Disord 2020;21:174 (PMC7079417): 284
//   Swedish adults analysed for validity; against an age-dependent Beighton
//   cut-off, sensitivity 91%, specificity 75% (Results, Table 3); against a
//   cut-off of 4 of 9, sensitivity 72%, specificity 78%; test-retest ICC 0.92
//   for the total in 31 students.
// - Schlager A et al. BMC Musculoskelet Disord 2020;21:514 (PMC7397653): 301
//   women in early pregnancy; against Beighton 5 or more, sensitivity 84.1%,
//   specificity 61.9% (abstract, Results); strength is ruling out.
// - Malfait F et al. Am J Med Genet C 2017;175(1):8-26 (full text): hEDS
//   Criterion 1 Beighton cut-offs (6 or more pre-pubertal children and
//   adolescents, 5 or more pubertal men and women up to 50, 4 or more over 50);
//   if the Beighton score is 1 point below the cut-off and the 5PQ is positive
//   (2 or more), GJH can be recorded; the 5PQ "has not been validated in
//   children".
// Removed from the old page because they could not be verified from a source
// opened here: "roughly one in five UK adults screen positive in postal
// surveys" and "later general-population studies found lower specificity
// (61-77%)" (replaced by the two studies above).
// No minimal important change exists for the 5PQ.

export const SOURCES = {
	hakim: { label: 'Hakim and Grahame 2003', href: 'https://pubmed.ncbi.nlm.nih.gov/12723715/' },
	glans: { label: 'Glans et al. 2020', href: 'https://doi.org/10.1186/s12891-020-3067-1' },
	schlager: { label: 'Schlager et al. 2020', href: 'https://doi.org/10.1186/s12891-020-03524-7' },
	malfait: { label: 'Malfait et al. 2017', href: 'https://doi.org/10.1002/ajmg.c.31552' },
};

/** Accuracy of two or more "yes" answers in published studies. */
export const ACCURACY = [
	{ study: 'hakim', group: 'Hypermobile women at London clinics (212) and healthy volunteers (57)', sensitivity: '84%', specificity: '89%' },
	{ study: 'hakim', group: 'Second clinic group: 170 patients and 50 controls', sensitivity: '84%', specificity: '80%' },
	{ study: 'glans', group: 'Swedish adults outside clinics (284)', sensitivity: '91%', specificity: '75%' },
	{ study: 'schlager', group: 'Swedish women in early pregnancy (301)', sensitivity: '84%', specificity: '62%' },
] as const;

export const FAQ = {
	measures: {
		q: 'What is the five-part questionnaire for hypermobility?',
		a: 'The five-part questionnaire (5PQ) is a five-question yes/no screen for generalised joint hypermobility, published by Hakim and Grahame in 2003. Two or more "yes" answers is a positive screen. Two questions ask what you can do now or could ever do, and two ask about childhood, so it can pick up hypermobility that has faded with age or injury.',
	},
	accuracy: {
		q: 'How accurate is the five-part questionnaire?',
		a: 'In the original study, two or more "yes" answers picked up 84% of hypermobile women attending London clinics (sensitivity) and correctly gave a negative result to 89% of healthy volunteers (specificity); a second clinic group gave 84% and 80%. Outside clinics it gives more false positives: specificity was 75% in Swedish adults and 62% in pregnant women, while sensitivity stayed at 84% or more.',
	},
	heds: {
		q: 'How is the 5PQ used in the hEDS diagnostic criteria?',
		a: 'Under the 2017 criteria for hypermobile Ehlers-Danlos syndrome, the 5PQ only counts when your Beighton score is exactly one point below the Beighton cut-off for your group (6 or more for pre-pubertal children and adolescents, 5 or more from puberty to age 50, 4 or more over 50). In that case two or more "yes" answers allow generalised joint hypermobility to be recorded. It does not replace the Beighton score when the score is further below.',
	},
	diagnosis: {
		q: 'Is a positive 5PQ a diagnosis of hypermobility or EDS?',
		a: 'No. It is a screening questionnaire. A positive result means generalised joint hypermobility is likely enough to be worth checking with the Beighton score and a clinical examination. On its own it says nothing about hypermobile EDS or a hypermobility spectrum disorder, which need further criteria and the exclusion of other conditions.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'accuracy', 'heds', 'diagnosis'] as const;
