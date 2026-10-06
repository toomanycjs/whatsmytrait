// REVIEW: interpretation copy for the Nijmegen Questionnaire, drafted for Craig's review.
// Single source for the visible "Understanding your Nijmegen score" section and
// the page's FAQPage JSON-LD: every FAQ answer is rendered word for word.
//
// Figures, each checked against the source named:
// - van Dixhoorn & Duivenvoorden 1985, J Psychosom Res 29(2):199-206 (PubMed
//   abstract, PMID 4009520): 75 patients with a clinical diagnosis of HVS vs 80
//   people employed in health care; three dimensions (shortness of breath,
//   peripheral tetany, central tetany); sensitivity 91%, specificity 95%
//   against the clinical diagnosis. The abstract gives no sum-score cut-off.
// - van Dixhoorn & Folgering 2015, ERJ Open Res 1:00001-2015 (full text,
//   PMC5005127), section "Elevated Nijmegen Questionnaire score is not
//   diagnostic of a specific syndrome":
//     * first validation study (van Doorn et al. 1983, 263 patients; those
//       whose main complaints came on with voluntary hyperventilation vs those
//       whose did not): optimal cut-off "a sum score of >22", i.e. 23 or above
//     * second study (the 1985 paper, hyperventilators vs normal controls):
//       ">17 (90.6%), >18 (94%) and >19 (92.6%)" correctly classified, so
//       "a score of >=19 best differentiates hyperventilatory patients from
//       normal subjects"
//     * Figure 1 / text: control means 19.5 (SD 10.5) for patients in the
//       first study, 11.9 (SD 5.5) for normal subjects in the second
//     * normal values in English, Belgian and Dutch subjects "range from
//       10-12 +/- 7"
//     * after effective breathing regulation scores normalise to around 12;
//       scores that stay elevated deserve further attention
//     * the authors prefer to call the score a measure of "functional
//       respiratory complaints"; the questionnaire is not copyrighted
// - Thomas, Bruton & Ainsworth 2015, ERJ Open Res 1:00033-2015 (PMC5005143):
//   breathing training helped people with asthma with low as well as high
//   scores; they call for a minimum important difference to be established
//   (none published).
// - Bondarenko et al. 2026, ERJ Open Res 00092-2026 (full text, PMC13501441),
//   "Nijmegen questionnaire" section and Table 2: 16 items scored 0-4,
//   total 0-64; cut-offs applied range from >=19 to >=23, "the latter is
//   commonly accepted"; inadequate as a standalone diagnostic tool; does not
//   assess breathing mechanics.
// The config band boundary (0-22 / 23-64) follows the ">22" wording above.

export const SOURCES = {
	vanDixhoorn1985: { label: 'van Dixhoorn and Duivenvoorden 1985', href: 'https://doi.org/10.1016/0022-3999(85)90042-x' },
	vanDixhoorn2015: { label: 'van Dixhoorn and Folgering 2015', href: 'https://doi.org/10.1183/23120541.00001-2015' },
	thomas2015: { label: 'Thomas et al. 2015', href: 'https://doi.org/10.1183/23120541.00033-2015' },
	bondarenko2026: { label: 'Bondarenko et al. 2026', href: 'https://doi.org/10.1183/23120541.00092-2026' },
};

/** Reference points, all from van Dixhoorn and Folgering 2015 unless noted. */
export const REFERENCE = [
	{ score: '10 to 12', finding: 'Usual average without breathing complaints (English, Belgian and Dutch studies)' },
	{ score: '11.9', finding: 'Healthy controls, 1985 validation data' },
	{ score: '19 or above', finding: 'Best separated people with hyperventilation complaints from healthy people (1985 data)' },
	{ score: '19.5', finding: 'Patients without hyperventilation complaints, first validation study' },
	{ score: '23 or above', finding: 'Most-used cut-off: best separated patients with and without these complaints in the first study' },
];

export const FAQ = {
	measures: {
		q: 'What does the Nijmegen questionnaire measure?',
		a: 'It measures how often you have 16 symptoms linked with over-breathing and stress, such as shortness of breath, dizziness, tingling fingers, a tight chest and anxiety. Each is scored from 0 (never) to 4 (very often), giving a total from 0 to 64. Its authors now describe the score as a measure of "functional respiratory complaints" rather than of hyperventilation itself.',
	},
	normal: {
		q: 'What is a normal Nijmegen score?',
		a: 'People without breathing complaints usually average about 10 to 12. The cut-off most often used is more than 22, that is 23 or above: in the first validation study it best separated patients whose complaints were brought on by deliberate over-breathing from other patients. When the authors re-analysed their second study, 19 or above best separated people with these complaints from healthy people, so published cut-offs range from 19 to 23.',
	},
	score23: {
		q: 'What does a Nijmegen score of 23 or more mean?',
		a: 'It means you report more of these symptoms, more often, than is usual. It is a reasonable basis for asking to have your breathing pattern assessed, usually by a respiratory physiotherapist. It is not a diagnosis: the score cannot tell breathing pattern disorder apart from anxiety, asthma or other causes, and a 2026 review judged it inadequate as a stand-alone diagnostic test.',
	},
	change: {
		q: 'What is a meaningful change in Nijmegen score?',
		a: 'No minimal important change has been published. The authors report that after successful breathing therapy, average scores fell back to around 12, and that scores which stay high after treatment deserve a closer look for other causes. Compare results taken a few weeks apart in similar circumstances, and look for a trend rather than a single result.',
	},
	diagnosis: {
		q: 'Does the Nijmegen questionnaire diagnose breathing pattern disorder?',
		a: 'No. It records symptoms, not how you breathe. It does not measure breathing mechanics such as upper-chest breathing, or carbon dioxide levels, and several of its symptoms, such as dizziness, palpitations and cold hands or feet, are also common in autonomic conditions such as POTS. A diagnosis needs a clinician to look at how you breathe as well as at your symptoms.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'normal', 'score23', 'change', 'diagnosis'] as const;
