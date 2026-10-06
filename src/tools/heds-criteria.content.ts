// REVIEW: interpretation copy for the hEDS 2017 criteria checklist, drafted
// for Craig's review. Single source for the visible section and the FAQPage
// JSON-LD.
//
// Every figure and rule used, and where it comes from (all opened and read):
// - Malfait F et al. The 2017 international classification of the
//   Ehlers-Danlos syndromes. Am J Med Genet C 2017;175(1):8-26, full-text PDF,
//   hEDS section:
//   - diagnosis needs criteria 1 AND 2 AND 3; molecular basis unknown, so the
//     diagnosis is clinical; criteria meant to reduce heterogeneity and help
//     find the genetic cause; revisions expected.
//   - Criterion 1: Beighton 6 or more (pre-pubertal children and
//     adolescents), 5 or more (pubertal men and women up to 50), 4 or more
//     (over 50); 5PQ with 2 or more positive answers if 1 point below.
//   - Criterion 2: two or more of Features A, B, C. Feature A: five of 12
//     signs. Feature B: first-degree relative independently meeting the
//     criteria. Feature C: at least one of limb pain daily for 3 months or
//     more, widespread pain for 3 months or more, recurrent atraumatic
//     dislocations or instability.
//   - Criterion 3: no unusual skin fragility; exclusion of other heritable and
//     acquired connective tissue disorders (with an acquired one, A and B are
//     both needed and C cannot count); exclusion of alternative diagnoses,
//     "based upon history, physical examination, and/or molecular genetic
//     testing, as indicated".
//   - General comment: sleep disturbance, fatigue, postural orthostatic
//     tachycardia, functional gastrointestinal disorders, dysautonomia,
//     anxiety and depression are described in hEDS but are not specific or
//     sensitive enough to be criteria; they may prompt consideration of hEDS.
// - The Ehlers-Danlos Society hEDS diagnostic checklist (v9 PDF): same
//   criteria, written "for doctors across all disciplines".
// - Castori M et al. Am J Med Genet C 2017;175(1):148-157 (abstract):
//   hypermobility spectrum disorders proposed for symptomatic joint
//   hypermobility not matching another syndrome.
// - The Ehlers-Danlos Society, "What is HSD?" page: "At present, the
//   principles and types of management are the same for both HSD and hEDS";
//   no definitive test separates them.
// - The Ehlers-Danlos Society news item dated 11/03/2026 (read as 11 March 2026): new criteria for all EDS
//   types and HSD to be published on 1 December 2026 in the American Journal
//   of Medical Genetics; care pathways to follow in March 2027.
// Removed from the old FAQ because it could not be verified: "symptom burden
// ... [is] similar" for HSD and hEDS.

export const SOURCES = {
	malfait: { label: 'Malfait et al. 2017', href: 'https://doi.org/10.1002/ajmg.c.31552' },
	checklist: { label: 'Ehlers-Danlos Society checklist', href: 'https://www.ehlers-danlos.com/heds-diagnostic-checklist/' },
	castori: { label: 'Castori et al. 2017', href: 'https://doi.org/10.1002/ajmg.c.31539' },
	hsd: { label: 'Ehlers-Danlos Society: what is HSD?', href: 'https://www.ehlers-danlos.com/what-is-hsd/' },
	criteria2026: { label: 'Ehlers-Danlos Society news, 2026', href: 'https://www.ehlers-danlos.com/new-global-diagnostic-criteria-2026/' },
};

export const FAQ = {
	criteria: {
		q: 'What are the 2017 hEDS diagnostic criteria?',
		a: 'The 2017 international criteria for hypermobile Ehlers-Danlos syndrome need all three of: Criterion 1, generalised joint hypermobility on the Beighton score (6 or more for pre-pubertal children and adolescents, 5 or more from puberty to age 50, 4 or more over 50, with the five-part questionnaire used when the score is one point short); Criterion 2, two or more of Feature A (at least five of 12 signs of a wider connective tissue disorder), Feature B (a first-degree relative who meets the criteria) and Feature C (chronic limb or widespread pain, or recurrent dislocations or instability without injury); and Criterion 3, no unusual skin fragility and the exclusion of other connective tissue disorders and other causes of hypermobility.',
	},
	self: {
		q: 'Can I diagnose hEDS myself with this checklist?',
		a: 'No. Several Feature A signs, such as atrophic scarring, mitral valve prolapse and aortic root dilatation, need examination or an echocardiogram, and Criterion 3 needs a clinician to rule out other conditions, sometimes with genetic testing. There is no genetic test for hEDS itself, so a doctor makes the diagnosis clinically. This checklist helps you have an informed conversation.',
	},
	hsd: {
		q: 'What if I have hypermobility but do not meet the hEDS criteria?',
		a: 'The 2017 framework uses the term hypermobility spectrum disorder (HSD) for symptomatic joint hypermobility that does not meet the criteria for hEDS or another syndrome. The Ehlers-Danlos Society says the principles and types of management are currently the same for HSD and hEDS. The hEDS criteria were made strict on purpose, to define a more uniform group and help research into its cause.',
	},
	pots: {
		q: 'Are POTS and fatigue part of the hEDS criteria?',
		a: 'No. The 2017 paper lists fatigue, sleep problems, postural orthostatic tachycardia, dysautonomia, functional gut disorders, anxiety and depression as features described in hEDS that are not specific or sensitive enough to be criteria. They may be more disabling than the joint symptoms, and their presence may prompt a clinician to consider hEDS, but they cannot count towards it.',
	},
} as const;

export const FAQ_ORDER = ['criteria', 'self', 'hsd', 'pots'] as const;
