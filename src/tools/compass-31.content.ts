// REVIEW: interpretation copy for COMPASS-31, drafted for Craig's review.
//
// Single source for the visible "Understanding your COMPASS-31 score" section
// and the page's FAQPage JSON-LD: every FAQ answer is rendered on the page
// word for word, so the schema can never say something the page does not.
//
// Sources, all checked against the papers:
// - Sletten et al. 2012, Mayo Clin Proc: derived from the Autonomic Symptom
//   Profile answers of 405 healthy control subjects; no norms or cut-offs.
// - Treister et al. 2015, Eur J Neurol: 66 people assessed for small fibre
//   polyneuropathy; two-week test-retest rs = 0.886; correlation with
//   autonomic function testing rs = 0.474; cut-off 30 sensitivity 0.741,
//   specificity 0.730; screening cut-off 10 sensitivity 0.926, specificity 0.378.
// - Larsen et al. 2022, Front Neurol: 2,314 adults with long COVID, 66% scored
//   above 20, described as suggestive of moderate to severe autonomic dysfunction.
// - Blitshteyn et al. 2024, J Clin Med: online survey, 160 women with POTS,
//   mean 55.3 (SD 11.8).

export const SOURCES = {
	sletten: { label: 'Sletten et al. 2012', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3541923/' },
	okdahl: { label: 'Okdahl et al. 2021', href: 'https://doi.org/10.1136/bmjopen-2020-038677' },
	treister: { label: 'Treister et al. 2015', href: 'https://doi.org/10.1111/ene.12717' },
	larsen: { label: 'Larsen et al. 2022', href: 'https://doi.org/10.3389/fneur.2022.1012668' },
	blitshteyn: { label: 'Blitshteyn et al. 2024', href: 'https://doi.org/10.3390/jcm13082274' },
};

export const FAQ = {
	measures: {
		q: 'What does the COMPASS-31 measure?',
		a: 'It measures how much you are affected by symptoms of autonomic dysfunction: problems with the nerves that control heart rate, blood pressure, sweating, digestion, the bladder and the pupils. Its 31 questions fall into six domains, which are weighted and added up to a total from 0 to 100. Higher means more symptoms.',
	},
	pots: {
		q: 'Is the COMPASS-31 used for POTS?',
		a: 'Yes. It is widely used in POTS and long COVID research. In an online survey of 160 women with POTS, the average score was 55.3.',
	},
	normal: {
		q: 'What is a normal COMPASS-31 score?',
		a: 'There is no agreed normal range or cut-off. The paper that introduced the COMPASS-31 did not publish a normal range or severity bands.',
	},
	score30: {
		q: 'What does a COMPASS-31 score of 30 mean?',
		a: 'A score of 30 is not a diagnosis. In a study of 66 people being assessed for small fibre neuropathy, 30 best separated those whose skin biopsy confirmed it from those whose did not, sorting about three in four of each group correctly.',
	},
	change: {
		q: 'What is a meaningful change in COMPASS-31 score?',
		a: 'No minimal important change has been published, so there is no agreed number of points that counts as a real change. Scores were very consistent when people filled it in twice, two weeks apart. Most questions ask about the past year, so read changes over months, and look for a change that holds across several results.',
	},
	diagnosis: {
		q: 'Does the COMPASS-31 diagnose dysautonomia?',
		a: 'No. It measures the symptoms you report, not how your nerves actually work. A diagnosis needs a clinician and, for POTS, heart rate and blood pressure measured lying and standing. Specialist tests such as a tilt table measure function directly, and in one study COMPASS-31 scores agreed only moderately with them.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'pots', 'normal', 'score30', 'change', 'diagnosis'] as const;
