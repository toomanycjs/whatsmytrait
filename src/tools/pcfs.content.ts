// REVIEW: interpretation copy for the PCFS scale, drafted for Craig's review.
// Single source for the visible section and the FAQPage JSON-LD.
//
// Sources, checked against the documents:
// - Klok FA, Boon GJAM, Barco S, et al. The Post-COVID-19 Functional Status
//   scale: a tool to measure functional status over time after COVID-19. Eur
//   Respir J 2020;56:2001494 (full text, PMC7236834): adapted from the post-VTE
//   functional status (PVFS) scale; figure 1 instructions: grade the average of
//   the past week; if two grades seem to fit, choose the higher; suggested at
//   discharge, at 4 and 8 weeks, and at 6 months; not yet validated (2020);
//   not meant to replace measures of quality of life, fatigue or breathlessness.
// - PCFS manual, version 2, July 2020 (osf.io/qgpdv): p3 timing (discharge,
//   4 and 8 weeks, 6 months); p4 rate ability, not whether the activity is
//   actually done; "whether or not as a result of the specific infection";
//   Table 1 grade names and descriptions; Table 2 patient questionnaire;
//   Figure 1 flowchart (matches the four questions on this page); p14
//   limitations "may or may not be directly linked to COVID-19".
// - Machado FVC et al. Construct validity of the PCFS scale in adult subjects
//   with COVID-19. Health Qual Life Outcomes 2021;19:40 (full text,
//   PMC7856622): 1,939 people about 3 months (79 +/- 17 days) after symptom
//   onset, 85% women, 95% not hospitalised; grades 2-4 showed a gradual increase
//   in symptoms and reduction in quality of life; no differences between grades
//   0 and 1; grade 0 3% and grade 1 8% of the sample.
// - de Jong CMM et al. Eight lessons from 2 years of use of the PCFS scale. Eur
//   Respir J 2023;61:2300416 (full text, PMC10151454): more than 25
//   translations; recommended in guidelines including the WHO guideline on
//   clinical management of COVID-19; meant to be used alongside other measures;
//   predictive validity still to be studied.
// No minimal important change has been published for the PCFS scale.

export const SOURCES = {
	klok2020: { label: 'Klok et al. 2020', href: 'https://doi.org/10.1183/13993003.01494-2020' },
	manual: { label: 'PCFS manual (OSF)', href: 'https://osf.io/qgpdv/' },
	machado2021: { label: 'Machado et al. 2021', href: 'https://doi.org/10.1186/s12955-021-01691-2' },
	dejong2023: { label: 'de Jong et al. 2023', href: 'https://doi.org/10.1183/13993003.00416-2023' },
};

export const FAQ = {
	measures: {
		q: 'What is the PCFS scale?',
		a: 'The Post-COVID-19 Functional Status (PCFS) scale grades how much your everyday life is limited, from 0 (no functional limitations) to 4 (severe functional limitations). Klok and colleagues proposed it in 2020, adapting a scale for recovery after blood clots, and it now has more than 25 translations. You grade the average of the past week.',
	},
	grades: {
		q: 'What do the PCFS grades mean?',
		a: 'Grade 0: no symptoms and no limitations. Grade 1: symptoms, pain, depression or anxiety, but all usual activities at the same intensity. Grade 2: usual activities at a lower intensity, or occasionally avoided, reduced or spread out, but all done without help. Grade 3: some usual activities can no longer be done and have been cut back or taken over by others, but you can look after yourself. Grade 4: you need help with daily living, such as eating, washing or using the toilet. If two grades seem to fit, choose the higher one.',
	},
	symptoms: {
		q: 'Is the PCFS a measure of symptom severity?',
		a: 'No. It records what symptoms do to your daily life, not the symptoms themselves, and it does not ask what causes the limitation. In a study of 1,939 people about three months after COVID-19, symptoms and quality of life got steadily worse from grade 2 to grade 4, while people at grades 0 and 1 did not differ.',
	},
	change: {
		q: 'What is a meaningful change in PCFS grade?',
		a: 'No minimal important change has been published. With only five grades, a move from one grade to another is a clear change in what you report, but a steady grade can hide smaller changes. The manual suggests regular checks, such as 4 and 8 weeks after leaving hospital and at 6 months; grade yourself on what you are able to do, not just what you happen to do.',
	},
	diagnosis: {
		q: 'Can the PCFS diagnose long COVID?',
		a: 'No. It grades how limited you are, whatever the cause, and the manual notes that limitations may or may not be linked to COVID-19. Its authors intend it to be used alongside other measures, not instead of them.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'grades', 'symptoms', 'change', 'diagnosis'] as const;
