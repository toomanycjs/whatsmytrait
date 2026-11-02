// Clinician summary configs for the ME/CFS, fatigue and function tools. See src/tools/clinician-summary.ts for the rules.
import type { SummaryConfig } from '../clinician-summary';

/** DSQ-2 case definitions, named as in dsq-2.content.ts (DePaul's scoring rules). */
const DSQ2_DEFINITIONS: [string, string][] = [
	['iom', 'IOM / NAM (2015)'],
	['ccc', 'Canadian Consensus (2003)'],
	['meicc', 'ME International Consensus (2011)'],
	['fukuda', 'Fukuda (1994)'],
];

const listJoin = (items: string[]) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

/** PCFS grade names: PCFS manual v2 (July 2020), Table 1, and Klok et al. 2020, figure 1. */
const PCFS_GRADES = [
	'no functional limitations',
	'negligible functional limitations',
	'slight functional limitations',
	'moderate functional limitations',
	'severe functional limitations',
];

export const SUMMARIES_MECFS: Record<string, SummaryConfig> = {
	'bell-scale': {
		fullName: 'Bell CFIDS Disability Scale',
		about: [
			'A single rating of overall function from 0 to 100 in steps of 10; each step describes symptoms, activity as a share of what would be expected, and capacity for work. Higher means better function.',
			'Published by David Bell in 1995 and widely used in ME/CFS clinics and research; we have not found a published study of its measurement properties.',
			'No minimal important change has been published; one step (10 points) is the smallest change it can record.',
		],
		outcome: () => 'Bands: none established. Each of the 11 levels is its own description, with no separate bands (Bell 1995).',
		citation: 'Bell DS. The measurement of disability. In: The Doctor\'s Guide to Chronic Fatigue Syndrome. 2nd ed. Perseus Books; 1995. p. 119–31.',
		// Book chapter: no DOI.
		doi: '',
		totalLabel: 'Bell score',
	},
	'funcap': {
		fullName: 'FUNCAP functional capacity questionnaire',
		abbreviation: 'FUNCAP27',
		about: [
			'27 everyday activities in eight domains, each rated 0 to 6 for what it costs on a typical day over the past month; each domain score is the mean of its activities and the total is the mean of the eight domains. Higher means greater functional capacity.',
			'Developed in Norway with people with ME/CFS over six survey rounds; mean total 3.3 in 1,263 people with ME/CFS and 5.8 in 178 healthy controls, with two-week test-retest ICC 0.98 in 301 people (Sommerfelt et al. 2024).',
			'No minimal important change has been published.',
		],
		outcome: () => 'Bands: none established. The authors published no cut-offs (Sommerfelt et al. 2024).',
		citation: 'Sommerfelt K, Schei T, Seton KA, Carding SR. Assessing functional capacity in myalgic encephalopathy/chronic fatigue syndrome: a patient-informed questionnaire. J Clin Med. 2024;13(12):3486.',
		doi: '10.3390/jcm13123486',
		attribution: 'FUNCAP27 © the authors, CC BY 4.0 (funcap.no).',
		totalLabel: 'Total (mean of the 8 domains)',
	},
	'dsq-2': {
		fullName: 'DePaul Symptom Questionnaire-2',
		abbreviation: 'DSQ-2',
		about: [
			'Self-report of how often and how severely 79 symptoms occurred over the past six months, scored against four published ME/CFS case definitions using DePaul\'s rules (Jason and Sunnquist 2018).',
			'Validated in 399 adults with ME or CFS, whose answers formed eight symptom factors (Bedree et al. 2019). The domain scores shown (0 to 100) are this site\'s summary of those factors, not official DSQ-2 scores.',
			'No minimal important change or cut-offs have been published.',
		],
		outcome: r => {
			const met = DSQ2_DEFINITIONS.filter(([k]) => r.subscores[k] === 1).map(([, name]) => name);
			return met.length
				? `Self-reported answers meet the ${listJoin(met)} ${met.length === 1 ? 'case definition' : 'case definitions'} under DePaul's scoring rules (Jason and Sunnquist 2018).`
				: 'Self-reported answers meet none of the four case definitions scored (IOM / NAM 2015, Canadian Consensus 2003, ME International Consensus 2011, Fukuda 1994) under DePaul\'s scoring rules (Jason and Sunnquist 2018).';
		},
		citation: 'Jason LA, Sunnquist M. The development of the DePaul Symptom Questionnaire: original, expanded, brief, and pediatric versions. Front Pediatr. 2018;6:330.',
		doi: '10.3389/fped.2018.00330',
		subscoreHeading: 'Symptom domain',
		resultSubscores: ['pem', 'cognitive', 'orthostatic', 'sleep', 'pain', 'feverflu', 'genitourinary', 'temperature'],
	},
	'dsq-pem': {
		fullName: 'DePaul Symptom Questionnaire – Post-Exertional Malaise',
		abbreviation: 'DSQ-PEM',
		about: [
			'10 questions on post-exertional malaise (PEM) over the past six months: five rate the frequency and severity of PEM symptoms (0 to 4 each), five ask how long worsening lasts and what sets it off.',
			'Tested in 376 people with ME/CFS, 157 with multiple sclerosis and 167 with post-polio syndrome, all self-reported diagnoses; worsening lasting 14 hours or more separated the ME/CFS group with 87.5% sensitivity and 77.8% specificity (Cotler et al. 2018).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			if (r.subscores.pem !== 1) return 'Step 1 not met: PEM not indicated, as no PEM symptom was rated at least half the time and at least moderate (Cotler et al. 2018).';
			const step2 = r.subscores.longrecovery === 1 && (r.subscores.physical === 1 || r.subscores.mental === 1);
			return `Step 1 met: PEM indicated, with at least one PEM symptom at least half the time and at least moderate (Cotler et al. 2018). Step 2 (worse after minimal physical or mental effort, lasting 14 hours or more) ${step2 ? 'also met' : 'not met'}.`;
		},
		citation: 'Cotler J, Holtzman C, Dudun C, Jason LA. A brief questionnaire to assess post-exertional malaise. Diagnostics. 2018;8(3):66.',
		doi: '10.3390/diagnostics8030066',
		subscoreHeading: 'Step 1',
		hideSubscores: ['pem', 'longrecovery', 'physical', 'mental'],
	},
	'dsq-brief': {
		fullName: 'DePaul Symptom Questionnaire – Brief',
		abbreviation: 'DSQ-Brief',
		about: [
			'Four questions on fatigue, tiredness after minimal exercise, unrefreshing sleep and memory problems over the past six months, each rated for frequency and severity (0 to 4); each symptom\'s 0 to 100 score combines the two.',
			'Chosen to identify people meeting the IOM case definition, in 3,427 people (2,313 ME/CFS, 299 long COVID, 268 multiple sclerosis, 192 post-polio syndrome, 355 healthy controls): 96% accuracy against healthy controls, 84% against the other illnesses (Jason et al. 2023, as summarised by ME Research UK).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const met = r.subscores.met ?? 0;
			const verdict = met === 4 ? 'Screen positive' : met >= 1 ? 'Partial' : 'Screen negative';
			return `${verdict} by this site's rule, which needs all four: ${met} of 4 symptoms at least half the time and at least moderate (DePaul's 2/2 threshold; Cotler et al. 2018). The authors published no cut-off (Jason et al. 2023).`;
		},
		citation: 'Jason LA, Benner S, Furst J, Cathey P. Developing and validating a brief screening scale for ME/CFS. Fatigue: Biomedicine, Health & Behavior. 2023;11(2–4):176–87.',
		doi: '10.1080/21641846.2023.2252613',
		subscoreHeading: 'Symptom',
		hideSubscores: ['met'],
	},
	'pcfs': {
		fullName: 'Post-COVID-19 Functional Status scale',
		abbreviation: 'PCFS',
		about: [
			'A single grade of how much everyday life is limited, from 0 (no functional limitations) to 4 (severe functional limitations), for the average of the past week, whatever the cause.',
			'Proposed by Klok et al. 2020, adapted from the post-VTE functional status scale. In 1,939 adults about three months after COVID-19 (95% not hospitalised), symptoms rose and quality of life fell from grade 2 to grade 4, while grades 0 and 1 did not differ (Machado et al. 2021).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const label = r.total !== null ? PCFS_GRADES[r.total] : undefined;
			return label ? `Grade ${r.total}: ${label} (Klok et al. 2020).` : '';
		},
		citation: 'Klok FA, Boon GJAM, Barco S, et al. The Post-COVID-19 Functional Status scale: a tool to measure functional status over time after COVID-19. Eur Respir J. 2020;56(1):2001494.',
		doi: '10.1183/13993003.01494-2020',
		attribution: 'PCFS scale © the authors, CC BY 4.0. Manual and resources: PCFS resource page on OSF (https://osf.io/qgpdv/).',
		totalLabel: 'Grade',
	},
	'chalder-fatigue-scale': {
		fullName: 'Chalder Fatigue Scale',
		abbreviation: 'CFQ-11',
		about: [
			'11 questions on fatigue compared with when last well, over the past month. Likert scoring gives 0 to 33 (physical 0 to 21, mental 0 to 12); bimodal scoring gives 0 to 11. Higher means more fatigue.',
			'Developed in UK general practice (Chalder et al. 1993); mean Likert score 24.4 in 361 people with chronic fatigue syndrome and 14.2 in 1,615 adults attending general practice (Cella and Chalder 2010).',
			'No minimal important change has been published for individuals.',
		],
		outcome: r => {
			const b = r.subscores.bimodal;
			const lead = b === undefined ? '' : `Bimodal score ${b} of 11: ${b >= 4 ? 'at or above' : 'below'} the conventional cut-off of 4 for significant fatigue (Chalder et al. 1993; Stavem et al. 2021). `;
			return `${lead}No Likert bands have been published.`;
		},
		citation: 'Chalder T, Berelowitz G, Pawlikowska T, et al. Development of a fatigue scale. J Psychosom Res. 1993;37(2):147–153.',
		doi: '10.1016/0022-3999(93)90081-p',
		totalLabel: 'Likert score',
		subscoreHeading: 'Subscale',
	},
	'fss': {
		fullName: 'Fatigue Severity Scale',
		abbreviation: 'FSS',
		about: [
			'Nine statements on how fatigue affects daily life over the past week, each rated 1 to 7; the score is their mean, from 1 to 7. Higher means more impact.',
			'Developed in 25 people with multiple sclerosis, 29 with lupus and 20 healthy adults (Krupp et al. 1989); validated in more than 1,300 people in Switzerland, with means of 3.0 in 454 healthy adults and 4.7 in 188 with multiple sclerosis (Valko et al. 2008).',
			'No minimal important change has been published for post-viral illness or ME/CFS; a cross-sectional study in multiple sclerosis suggested at least 0.45 points (Rooney et al. 2019).',
		],
		outcome: r => {
			if (r.total === null) return '';
			return r.total >= 4
				? 'At or above the cut-off of 4, which the authors suggest be interpreted as indicative of fatigue (Valko et al. 2008).'
				: 'Below the cut-off of 4, which the authors suggest be interpreted as indicative of fatigue (Valko et al. 2008).';
		},
		citation: 'Krupp LB, LaRocca NG, Muir-Nash J, Steinberg AD. The fatigue severity scale: application to patients with multiple sclerosis and systemic lupus erythematosus. Arch Neurol. 1989;46(10):1121–1123.',
		doi: '10.1001/archneur.1989.00520460115022',
		attribution: 'Fatigue Severity Scale © Lauren B. Krupp.',
		totalLabel: 'Mean score',
	},
	'rand-36': {
		fullName: 'RAND 36-Item Health Survey 1.0',
		abbreviation: 'RAND-36',
		about: [
			'36 questions scored into eight scales, each 0 to 100 with RAND\'s scoring; higher means better health, and there is no overall total. Same questions as the SF-36, but RAND\'s scoring is somewhat different (Hays et al. 1993).',
			'RAND publishes mean scores from 2,471 patients in the Medical Outcomes Study (physical functioning 71, energy/fatigue 52). In 170 people with ME/CFS in England, means were 30 for physical functioning and 16 for vitality (Nacul et al. 2011, SF-36 version 2).',
			'No single minimal important change has been published for RAND-36 scales, and none for ME/CFS or long COVID.',
		],
		outcome: () => 'Bands: none established; RAND publishes no cut-offs (RAND scoring instructions).',
		citation: 'Hays RD, Sherbourne CD, Mazel RM. The RAND 36-Item Health Survey 1.0. Health Econ. 1993;2(3):217–227.',
		doi: '10.1002/hec.4730020305',
		attribution: 'RAND 36-Item Health Survey 1.0, RAND Corporation.',
		subscoreHeading: 'Scale',
		resultSubscores: ['physical', 'rolephysical', 'roleemotional', 'energy', 'emotional', 'social', 'pain', 'general'],
		historySubscores: ['physical', 'rolephysical', 'energy', 'social', 'pain', 'general'],
	},
};
