// Clinician summary configs for the dysautonomia, breathing and hypermobility tools. See src/tools/clinician-summary.ts for the rules.
import type { SummaryConfig } from '../clinician-summary';

/** VOSS rating context, as stored in the 'context' sub-score (0 rest, 1 short stand, 2 10-minute stand). */
const VOSS_CONTEXT = ['at rest', 'while standing, under 10 minutes', 'at the end of a 10-minute stand or tilt'];

export const SUMMARIES_AUTONOMIC: Record<string, SummaryConfig> = {
	'malmo-pots-score': {
		fullName: 'Malmö POTS Symptom Score',
		abbreviation: 'MAPS',
		about: [
			'12 POTS symptoms rated 0 (none) to 10 (very pronounced) for the past 7 days, giving a total from 0 to 120; higher means a heavier symptom burden.',
			'Developed in Malmö in 62 people with POTS confirmed by head-up tilt and 50 healthy controls (means 78 and 14); POTS following COVID-19 was excluded (Spahic et al. 2023).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			if (r.total === null) return 'Bands: none apart from the cut-off of 42 (Spahic et al. 2023).';
			const side = r.total >= 42 ? 'At or above 42' : 'Below 42';
			return `${side}, the optimal cut-off that separated tilt-confirmed POTS from healthy controls (sensitivity 97%, specificity 98%; Spahic et al. 2023). No severity bands have been published.`;
		},
		citation: 'Spahic JM, Hamrefors V, Johansson M, Ricci F, Melander O, Sutton R, Fedorowski A. Malmö POTS symptom score: assessing symptom burden in postural orthostatic tachycardia syndrome. J Intern Med. 2023;293(1):91–99.',
		doi: '10.1111/joim.13566',
		attribution: 'MAPS © the authors, CC BY-NC 4.0.',
	},

	'vanderbilt-orthostatic-symptom-score': {
		fullName: 'Vanderbilt Orthostatic Symptom Score',
		abbreviation: 'VOSS',
		about: [
			'Nine orthostatic symptoms rated 0 (absent) to 10 for how the patient feels at that moment, summed to a total from 0 to 90; higher means more symptoms.',
			'Used in Vanderbilt POTS drug trials, rated seated and after up to 10 minutes standing (Raj et al. 2005; Raj et al. 2009); it lacks psychometric validation (Stick et al. 2024).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const ctx = VOSS_CONTEXT[r.subscores.context];
			return `${ctx ? `Rated ${ctx}. ` : ''}Bands: none established; the score has no validated cut-off and lacks psychometric validation (Stick et al. 2024).`;
		},
		citation: 'Raj SR, Black BK, Biaggioni I, Paranjape SY, Ramirez M, Dupont WD, Robertson D. Propranolol decreases tachycardia and improves symptoms in the postural tachycardia syndrome: less is more. Circulation. 2009;120(9):725–734.',
		doi: '10.1161/CIRCULATIONAHA.108.846501',
		// The rating context is worded in the outcome line; the history table still shows it.
		hideSubscores: ['context'],
	},

	'orthostatic-grading-scale': {
		fullName: 'Orthostatic Grading Scale',
		abbreviation: 'OGS',
		about: [
			'Five self-report items on symptoms of orthostatic intolerance, each scored 0 to 4, total 0 to 20; higher means more orthostatic symptoms.',
			'Developed at the Mayo Clinic in 145 patients tested in the autonomic laboratory, 97 with orthostatic hypotension; alpha 0.91 (Schrezenmaier et al. 2005).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const src = '(Słomko et al. 2020, citing Schrezenmaier et al. 2005)';
			if (r.total === null) return `Thresholds: 4 or more consistent with orthostatic intolerance, 9 or more with orthostatic hypotension ${src}.`;
			if (r.total >= 9) return `9 or more, the level studies using the OGS treat as consistent with orthostatic hypotension ${src}.`;
			if (r.total >= 4) return `4 to 8: at or above 4, which studies using the OGS treat as consistent with orthostatic intolerance, and below 9 ${src}.`;
			return `Below 4, the lower threshold that studies using the OGS treat as consistent with orthostatic intolerance ${src}.`;
		},
		citation: 'Schrezenmaier C, Gehrking JA, Hines SM, Low PA, Benrud-Larson LM, Sandroni P. Evaluation of orthostatic hypotension: relationship of a new self-report instrument to laboratory-based measures. Mayo Clin Proc. 2005;80(3):330–334.',
		doi: '10.4065/80.3.330',
	},

	'nasa-lean-test': {
		fullName: 'NASA lean test',
		about: [
			'10 minutes lying, then 10 minutes leaning against a wall, done at home with the patient\'s own device; readings at 1, 3, 5 and 10 minutes. The result is the peak leaning heart rate minus the last supine reading.',
			'Not validated against tilt-table or active stand testing (Teuschl et al. 2025). In 112 adults without orthostatic intolerance the average rise was 9.9 bpm (Iftekhar et al. 2025).',
			'No minimal important change, and no figure for day-to-day variation of a home lean test, has been published.',
		],
		outcome: r => {
			const crit = 'the sustained rise of 30 bpm (40 at ages 12 to 19) within 10 minutes of standing or tilt in the consensus POTS definition (Vernino et al. 2021)';
			const hr = r.total === null ? '' : r.total >= 30
				? `Peak rise of ${r.total} bpm, at or above ${crit}; that definition was set for standing and tilt, not the lean test.`
				: `Peak rise of ${r.total} bpm, below ${crit}.`;
			const sys = r.subscores.sysdrop;
			const bp = sys !== undefined && sys >= 20 ? ` Systolic fall of ${sys} mmHg: the definition requires no sustained fall of 20 mmHg or more.` : '';
			return (hr + bp).trim() || `Heart rate criterion: ${crit}.`;
		},
		citation: 'Vernino S, Bourne KM, Stiles LE, Grubb BP, Fedorowski A, Stewart JM, et al. Postural orthostatic tachycardia syndrome (POTS): state of the science and clinical care from a 2019 National Institutes of Health Expert Consensus Meeting – Part 1. Auton Neurosci. 2021;235:102828.',
		doi: '10.1016/j.autneu.2021.102828',
		totalLabel: 'Heart rate rise on standing (bpm)',
		subscoreHeading: 'Reading',
	},

	nijmegen: {
		fullName: 'Nijmegen Questionnaire',
		about: [
			'16 symptoms linked with over-breathing and stress, each scored 0 (never) to 4 (very often), total 0 to 64; its authors now call it a measure of functional respiratory complaints (van Dixhoorn and Folgering 2015).',
			'Validated against a clinical diagnosis of hyperventilation syndrome in 75 patients and 80 health care workers: sensitivity 91%, specificity 95% (van Dixhoorn and Duivenvoorden 1985).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const src = '(van Dixhoorn and Folgering 2015)';
			const c23 = 'the most-used cut-off (a sum score above 22): it best separated patients whose complaints were provoked by voluntary hyperventilation from other patients in the first validation study';
			if (r.total === null) return `Cut-off: 23 or above, ${c23} ${src}.`;
			if (r.total >= 23) return `At or above 23, ${c23} ${src}.`;
			if (r.total >= 19) return `Below 23, the most-used cut-off, but at or above 19, which best separated hyperventilators from healthy subjects in the authors' 1985 data ${src}.`;
			return `Below 19, the lowest published cut-off; people without breathing complaints average about 10 to 12 ${src}.`;
		},
		citation: 'van Dixhoorn J, Duivenvoorden HJ. Efficacy of Nijmegen Questionnaire in recognition of the hyperventilation syndrome. J Psychosom Res. 1985;29(2):199–206.',
		doi: '10.1016/0022-3999(85)90042-x',
	},

	'self-evaluation-of-breathing-questionnaire': {
		fullName: 'Self-Evaluation of Breathing Questionnaire',
		abbreviation: 'SEBQ',
		about: [
			'25 statements on breathing sensations linked with dysfunctional breathing, each rated 0 to 3, total 0 to 75; higher means more breathing symptoms.',
			'Tested in 180 people online, 155 repeated after two weeks: ICC 0.89, typical error 4.0 points, mean 15.1 (SD 11.6) (Mitchell et al. 2016).',
			'No minimal important change has been published.',
		],
		outcome: () => 'Bands: none established. A cut-off of 25 or more rests on expert opinion and has not been verified (Kiesel et al. 2017; Bondarenko et al. 2026).',
		citation: 'Mitchell AJ, Bacon CJ, Moran RW. Reliability and determinants of Self-Evaluation of Breathing Questionnaire (SEBQ) score: a symptoms-based measure of dysfunctional breathing. Appl Psychophysiol Biofeedback. 2016;41(1):111–120.',
		doi: '10.1007/s10484-015-9316-7',
	},

	'beighton-score': {
		fullName: 'Beighton score',
		about: [
			'Nine-point check for generalised joint hypermobility: four manoeuvres scored one point per side, plus one for palms to the floor; first described in a study of articular mobility in an African population (Beighton et al. 1973).',
			'Self-scored here, not measured with a goniometer. A 2017 systematic review rated the evidence on its reliability limited positive to conflicting (Juul-Kristensen et al. 2017).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const cut = 'the age-adjusted cut-off for generalised joint hypermobility (6 or more pre-pubertal children and adolescents, 5 or more from puberty to age 50, 4 or more over 50; Malfait et al. 2017)';
			if (r.subscores.met === 1) return `Meets ${cut} for the age group selected. Self-scored; to be confirmed on examination.`;
			if (r.subscores.met === 0) return `Below ${cut} for the age group selected. One point short can still count with a positive five-part questionnaire (Malfait et al. 2017).`;
			return `Cut-off: ${cut}.`;
		},
		citation: 'Beighton P, Solomon L, Soskolne CL. Articular mobility in an African population. Ann Rheum Dis. 1973;32(5):413–418.',
		doi: '10.1136/ard.32.5.413',
		subscoreHeading: 'Manoeuvre',
		resultSubscores: ['fingers', 'thumbs', 'elbows', 'knees', 'palms'],
	},

	'five-part-questionnaire': {
		fullName: 'Five-part questionnaire for hypermobility',
		abbreviation: '5PQ',
		about: [
			'Five yes/no questions screening for generalised joint hypermobility, now or in the past; the score is the number of "yes" answers.',
			'Developed in 212 hypermobile women at two London hypermobility clinics and 57 healthy volunteers (Hakim and Grahame 2003); specificity was lower outside clinics, 75% and 62% (Glans et al. 2020; Schlager et al. 2020).',
			'No minimal important change has been published. Not validated in children (Malfait et al. 2017).',
		],
		outcome: r => {
			if (r.total === null) return 'Threshold: 2 or more "yes" answers is a positive screen (Hakim and Grahame 2003).';
			return r.total >= 2
				? 'Positive screen: 2 or more "yes" answers, the threshold with the best combined sensitivity (84%) and specificity (89%) in the original study (Hakim and Grahame 2003).'
				: 'Negative screen: fewer than the 2 "yes" answers needed for a positive screen (Hakim and Grahame 2003).';
		},
		citation: 'Hakim AJ, Grahame R. A simple questionnaire to detect hypermobility: an adjunct to the assessment of patients with diffuse musculoskeletal pain. Int J Clin Pract. 2003;57(3):163–166.',
		doi: '10.1111/j.1742-1241.2003.tb10455.x',
		totalLabel: '"Yes" answers',
	},

	'heds-criteria': {
		fullName: '2017 diagnostic criteria for hypermobile Ehlers-Danlos syndrome',
		abbreviation: 'hEDS',
		about: [
			'Patient-completed checklist of the three 2017 clinical criteria for hEDS: generalised joint hypermobility (Beighton, with the five-part questionnaire when one point short), two or more of Features A, B and C, and the Criterion 3 exclusions. There is no score.',
			'Follows the 2017 International Classification of the Ehlers-Danlos Syndromes (Malfait et al. 2017) and the Ehlers-Danlos Society diagnostic checklist; all three criteria are required.',
			'Feature A signs needing examination or echocardiography, and the Criterion 3 exclusions, can only be confirmed by a clinician. New criteria are due on 1 December 2026.',
		],
		outcome: r => {
			const s = r.subscores;
			const src = '(Malfait et al. 2017)';
			if (s.c1 !== 1) return `Criterion 1 (generalised joint hypermobility) not met as self-reported, so the pattern does not meet the 2017 hEDS criteria ${src}.`;
			if (s.c2 !== 1) return s.c2open === 1
				? `Criterion 1 met as self-reported; Criterion 2 undecided, pending Feature A signs or family history still unknown ${src}.`
				: `Criterion 1 met as self-reported; Criterion 2 not met, so the pattern does not meet the 2017 hEDS criteria ${src}.`;
			if (s.c3 !== 1) return s.c3open === 1
				? `Criteria 1 and 2 met as self-reported; the Criterion 3 exclusions have not been assessed and need a clinician ${src}.`
				: `Criteria 1 and 2 met as self-reported; a Criterion 3 prerequisite was recorded as not met ${src}.`;
			return `Pattern meets all three 2017 hEDS criteria as self-reported, with the Criterion 3 exclusions recorded as clinician-confirmed; the diagnosis rests with the examining clinician ${src}.`;
		},
		citation: 'Malfait F, Francomano C, Byers P, Belmont J, Berglund B, Black J, et al. The 2017 international classification of the Ehlers-Danlos syndromes. Am J Med Genet C Semin Med Genet. 2017;175(1):8–26.',
		doi: '10.1002/ajmg.c.31552',
		attribution: 'Criteria from the 2017 International Classification of the Ehlers-Danlos Syndromes (The Ehlers-Danlos Society).',
		subscoreHeading: 'Item',
	},
};
