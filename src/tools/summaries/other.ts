// Clinician summary configs for the brain fog, pain, wellbeing and activity tools. See src/tools/clinician-summary.ts for the rules.
import type { SummaryConfig } from '../clinician-summary';

/** FS (polysymptomatic distress) categories, Wolfe et al. 2015; same cut-offs as the tool config's bands. */
function fsCategory(fs: number): string {
	if (fs <= 3) return 'none';
	if (fs <= 7) return 'mild';
	if (fs <= 11) return 'moderate';
	if (fs <= 19) return 'severe';
	return 'very severe';
}

/** The IPAQ category is not stored as a band; the page writes it into the result summary. */
function ipaqCategory(summary: string | undefined): string | null {
	if (!summary) return null;
	if (summary.includes('category not assigned')) return 'not assigned';
	return summary.match(/\b(high|moderate|low) activity category\b/)?.[1] ?? null;
}

export const SUMMARIES_OTHER: Record<string, SummaryConfig> = {
	'fibromyalgia-survey': {
		fullName: '2016 ACR Fibromyalgia Survey',
		about: [
			'Widespread pain index (0–19) plus symptom severity scale (0–12) give the fibromyalgia severity (FS) score, 0 to 31; the criteria also need pain in at least 4 of 5 regions and symptoms for at least 3 months.',
			'Revised in 2016 after a review of 14 validation studies of the 2010/2011 criteria; mean FS 18.7 in people with fibromyalgia and 8.5 in controls. The self-report version is valid for research, not for individual diagnosis (Wolfe et al. 2016).',
			'No minimal important change has been published; for people already diagnosed, the authors suggest a later FS below 12 might be used as a measure of improvement (Wolfe et al. 2016).',
		],
		outcome: r => {
			const met = r.subscores.criteria === 1;
			const criteria = met
				? 'Responses meet the 2016 fibromyalgia criteria threshold (self-report version; Wolfe et al. 2016).'
				: 'Responses do not meet the 2016 fibromyalgia criteria threshold (self-report version; Wolfe et al. 2016).';
			if (r.total === null) return criteria;
			return `${criteria} FS score in the "${fsCategory(r.total)}" polysymptomatic distress category (Wolfe et al. 2015).`;
		},
		citation: 'Wolfe F, Clauw DJ, Fitzcharles MA, Goldenberg DL, Häuser W, Katz RL, Mease PJ, Russell AS, Russell IJ, Walitt B. 2016 revisions to the 2010/2011 fibromyalgia diagnostic criteria. Semin Arthritis Rheum. 2016;46(3):319–329.',
		doi: '10.1016/j.semarthrit.2016.08.012',
		totalLabel: 'FS score',
		subscoreHeading: 'Component',
	},

	'cognitive-failures-questionnaire': {
		fullName: 'Cognitive Failures Questionnaire',
		abbreviation: 'CFQ',
		about: [
			'25 questions on how often everyday slips of attention, memory and action happen, each 0 to 4, total 0 to 100 (this version asks about the past six months); higher means more frequent lapses. A self-report of lapses, not a test of cognitive function.',
			'Published by Broadbent et al. (1982). Group averages of 44 to 64 in long COVID (Bland et al. 2024; Miskowiak et al. 2023) and 57 in ME/CFS (Attree et al. 2014).',
			'Factor scores are item means (0–4) on the Rast et al. 2009 factors; a single factor fitted best and subscales are not recommended (Goodman et al. 2022).',
			'No minimal important change has been published (Berentschot et al. 2025).',
		],
		outcome: () => 'Bands: none established. No clinical cut-off has been published for the CFQ; for reference, 839 US community adults averaged 31.7 (Goodman et al. 2022).',
		citation: 'Broadbent DE, Cooper PF, FitzGerald P, Parkes KR. The Cognitive Failures Questionnaire (CFQ) and its correlates. Br J Clin Psychol. 1982;21(1):1–16.',
		doi: '10.1111/j.2044-8260.1982.tb01421.x',
		subscoreHeading: 'Factor',
	},

	'who-5': {
		fullName: 'WHO-5 Well-Being Index',
		abbreviation: 'WHO-5',
		about: [
			'Five questions on well-being over the past two weeks; the raw score (0–25) is multiplied by 4 to give 0 to 100, where higher means better well-being.',
			'In use since 1998; a review of 213 studies found high clinimetric validity, both as an outcome measure and as a screening tool for depression (Topp et al. 2015).',
			'A change of 10 points or more is considered clinically meaningful (Topp et al. 2015).',
		],
		outcome: r => {
			if (r.total === null) return 'Cut-offs: 50 or below reduced well-being, 28 or below markedly low well-being (Topp et al. 2015).';
			if (r.total <= 28) return 'At or below 28, the cut-off for markedly low well-being (Topp et al. 2015).';
			if (r.total <= 50) return '29 to 50: at or below the cut-off of 50 for reduced well-being, above 28, the cut-off for markedly low well-being (Topp et al. 2015).';
			return 'Above 50, the cut-off for reduced well-being (Topp et al. 2015).';
		},
		citation: 'Topp CW, Østergaard SD, Søndergaard S, Bech P. The WHO-5 Well-Being Index: a systematic review of the literature. Psychother Psychosom. 2015;84(3):167–176.',
		doi: '10.1159/000376585',
		attribution: 'WHO-5 © World Health Organization 2024. The World Health Organization-Five Well-Being Index (WHO-5). Geneva: World Health Organization; 2024. Licence: CC BY-NC-SA 3.0 IGO.',
	},

	'satisfaction-with-life-scale': {
		fullName: 'Satisfaction with Life Scale',
		abbreviation: 'SWLS',
		about: [
			'Five statements on global judgement of life satisfaction, each rated 1 to 7, total 5 to 35; higher means more satisfied. It has no time frame, so it is more stable than mood measures.',
			'Developed by Diener et al. (1985), with high internal consistency and temporal reliability and suited to different age groups; most people in Western general-population samples score 21 to 30.',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const t = r.total;
			if (t === null) return 'Bands: 31–35 extremely satisfied, 26–30 satisfied, 21–25 slightly satisfied, 20 neutral, 15–19 slightly dissatisfied, 10–14 dissatisfied, 5–9 extremely dissatisfied (Pavot & Diener 1993).';
			const [band, range] =
				t >= 31 ? ['extremely satisfied', '31–35']
				: t >= 26 ? ['satisfied', '26–30']
				: t >= 21 ? ['slightly satisfied', '21–25']
				: t === 20 ? ['neutral', '20']
				: t >= 15 ? ['slightly dissatisfied', '15–19']
				: t >= 10 ? ['dissatisfied', '10–14']
				: ['extremely dissatisfied', '5–9'];
			return `In the "${band}" band (${range}) (Pavot & Diener 1993).`;
		},
		citation: 'Diener E, Emmons RA, Larsen RJ, Griffin S. The Satisfaction With Life Scale. J Pers Assess. 1985;49(1):71–75.',
		doi: '10.1207/s15327752jpa4901_13',
		attribution: 'SWLS © Ed Diener, Robert Emmons, Randy Larsen and Sharon Griffin. Free for non-commercial use with credit.',
	},

	'brief-resilience-scale': {
		fullName: 'Brief Resilience Scale',
		abbreviation: 'BRS',
		about: [
			'Six statements on the ability to bounce back or recover from stress, three of them reverse-scored; the mean gives a score from 1 to 5, higher meaning faster recovery.',
			'Validated in four samples: two student samples, cardiac rehabilitation patients, and women with and without fibromyalgia (Smith et al. 2008). General and student samples average about 3.5 to 3.9.',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const t = r.total;
			if (t === null) return 'Bands: 1.00–2.99 low, 3.00–4.30 normal, 4.31–5.00 high resilience (Smith et al. 2013).';
			const [band, range] = t >= 4.31 ? ['high', '4.31–5.00'] : t >= 3 ? ['normal', '3.00–4.30'] : ['low', '1.00–2.99'];
			return `In the "${band} resilience" band (${range}) (Smith et al. 2013).`;
		},
		citation: 'Smith BW, Dalen J, Wiggins K, Tooley E, Christopher P, Bernard J. The brief resilience scale: assessing the ability to bounce back. Int J Behav Med. 2008;15(3):194–200.',
		doi: '10.1080/10705500802222972',
		attribution: 'Brief Resilience Scale: Smith BW et al. 2008.',
		totalLabel: 'Mean score',
	},

	audit: {
		fullName: 'Alcohol Use Disorders Identification Test',
		abbreviation: 'AUDIT',
		about: [
			'Ten questions on alcohol consumption (0–12), dependence symptoms (0–12) and alcohol-related harm (0–16), total 0 to 40; higher means riskier drinking.',
			'Developed in a six-country WHO collaborative project from 1,888 primary care attenders; 92% of those with hazardous or harmful use scored 8 or more (Saunders et al. 1993).',
			'The WHO notes that a lower threshold may suit women, people over 65 and anyone whose health makes alcohol riskier (Babor et al. 2001).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const t = r.total;
			if (t === null) return 'Zones: 0–7 low risk, 8–15 hazardous, 16–19 harmful, 20–40 possible dependence (Babor et al. 2001).';
			if (t >= 20) return 'Zone IV (20–40), possible dependence: the WHO guidelines recommend referral to a specialist for diagnostic evaluation and treatment (Babor et al. 2001).';
			if (t >= 16) return 'Zone III (16–19), harmful drinking: the WHO guidelines recommend simple advice plus brief counselling and continued monitoring (Babor et al. 2001).';
			if (t >= 8) return 'Zone II (8–15), hazardous drinking: the WHO guidelines recommend simple advice (Babor et al. 2001).';
			return 'Zone I (0–7), low risk: the WHO guidelines recommend alcohol education (Babor et al. 2001).';
		},
		citation: 'Babor TF, Higgins-Biddle JC, Saunders JB, Monteiro MG. AUDIT: The Alcohol Use Disorders Identification Test. Guidelines for use in primary care. 2nd ed. Geneva: World Health Organization; 2001.',
		// WHO manual: no DOI.
		doi: '',
		attribution: 'AUDIT © World Health Organization 2001.',
	},

	'ipaq-short-form': {
		fullName: 'International Physical Activity Questionnaire, short form',
		abbreviation: 'IPAQ',
		about: [
			'Days and minutes of vigorous activity, moderate activity and walking over the last 7 days, converted to MET-minutes per week (8.0, 4.0 and 3.3 METs; bouts under 10 minutes count as 0, each activity capped at 180 minutes a day). Sitting time is recorded separately.',
			'Developed by an international consensus group in 1997–98 and tested in 14 centres in 12 countries in adults aged 18 to 65: test-retest rho about 0.8, median rho about 0.30 against accelerometry (Craig et al. 2003).',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const cat = r.band ?? ipaqCategory(r.summary);
			if (cat === 'not assigned') return 'Category not assigned: reported activity exceeds 16 hours a day, which the IPAQ scoring guidelines treat as unreliable (IPAQ scoring guidelines 2005).';
			if (!cat) return 'Category not recorded with this result. Categories are low, moderate and high (IPAQ scoring guidelines 2005).';
			return `IPAQ "${cat}" physical activity category (IPAQ scoring guidelines 2005); the categories were designed for the general population, not for people with post-exertional malaise.`;
		},
		citation: 'Craig CL, Marshall AL, Sjöström M, Bauman AE, Booth ML, Ainsworth BE, Pratt M, Ekelund U, Yngve A, Sallis JF, Oja P. International physical activity questionnaire: 12-country reliability and validity. Med Sci Sports Exerc. 2003;35(8):1381–1395.',
		doi: '10.1249/01.MSS.0000078924.61453.FB',
		attribution: 'The IPAQ is freely available for use without permission.',
		totalLabel: 'MET-minutes per week',
		subscoreHeading: 'Activity',
	},

	'godin-shephard-leisure-time-exercise-questionnaire': {
		fullName: 'Godin-Shephard Leisure-Time Exercise Questionnaire',
		about: [
			'Weekly counts of strenuous, moderate and mild leisure-time exercise sessions lasting more than 15 minutes. The Leisure Score Index used for the health classification is 9 × strenuous + 5 × moderate; mild sessions (× 3) count only in the traditional total.',
			'Published by Godin and Shephard (1985); validated against fitness testing and accelerometers, and widely used in research including cancer and cardiac populations. The bands were derived for healthy adults.',
			'No minimal important change has been published.',
		],
		outcome: r => {
			const t = r.total;
			if (t === null) return 'Bands: 24 or more active, 14–23 moderately active, under 14 insufficiently active (Godin 2011).';
			const [band, range] = t >= 24 ? ['active', '24 or more'] : t >= 14 ? ['moderately active', '14–23'] : ['insufficiently active', 'under 14'];
			return `"${band.charAt(0).toUpperCase()}${band.slice(1)}" (${range}) in Godin's classification (Godin 2011); the bands describe the general population, not people with post-exertional malaise.`;
		},
		citation: 'Godin G. The Godin-Shephard Leisure-Time Physical Activity Questionnaire. Health Fitness J Can. 2011;4(1):18–22.',
		doi: '10.14288/hfjc.v4i1.82',
		attribution: 'The Godin-Shephard Leisure-Time Physical Activity Questionnaire © Gaston Godin, CC BY-NC-ND 4.0 (Godin 2011).',
		totalLabel: 'Leisure Score Index',
		subscoreHeading: 'Intensity',
	},
};
