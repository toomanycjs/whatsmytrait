// REVIEW: interpretation copy for the Orthostatic Grading Scale (OGS), drafted
// for Craig's review. Single source for the visible "Understanding your OGS
// score" section and the page's FAQPage JSON-LD: every FAQ answer is rendered
// on the page word for word.
//
// Figures and where they come from:
// Schrezenmaier C, et al. Mayo Clin Proc 2005;80(3):330-334 (PubMed 15757013).
// Only the abstract could be read: the full text sits behind a bot check.
// - 5 items about symptoms of orthostatic intolerance due to orthostatic
//   hypotension; 145 patients, 97 (67%) with orthostatic hypotension;
//   coefficient alpha 0.91; items correlated with the CASS subscores, most
//   strongly the adrenergic subscore: Abstract.
// - item scoring 0-4, total 0-20: Słomko 2020 (below) and Peebles 2022
//   Methods 2.3.5, both citing Schrezenmaier.
// Słomko J, et al. J Clin Med 2020;9(8):2531 (PMC7464864), Methods:
// - "Scores of greater or equal to 4 are considered to be consistent with
//   orthostatic intolerance and scores greater or equal to 9 orthostatic
//   hypotension", citing Schrezenmaier 2005. These are the 4 and 9 thresholds
//   used below and in the config bands. Not verified in the primary paper.
// Knoop I, et al. Auton Neurosci 2023, doi:10.1016/j.autneu.2023.103130 (abstract only):
// - 149 patients under investigation for POTS; one-factor structure fitted;
//   correlations with heart rate indices r = 0.211-0.294.
// Reference values (all means):
// - Issa A, et al. J Clin Med 2025;14(17):6269 (PMC12428951), Results text:
//   ME/CFS 8.3 vs healthy controls 0.6 (MCAM study; 301 ME/CFS, 141 controls).
// - Peebles KC, et al. Am J Med Genet A 2022;188(6):1761- (PMC9305471), Table 6:
//   controls 3.1 (SD 2.7, n = 15), G-HSD 6.8 (SD 3.7, n = 15),
//   hEDS 10.4 (SD 2.8, n = 14).
// - McDonald C, et al. BMJ Open 2014;4:e004127 (PMC4067814), Table 1:
//   UK POTS, total group 13 (SD 4), n = 136.
// - Domingo JC, et al. J Transl Med 2024;22:343 (PMC11005215), Table 1:
//   ME/CFS 12.8 (SEM 0.9, n = 31), long COVID 10.6 (SEM 1.0, n = 23),
//   sedentary controls 0.9 (SEM 0.3, n = 31).
// Removed from the old page because they could not be verified: the
// "mild below 4, moderate 4-9, severe above 9" bands attributed to Frith and
// Newton (their 2016 paper says only that OGS scores were grouped into mild,
// moderate and severe; the thresholds are behind a paywall), and "66%
// sensitivity, 69% specificity" for a score of 9.
// No minimal important change has been published.

export const SOURCES = {
	schrezenmaier: { label: 'Schrezenmaier et al. 2005', href: 'https://doi.org/10.4065/80.3.330' },
	slomko: { label: 'Słomko et al. 2020', href: 'https://doi.org/10.3390/jcm9082531' },
	knoop: { label: 'Knoop et al. 2023', href: 'https://doi.org/10.1016/j.autneu.2023.103130' },
	issa: { label: 'Issa et al. 2025', href: 'https://doi.org/10.3390/jcm14176269' },
	peebles: { label: 'Peebles et al. 2022', href: 'https://doi.org/10.1002/ajmg.a.62705' },
	mcdonald: { label: 'McDonald et al. 2014', href: 'https://doi.org/10.1136/bmjopen-2013-004127' },
	domingo: { label: 'Domingo et al. 2024', href: 'https://doi.org/10.1186/s12967-024-05148-0' },
};

/** Average OGS totals in published studies (shown in Layer 2 and the results chart). */
export const REFERENCE = [
	{ group: 'Healthy controls (US)', n: '141', mean: '0.6', source: 'issa' },
	{ group: 'Hypermobility spectrum disorder (Australia)', n: '15', mean: '6.8', source: 'peebles' },
	{ group: 'ME/CFS (US)', n: '301', mean: '8.3', source: 'issa' },
	{ group: 'Hypermobile EDS (Australia)', n: '14', mean: '10.4', source: 'peebles' },
	{ group: 'Long COVID (Spain)', n: '23', mean: '10.6', source: 'domingo' },
	{ group: 'ME/CFS (Spain)', n: '31', mean: '12.8', source: 'domingo' },
	{ group: 'POTS (UK)', n: '136', mean: '13', source: 'mcdonald' },
] as const;

export const FAQ = {
	measures: {
		q: 'What is the Orthostatic Grading Scale?',
		a: 'The Orthostatic Grading Scale (OGS) is a five-question self-report scale from the Mayo Clinic, published in 2005. It asks how often you get symptoms on standing, how severe they are, what brings them on, how much they interfere with daily life and how long you can stand. Each question scores 0 to 4, giving a total from 0 to 20. Higher means more orthostatic symptoms.',
	},
	high: {
		q: 'What is a high Orthostatic Grading Scale score?',
		a: 'Studies using the OGS treat 4 or more as consistent with orthostatic intolerance and 9 or more as consistent with orthostatic hypotension, citing the original Mayo paper. Neither threshold is a diagnosis. For comparison, published averages are 0.6 in healthy controls, 8.3 in ME/CFS and 13 in POTS.',
	},
	pots: {
		q: 'Is the Orthostatic Grading Scale used for POTS?',
		a: 'Yes. It was designed for symptoms of low blood pressure on standing, but a 2023 study of 149 people being investigated for POTS found that its five questions measure a single underlying problem and that scores rose modestly with heart rate on standing. UK POTS patients have averaged 13.',
	},
	change: {
		q: 'What is a meaningful change in OGS score?',
		a: 'No minimal important change has been published. The OGS asks about your usual pattern rather than one day, so it changes slowly. Repeat it monthly or around a treatment change; a shift that holds over several results is more likely to be real than a one-off difference.',
	},
	diagnosis: {
		q: 'Does the Orthostatic Grading Scale diagnose POTS or orthostatic hypotension?',
		a: 'No. It measures the burden of symptoms on standing, whatever the cause. POTS and orthostatic hypotension are diagnosed from heart rate and blood pressure measured lying and then standing or tilted. A high score is a reason to ask for that testing.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'high', 'pots', 'change', 'diagnosis'] as const;
