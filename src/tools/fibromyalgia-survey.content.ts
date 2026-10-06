// REVIEW: interpretation copy for the 2016 fibromyalgia survey, drafted for
// Craig's review. Single source for the visible section and the FAQPage JSON-LD.
//
// Sources, checked against the papers:
// - Wolfe F, et al. 2016 revisions to the 2010/2011 fibromyalgia diagnostic
//   criteria. Semin Arthritis Rheum 2016;46:319-29. Criteria (Table 3); jaw,
//   chest and abdomen excluded from generalised pain; FS < 12 cannot meet the
//   criteria; 92-96% of FS >= 12 meet them; mean FS 18.7 (median 19.1) in
//   cases and 8.5 (8.2) in controls; self-report version valid for research,
//   not individual diagnosis; valid irrespective of other diagnoses; a later
//   score below 12 "might be used as a measure of improvement".
// - Wolfe F, et al. The use of polysymptomatic distress categories in the
//   evaluation of fibromyalgia. J Rheumatol 2015;42(8):1494-501: categories
//   none 0-3, mild 4-7, moderate 8-11, severe 12-19, very severe 20-31.
// No minimal important change for the FS score was found.

export const SOURCES = {
	wolfe2016: { label: 'Wolfe et al. 2016', href: 'https://doi.org/10.1016/j.semarthrit.2016.08.012' },
	wolfe2015: { label: 'Wolfe et al. 2015', href: 'https://www.jrheum.org/content/42/8/1494' },
	nice: { label: 'NICE NG193', href: 'https://www.nice.org.uk/guidance/ng193' },
};

export const FAQ = {
	measures: {
		q: 'What is the 2016 fibromyalgia survey?',
		a: 'It has two parts. The widespread pain index (0 to 19) counts the body areas where you had pain in the past week. The symptom severity scale (0 to 12) rates fatigue, waking unrefreshed and problems with thinking or memory, plus whether headaches, lower abdominal pain or cramps, and depression bothered you in the past six months. Added together they give the fibromyalgia severity score, from 0 to 31.',
	},
	criteria: {
		q: 'What score on the fibromyalgia survey suggests fibromyalgia?',
		a: 'The 2016 criteria are met when the pain index is 7 or more with a symptom score of 5 or more, or the pain index is 4 to 6 with a symptom score of 9 or more; pain is present in at least 4 of 5 body regions, not counting the jaw, chest or abdomen; and symptoms have been present at a similar level for at least 3 months. A severity score below 12 cannot meet the criteria.',
	},
	bands: {
		q: 'What do the fibromyalgia severity score categories mean?',
		a: 'Wolfe and colleagues grouped severity scores into five categories: 0 to 3 none, 4 to 7 mild, 8 to 11 moderate, 12 to 19 severe and 20 to 31 very severe. In their 2016 review, average scores were about 19 in people with fibromyalgia and about 8 in people without it, and 92 to 96% of people scoring 12 or more met the criteria.',
	},
	change: {
		q: 'What is a meaningful change in fibromyalgia severity score?',
		a: 'No minimal important change has been published. The pain index covers only the past week, so it can move from week to week; a change is more convincing when it holds across results a month or more apart. For people already diagnosed, the criteria authors suggest a later score below 12 might be used as a measure of improvement.',
	},
	diagnosis: {
		q: 'Does meeting the survey criteria mean I have fibromyalgia?',
		a: 'No. The criteria authors say the self-report version is valid for research but not for diagnosing an individual; a diagnosis needs a clinician, an examination and a check for other causes. The criteria apply regardless of other diagnoses: another condition does not rule fibromyalgia out, and fibromyalgia does not rule other illnesses out.',
	},
} as const;

export const FAQ_ORDER = ['measures', 'criteria', 'bands', 'change', 'diagnosis'] as const;
