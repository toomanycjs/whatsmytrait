// DSQ-2 items, in the official order and wording.
//
// Symptom labels (questions 13-91) and the non-symptom questions are taken
// verbatim from DePaul's REDCap data dictionary for the DSQ-2
// (leonardjason.com/wp-content/uploads/2021/05/DSQ-2_REDCap.csv). The DSQ-2 is
// free to use. Answer values are the official codes, which the case-definition
// rules in dsq-2.scoring.ts depend on.
//
// The three SF-36 subscales used for "substantial reduction in functioning"
// are asked with the equivalent RAND 36-Item Health Survey items, scored with
// RAND's published key, as DePaul's scoring rules direct.

export const SYMPTOMS: Record<number, string> = {
	13: 'Fatigue / Extreme tiredness',
	14: 'Dead, heavy feeling after starting to exercise',
	15: 'Next day soreness or fatigue after non-strenuous, everyday activities',
	16: 'Mentally tired after the slightest effort',
	17: 'Minimum exercise makes you physically tired',
	18: 'Physically drained or sick after mild activity',
	19: 'Feeling unrefreshed after you wake up in the morning',
	20: 'Needing to nap daily',
	21: 'Problems falling asleep',
	22: 'Problems staying asleep',
	23: 'Waking up early in the morning (e.g., 3:00am)',
	24: 'Sleeping all day and staying awake all night',
	25: 'Pain or aching in your muscles',
	26: 'Pain / stiffness / tenderness in more than one joint without swelling or redness',
	27: 'Eye pain',
	28: 'Chest pain',
	29: 'Bloating',
	30: 'Abdomen / Stomach pain',
	31: 'Headaches',
	32: 'Muscle twitches',
	33: 'Muscle weakness',
	34: 'Sensitivity to noise',
	35: 'Sensitivity to bright lights',
	36: 'Problems remembering things',
	37: 'Difficulty paying attention for a long period of time',
	38: 'Difficulty finding the right word to say or expressing thoughts',
	39: 'Difficulty understanding things',
	40: 'Only able to focus on one thing at a time',
	41: 'Unable to focus vision',
	42: 'Unable to focus attention',
	43: 'Loss of depth perception',
	44: 'Slowness of thought',
	45: 'Absent-mindedness or forgetfulness',
	46: 'Bladder problems',
	47: 'Irritable bowel problems',
	48: 'Nausea',
	49: 'Feeling unsteady on your feet, like you might fall',
	50: 'Shortness of breath or trouble catching your breath',
	51: 'Dizziness or fainting',
	52: 'Irregular heart beats',
	53: 'Losing weight without trying',
	54: 'Gaining weight without trying',
	55: 'No appetite',
	56: 'Sweating hands',
	57: 'Night sweats',
	58: 'Cold limbs (e.g. arms, legs, hands)',
	59: 'Feeling chills or shivers',
	60: 'Feeling hot or cold for no reason',
	61: 'Feeling like you have a high temperature',
	62: 'Feeling like you have a low temperature',
	63: 'Alcohol intolerance',
	64: 'Sore throat',
	65: 'Tender / Sore lymph nodes',
	66: 'Fever',
	67: 'Flu-like symptoms',
	68: 'Some smells, foods, medication, or chemical make you feel sick',
	69: 'Heart beats quickly after standing',
	70: 'Blurred or tunnel vision after standing',
	71: 'Graying or blacking out after standing',
	72: 'Sensitivity to mold',
	73: 'Intolerance to extremes of temperature',
	74: 'Viral infections with prolonged recovery periods',
	75: 'Muscle fatigue after mild physical activity',
	76: 'Worsening of symptoms after mild physical activity',
	77: 'Worsening of symptoms after mild mental activity',
	78: 'Feeling disoriented',
	79: 'Slowed speech',
	80: 'Difficulty reading (dyslexia) after mild physical or mental activity',
	81: 'Aching of the eyes or behind the eyes',
	82: 'Sensitivity to pain',
	83: 'Pressure on parts of your body causes pain in other parts of your body',
	84: 'Daytime drowsiness',
	85: 'Sensitivity to vibration',
	86: 'Poor coordination',
	87: 'Sinus infections',
	88: 'Urinary urgency',
	89: 'Waking up at night because you need to urinate',
	90: 'Inability to tolerate an upright position',
	91: 'Fluctuations in temperature throughout the day',
};

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/** Questionnaire sections, in DSQ-2 order. Section titles are the site's own. */
export const SYMPTOM_SECTIONS: { title: string; items: number[] }[] = [
	{ title: 'Fatigue and effort', items: range(13, 18) },
	{ title: 'Sleep', items: range(19, 24) },
	{ title: 'Pain', items: range(25, 31) },
	{ title: 'Muscles and senses', items: range(32, 35) },
	{ title: 'Thinking and memory', items: range(36, 45) },
	{ title: 'Bladder, gut, breathing and heart', items: range(46, 52) },
	{ title: 'Weight, appetite and temperature', items: range(53, 63) },
	{ title: 'Infections and sensitivities', items: range(64, 68) },
	{ title: 'Standing, and more symptoms', items: range(69, 80) },
	{ title: 'More symptoms', items: range(81, 91) },
];

export const FREQ_OPTIONS = ['None of the time', 'A little of the time', 'About half the time', 'Most of the time', 'All of the time'];
export const SEV_OPTIONS = ['Symptom not present', 'Mild', 'Moderate', 'Severe', 'Very severe'];

export interface ChoiceQuestion {
	id: string;
	text: string;
	/** [official code, label] */
	options: [number, string][];
	/** Shown only when another question has one of these codes. */
	showIf?: { id: string; codes: number[] };
}

const notHaving = 'Not having a problem with fatigue / energy';

/** Q63a sits after Q63 in the DSQ-2. */
export const Q63A: ChoiceQuestion = {
	id: 'q63a',
	text: 'Over the last 6 months, did you avoid alcohol due to an alcohol intolerance (feeling sick after drinking alcohol)?',
	options: [[1, 'Yes'], [2, 'No, I drank alcohol'], [3, 'No, I do not drink alcohol for other reasons']],
};

/** Non-symptom DSQ-2 questions used by the case-definition rules. */
export const ILLNESS_QUESTIONS: ChoiceQuestion[] = [
	{ id: 'q92', text: 'Have you always had persistent or recurring fatigue / energy problems, even back to your earliest memories as a child? (By persistent or recurring, we mean that the fatigue / energy problems are usually ongoing and constant, but sometimes there are good periods and bad periods.)', options: [[1, 'Yes'], [0, 'No'], [2, notHaving]] },
	{ id: 'q93', text: 'Since your fatigue / energy related illness began, do your headaches either happen more often, feel worse or more severe, or are they in a different place or spot?', options: [[1, 'Yes'], [0, 'No'], [2, notHaving]] },
	{ id: 'q94', text: 'How long ago did your problem with fatigue / energy begin?', options: [[1, 'Less than 6 months'], [2, '6-12 months'], [3, '1-2 years'], [4, 'Longer than 2 years'], [5, 'Had problem with fatigue / energy since childhood or adolescence'], [6, notHaving]] },
	{ id: 'q106', text: 'Over what period of time did your fatigue / energy related illness develop?', options: [[1, 'Within 24 hours'], [2, 'Over 1 week'], [3, 'Over 1 month'], [4, 'Over 2-6 months'], [5, 'Over 7-12 months'], [6, 'Over 1-2 years'], [7, 'Over 3 or more years'], [8, 'I am not ill']] },
	{ id: 'q127', text: 'Since the onset of your problems with fatigue / energy, have your symptoms caused a 50% or greater reduction in your activity level?', options: [[1, 'Yes'], [0, 'No'], [2, notHaving]] },
	{ id: 'q128', text: 'Do you experience frequent viral infections with prolonged recovery periods?', options: [[1, 'Yes'], [0, 'No']] },
	{ id: 'q129', text: 'Are you intolerant of extremes of temperature (when it is extremely hot or cold)?', options: [[1, 'Yes'], [0, 'No']] },
];

/** Q119a and Q119d: hours per week in the past 4 weeks. */
export const HOURS_QUESTIONS = [
	{ id: 'q119a', text: 'Household related activities (hours per week)' },
	{ id: 'q119d', text: 'Work related activities (hours per week)' },
];
export const HOURS_STEM = 'In the past 4 weeks, approximately how many hours per week have you spent doing:';

/**
 * RAND 36-Item Health Survey items for the SF-36 role physical, social
 * functioning and vitality subscales. Answer value is the 1-based response
 * position, recoded in dsq-2.scoring.ts with RAND's key.
 */
export const RAND_ITEMS: { n: number; stem?: string; text: string; options: string[] }[] = [
	{ n: 13, stem: 'During the past 4 weeks, have you had any of the following problems with your work or other regular daily activities as a result of your physical health?', text: 'Cut down the amount of time you spent on work or other activities', options: ['Yes', 'No'] },
	{ n: 14, text: 'Accomplished less than you would like', options: ['Yes', 'No'] },
	{ n: 15, text: 'Were limited in the kind of work or other activities', options: ['Yes', 'No'] },
	{ n: 16, text: 'Had difficulty performing the work or other activities (for example, it took extra effort)', options: ['Yes', 'No'] },
	{ n: 20, text: 'During the past 4 weeks, to what extent has your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?', options: ['Not at all', 'Slightly', 'Moderately', 'Quite a bit', 'Extremely'] },
	{ n: 23, stem: 'How much of the time during the past 4 weeks:', text: 'Did you feel full of pep?', options: ['All of the time', 'Most of the time', 'A good bit of the time', 'Some of the time', 'A little of the time', 'None of the time'] },
	{ n: 27, text: 'Did you have a lot of energy?', options: ['All of the time', 'Most of the time', 'A good bit of the time', 'Some of the time', 'A little of the time', 'None of the time'] },
	{ n: 29, text: 'Did you feel worn out?', options: ['All of the time', 'Most of the time', 'A good bit of the time', 'Some of the time', 'A little of the time', 'None of the time'] },
	{ n: 31, text: 'Did you feel tired?', options: ['All of the time', 'Most of the time', 'A good bit of the time', 'Some of the time', 'A little of the time', 'None of the time'] },
	{ n: 32, text: 'During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (like visiting with friends, relatives, etc.)?', options: ['All of the time', 'Most of the time', 'Some of the time', 'A little of the time', 'None of the time'] },
];

/**
 * The eight symptom factors from Bedree, Sunnquist & Jason (2019), Table 5,
 * by DSQ-2 question number. Used only for this site's domain summary.
 */
export const FACTOR_DOMAINS: { key: string; name: string; items: number[] }[] = [
	{ key: 'pem', name: 'Post-exertional malaise', items: [13, 14, 15, 17, 18, 19, 75, 76] },
	{ key: 'cognitive', name: 'Cognitive impairment', items: [16, 36, 37, 38, 39, 40, 44, 45, 79] },
	{ key: 'feverflu', name: 'Fever and flu', items: [61, 66, 67, 74, 91] },
	{ key: 'pain', name: 'Pain', items: [25, 29, 30, 47] },
	{ key: 'sleep', name: 'Sleep disruption', items: [21, 22, 23] },
	{ key: 'orthostatic', name: 'Orthostatic intolerance', items: [51, 69, 70, 71] },
	{ key: 'genitourinary', name: 'Genitourinary', items: [46, 88, 89] },
	{ key: 'temperature', name: 'Temperature intolerance', items: [58, 59, 62] },
];
