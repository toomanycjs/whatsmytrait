// REVIEW: interpretation copy for the Beighton score, drafted for Craig's
// review. Single source for the visible section and the FAQPage JSON-LD.
//
// Every figure used, and where it comes from (all opened and read):
// - Beighton P, Solomon L, Soskolne CL. Articular mobility in an African
//   population. Ann Rheum Dis 1973;32(5):413-418 (bibliographic record only;
//   the PMC scan could not be read as text). Cited for the origin of the
//   score; no numbers are taken from it.
// - Malfait F et al. The 2017 international classification of the
//   Ehlers-Danlos syndromes. Am J Med Genet C 2017;175(1):8-26, read from the
//   full-text PDF:
//   - Figure 2 caption: the five manoeuvres (little finger beyond 90 degrees,
//     thumb to forearm, elbow beyond 10 degrees, knee beyond 10 degrees, palms
//     flat on the floor with knees straight), each side scored separately,
//     total 9; "Each joint is measured using a goniometer".
//   - hEDS Criterion 1: original cut-off 5 of 9; joint range falls with age;
//     proposed cut-offs 6 or more for pre-pubertal children and adolescents,
//     5 or more for pubertal men and women up to age 50, 4 or more over 50;
//     if the score is 1 point below the cut-off and the five-part
//     questionnaire is positive (2 or more), GJH can be recorded.
//   - "the use of the Beighton scoring system is meant to be a diagnostic
//     screening method"; sex, age, ethnicity, strength training, stretching
//     and warming up affect joint hypermobility; injury and surgery can cause
//     hypermobility or hypomobility; a manoeuvre that cannot be done now
//     should be scored negative without current ability or historical
//     demonstration; other joints (shoulder, hip, wrist and so on) cannot yet
//     be factored into the diagnosis.
// - Juul-Kristensen B et al. Measurement properties of clinical assessment
//   methods for classifying generalized joint hypermobility: a systematic
//   review. Am J Med Genet C 2017;175(1):116-147 (abstract): all included
//   studies rated fair or poor on COSMIN; Beighton reliability evidence
//   "limited positive to conflicting"; recommendation for adults is a cut-point
//   of 5 of 9 including historical information, and at least 6 of 9 in
//   children.
// No minimal important change exists for the Beighton score.

export const SOURCES = {
	beighton: { label: 'Beighton et al. 1973', href: 'https://doi.org/10.1136/ard.32.5.413' },
	malfait: { label: 'Malfait et al. 2017', href: 'https://doi.org/10.1002/ajmg.c.31552' },
	juul: { label: 'Juul-Kristensen et al. 2017', href: 'https://doi.org/10.1002/ajmg.c.31540' },
};

/** Malfait et al. 2017, hEDS Criterion 1. */
export const CUTOFFS = [
	{ group: 'Pre-pubertal children and adolescents', cutoff: '6 or more' },
	{ group: 'Pubertal men and women up to age 50', cutoff: '5 or more' },
	{ group: 'Men and women over 50', cutoff: '4 or more' },
] as const;

export const FAQ = {
	measures: {
		q: 'What is a Beighton score?',
		a: 'The Beighton score is a nine-point check for generalised joint hypermobility, described by Beighton and colleagues in 1973. It scores five manoeuvres: bending the little finger back beyond 90 degrees, bringing the thumb to touch the forearm, straightening the elbow more than 10 degrees beyond straight and doing the same at the knee (one point per side for each of these four), and placing both palms flat on the floor with the knees straight (one point). It is a screening measure, not a diagnosis of any condition.',
	},
	cutoff: {
		q: 'What Beighton score indicates hypermobility?',
		a: 'The cut-off depends on age, because joints stiffen over time. The 2017 international criteria for hypermobile EDS use 6 or more for pre-pubertal children and adolescents, 5 or more for pubertal men and women up to age 50, and 4 or more over 50. Meeting the cut-off suggests generalised joint hypermobility. It does not by itself diagnose hypermobile EDS or a hypermobility spectrum disorder.',
	},
	self: {
		q: 'Can I measure my own Beighton score?',
		a: 'You can get a reasonable idea, but the Beighton score is meant as a clinical screening test, with each joint measured using a goniometer. A 2017 review rated the evidence on its reliability as limited to conflicting even when clinicians do it. The elbow and knee angles are especially hard to judge by eye, so treat a self-score as something to confirm with a clinician.',
	},
	change: {
		q: 'Can my Beighton score change?',
		a: 'Yes. It is not designed to track change, and no minimal important change has been published. Joint range falls with age, and injury, surgery, stretching, strength training and warming up can all move it, so a different score on another day is more likely to reflect those than a change in any underlying condition. Joints that used to bend further can still count through the five-part questionnaire when your score is one point below the cut-off.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'cutoff', 'self', 'change'] as const;
