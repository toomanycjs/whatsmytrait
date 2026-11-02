// "Related questionnaires" and "Further reading" for each tool page, shown
// below the "Understanding your score" section by RelatedTools.astro. One
// place for every group so the links stay consistent. Link names come from the
// tool catalogue and the post titles, so only the hrefs and one-line notes live
// here; the component fails the build if an href has no page behind it.

export interface RelatedLink {
	href: string;
	/** One line on why this one is worth a look from this page. */
	note: string;
}

export interface RelatedEntry {
	questionnaires: RelatedLink[];
	reading: string[];
}

// One-line notes for each linked questionnaire, used unless a page overrides it.
const Q = {
	dsqBrief: { href: '/tools/dsq-brief/', note: 'A four-question ME/CFS screen, in under two minutes.' },
	dsq2: { href: '/tools/dsq-2/', note: 'The full symptom questionnaire, checked against four ME/CFS case definitions.' },
	dsqPem: { href: '/tools/dsq-pem/', note: 'Whether symptoms worsen after effort, and how long recovery takes.' },
	funcap: { href: '/tools/funcap/', note: 'What each everyday activity costs you, across eight domains.' },
	bell: { href: '/tools/bell-scale/', note: 'A one-minute overall rating of function, from 0 to 100, for regular tracking.' },
	pcfs: { href: '/tools/pcfs/', note: 'The standard long COVID functional grading, from 0 to 4.' },
	chalder: { href: '/tools/chalder-fatigue-scale/', note: 'Physical and mental fatigue, scored separately.' },
	fss: { href: '/tools/fss/', note: 'Nine questions on how fatigue affects daily life.' },
	compass: { href: '/tools/compass-31/', note: 'Autonomic symptoms across six domains, scored 0 to 100.' },
	voss: { href: '/tools/vanderbilt-orthostatic-symptom-score/', note: 'Nine symptoms rated while upright; pairs with a stand test.' },
	maps: { href: '/tools/malmo-pots-score/', note: 'Twelve POTS symptoms from the past week, suited to weekly tracking.' },
	ogs: { href: '/tools/orthostatic-grading-scale/', note: 'How often and how badly standing affects you, scored 0 to 20.' },
	lean: { href: '/tools/nasa-lean-test/', note: 'A guided ten-minute stand test at home, with a heart rate log.' },
	nijmegen: { href: '/tools/nijmegen/', note: 'Sixteen symptoms that screen for breathing pattern disorder.' },
	sebq: { href: '/tools/self-evaluation-of-breathing-questionnaire/', note: 'How your breathing itself feels, including restricted or effortful breathing.' },
	beighton: { href: '/tools/beighton-score/', note: 'The nine-point joint hypermobility check.' },
	fivePq: { href: '/tools/five-part-questionnaire/', note: 'Five yes or no questions, including hypermobility you used to have.' },
	heds: { href: '/tools/heds-criteria/', note: 'The 2017 hypermobile EDS criteria, step by step.' },
	cfq: { href: '/tools/cognitive-failures-questionnaire/', note: 'Everyday memory, attention and action slips: the brain fog questionnaire.' },
} satisfies Record<string, RelatedLink>;

const note = (link: RelatedLink, text: string): RelatedLink => ({ ...link, note: text });

// POTS and hypermobility often turn up together.
const compassFromHypermobility = note(Q.compass, 'Autonomic symptoms: POTS and hypermobility often overlap.');
// If breathlessness is worse upright, the cause may be autonomic rather than a breathing pattern.
const leanFromBreathing = note(Q.lean, 'If breathlessness is worse when upright, a stand test checks for a heart rate rise.');

const POTS_READING = [
	'/testing/do-i-have-pots/',
	'/evidence/30-bpm-threshold-pots/',
	'/evidence/salt-in-pots/',
	'/evidence/salt-water-compression-electrolytes/',
];
const BREATHING_READING = [
	'/evidence/breathing-pattern-disorder-vs-autonomic-breathlessness/',
	'/testing/diaphragmatic-breathing/',
];
const MECFS_READING = [
	'/evidence/post-exertional-malaise/',
	'/tools/pacing-and-heart-rate/',
];

/** Keyed by tool page path. */
export const RELATED: Record<string, RelatedEntry> = {
	// ME/CFS and PEM
	'/tools/dsq-brief/': { questionnaires: [note(Q.dsq2, 'The full version: 79 symptom questions, checked against four ME/CFS case definitions.'), Q.dsqPem, Q.funcap], reading: MECFS_READING },
	'/tools/dsq-2/': { questionnaires: [Q.dsqPem, Q.funcap, Q.bell], reading: MECFS_READING },
	'/tools/dsq-pem/': { questionnaires: [Q.dsq2, Q.funcap, Q.bell], reading: MECFS_READING },
	'/tools/funcap/': { questionnaires: [Q.dsqPem, Q.bell, Q.pcfs], reading: MECFS_READING },
	'/tools/bell-scale/': { questionnaires: [Q.funcap, Q.pcfs, Q.dsqPem], reading: MECFS_READING },
	'/tools/pcfs/': { questionnaires: [Q.bell, Q.funcap, Q.dsqPem], reading: MECFS_READING },
	'/tools/chalder-fatigue-scale/': {
		questionnaires: [Q.fss, Q.dsqPem, note(Q.cfq, 'If the mental fatigue questions scored high, this measures the everyday slips of brain fog.')],
		reading: MECFS_READING,
	},
	'/tools/fss/': { questionnaires: [Q.chalder, Q.dsqPem, Q.dsqBrief], reading: MECFS_READING },

	// POTS and dysautonomia
	'/tools/compass-31/': { questionnaires: [Q.lean, Q.maps, Q.voss, note(Q.beighton, 'Joint hypermobility: POTS and hypermobility often overlap.')], reading: POTS_READING },
	'/tools/vanderbilt-orthostatic-symptom-score/': { questionnaires: [Q.lean, Q.maps, Q.ogs], reading: POTS_READING },
	'/tools/malmo-pots-score/': { questionnaires: [Q.compass, Q.voss, Q.lean], reading: POTS_READING },
	'/tools/orthostatic-grading-scale/': { questionnaires: [Q.voss, Q.maps, Q.lean], reading: POTS_READING },
	'/tools/nasa-lean-test/': { questionnaires: [note(Q.voss, 'Rate your symptoms while upright, alongside the heart rate readings.'), Q.compass, Q.maps], reading: POTS_READING },

	// Breathing
	'/tools/nijmegen/': { questionnaires: [Q.sebq, leanFromBreathing], reading: BREATHING_READING },
	'/tools/self-evaluation-of-breathing-questionnaire/': { questionnaires: [Q.nijmegen, leanFromBreathing], reading: BREATHING_READING },

	// Hypermobility
	'/tools/beighton-score/': { questionnaires: [Q.fivePq, Q.heds, compassFromHypermobility], reading: [] },
	'/tools/five-part-questionnaire/': { questionnaires: [Q.beighton, Q.heds, compassFromHypermobility], reading: [] },
	'/tools/heds-criteria/': { questionnaires: [Q.beighton, Q.fivePq, compassFromHypermobility], reading: [] },

	// Brain fog
	'/tools/cognitive-failures-questionnaire/': {
		questionnaires: [note(Q.chalder, 'Includes a mental fatigue subscale, which often runs alongside brain fog.'), note(Q.dsqPem, 'Asks whether mental effort, not just physical, makes you worse.')],
		reading: [],
	},
};
