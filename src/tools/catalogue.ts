// The site's tool catalogue, shared by the home page and the tools index so
// the two never drift. Grouped by what the tools measure, which is how a
// visitor arrives: with a symptom, not an instrument name.

export type ToolKind = 'questionnaire' | 'checker' | 'guide' | 'tracker' | 'sheet';

export interface Tool {
	/** Full name, used on the tools index. */
	title: string;
	/** Short name for inline lists on the home page. */
	short: string;
	href: string;
	kind: ToolKind;
	/** One or two sentences for the tools index. */
	description: string;
}

export interface ToolGroup {
	name: string;
	tools: Tool[];
}

export const KIND_LABEL: Record<ToolKind, string> = {
	questionnaire: 'Questionnaire',
	checker: 'Criteria checker',
	guide: 'Interactive guide',
	tracker: 'Browser tracker',
	sheet: 'Google Sheet',
};

export const QUESTIONNAIRE_GROUPS: ToolGroup[] = [
	{
		name: 'ME/CFS, fatigue and post-exertional malaise',
		tools: [
			{ title: 'ME/CFS screening (DSQ-Brief)', short: 'DSQ-Brief', href: '/tools/dsq-brief/', kind: 'questionnaire', description: 'A 4-question self-check for ME/CFS based on the DePaul Symptom Questionnaire Brief. Asks about fatigue, tiredness after minimal exercise, unrefreshing sleep and memory problems, in under two minutes, with an immediate result.' },
			{ title: 'DePaul Symptom Questionnaire (DSQ-2)', short: 'DSQ-2', href: '/tools/dsq-2/', kind: 'questionnaire', description: "All 79 DSQ-2 symptom questions, checked against four ME/CFS case definitions (IOM, CCC, ME-ICC, Fukuda) with DePaul's published rules, plus a symptom profile. About 100 answers; progress is saved." },
			{ title: 'Post-exertional malaise (DSQ-PEM)', short: 'DSQ-PEM', href: '/tools/dsq-pem/', kind: 'questionnaire', description: 'The DePaul PEM short form: 10 questions characterising whether your post-activity symptom pattern looks like post-exertional malaise, with recovery time and triggers assessed.' },
			{ title: 'Chalder Fatigue Scale (CFQ-11)', short: 'Chalder Fatigue Scale', href: '/tools/chalder-fatigue-scale/', kind: 'questionnaire', description: 'The 11-item fatigue questionnaire used across UK ME/CFS and long COVID services. Get your Likert score (0–33) with physical and mental subscales, plus the bimodal score (0–11) and its ≥4 threshold.' },
			{ title: 'Fatigue Severity Scale (FSS)', short: 'Fatigue Severity Scale', href: '/tools/fss/', kind: 'questionnaire', description: '9-item fatigue questionnaire widely used in post-viral and chronic illness research. Simple and quick to complete.' },
		],
	},
	{
		name: 'Function and daily life',
		tools: [
			{ title: 'FUNCAP functional capacity questionnaire', short: 'FUNCAP', href: '/tools/funcap/', kind: 'questionnaire', description: 'The patient-informed ME/CFS functional capacity instrument (FUNCAP27): 27 activities across 8 domains, scored by what each activity costs you. Includes a domain profile.' },
			{ title: 'Post-COVID-19 Functional Status scale (PCFS)', short: 'PCFS', href: '/tools/pcfs/', kind: 'questionnaire', description: 'The standard long COVID functional grading: four quick questions give you a grade from 0 (no limitations) to 4 (severe limitations). Takes under a minute; designed for repeat tracking.' },
			{ title: 'Bell score (Bell CFIDS Disability Scale)', short: 'Bell score', href: '/tools/bell-scale/', kind: 'questionnaire', description: 'Functional capacity score from 0 to 100, widely referenced in ME/CFS and post-viral communities. Quick self-check for functional status.' },
			{ title: 'RAND-36 health survey (SF-36 items)', short: 'RAND-36', href: '/tools/rand-36/', kind: 'questionnaire', description: 'The classic 36-item health-related quality of life survey, scored across eight scales. Compare your profile against published ME/CFS and long COVID cohorts.' },
		],
	},
	{
		name: 'Dysautonomia and POTS',
		tools: [
			{ title: 'COMPASS-31', short: 'COMPASS-31', href: '/tools/compass-31/', kind: 'questionnaire', description: 'Composite Autonomic Symptom Score: 31-item autonomic symptom questionnaire covering six domains. The standard screening tool for dysautonomia symptoms.' },
			{ title: 'Malmö POTS Symptom Score (MAPS)', short: 'Malmö POTS Score', href: '/tools/malmo-pots-score/', kind: 'questionnaire', description: 'The first symptom score designed specifically for POTS: 12 symptoms from the past week rated 0–10, with the validated ≥42 threshold explained. Well suited to weekly tracking.' },
			{ title: 'Vanderbilt Orthostatic Symptom Score (VOSS)', short: 'VOSS', href: '/tools/vanderbilt-orthostatic-symptom-score/', kind: 'questionnaire', description: 'Nine symptoms rated 0–10 while upright, as used in POTS drug and compression trials. A snapshot of orthostatic symptom burden that pairs with the NASA lean test.' },
			{ title: 'Orthostatic Grading Scale (OGS)', short: 'Orthostatic Grading Scale', href: '/tools/orthostatic-grading-scale/', kind: 'questionnaire', description: 'The Mayo Clinic five-item grading of orthostatic intolerance: frequency, severity, triggers, daily activities, and standing time, scored 0–20 with mild, moderate, and severe bands.' },
			{ title: 'NASA Lean Test guide', short: 'NASA lean test', href: '/tools/nasa-lean-test/', kind: 'guide', description: "Interactive guide and timer for performing a poor man's tilt table test at home, with fields to log your HR readings at each stage." },
		],
	},
	{
		name: 'Breathing',
		tools: [
			{ title: 'Nijmegen Questionnaire', short: 'Nijmegen', href: '/tools/nijmegen/', kind: 'questionnaire', description: '16-item breathing pattern disorder screening tool. Used to identify hyperventilation syndrome and disordered breathing patterns.' },
			{ title: 'Self-Evaluation of Breathing Questionnaire (SEBQ)', short: 'SEBQ', href: '/tools/self-evaluation-of-breathing-questionnaire/', kind: 'questionnaire', description: '25 statements about how your breathing feels, scored out of 75. The breathing-specific companion to the Nijmegen questionnaire, better suited to restricted or effortful breathing patterns.' },
		],
	},
	{
		name: 'Brain fog and pain',
		tools: [
			{ title: 'Cognitive Failures Questionnaire (CFQ)', short: 'Cognitive Failures Questionnaire', href: '/tools/cognitive-failures-questionnaire/', kind: 'questionnaire', description: "Broadbent's 25-item measure of everyday memory, attention, and action slips: the standard brain fog questionnaire. Scored out of 100 with three subscales and reference values from long COVID and ME/CFS cohorts." },
			{ title: '2016 ACR Fibromyalgia Survey', short: 'Fibromyalgia survey', href: '/tools/fibromyalgia-survey/', kind: 'questionnaire', description: 'Self-report fibromyalgia screening questionnaire with Widespread Pain Index, Symptom Severity Scale, and FS severity score. Based on the 2016 revised ACR criteria.' },
		],
	},
	{
		name: 'Hypermobility',
		tools: [
			{ title: 'Beighton Score', short: 'Beighton score', href: '/tools/beighton-score/', kind: 'questionnaire', description: '9-point self-assessment for generalised joint hypermobility, with an illustration for each manoeuvre and the age-adjusted threshold explained. One component of the 2017 hypermobile EDS criteria.' },
			{ title: 'Five-part questionnaire for hypermobility (5PQ)', short: '5PQ', href: '/tools/five-part-questionnaire/', kind: 'questionnaire', description: 'Five yes/no questions that screen for generalised joint hypermobility, including hypermobility you used to have. Two or more "yes" answers is positive; used in the 2017 hEDS criteria when the Beighton score is one point short.' },
			{ title: 'hEDS diagnostic criteria checker (2017)', short: 'hEDS criteria checker', href: '/tools/heds-criteria/', kind: 'checker', description: 'Walk through the three criteria for hypermobile Ehlers-Danlos syndrome step by step: Beighton and 5PQ, the 12 Feature A signs, family history, musculoskeletal features, and the exclusions only a clinician can confirm.' },
		],
	},
	{
		name: 'Wellbeing',
		tools: [
			{ title: 'WHO-5 Well-Being Index', short: 'WHO-5', href: '/tools/who-5/', kind: 'questionnaire', description: 'Five positively-worded questions about the past two weeks, scored 0–100. A light-touch well-being measure that pairs well with symptom and function tracking.' },
			{ title: 'Satisfaction with Life Scale (SWLS)', short: 'Satisfaction with Life Scale', href: '/tools/satisfaction-with-life-scale/', kind: 'questionnaire', description: "Diener's five-statement measure of how satisfied you are with your life as a whole, scored 5 to 35 with the standard bands. Under a minute; a stable companion to the WHO-5." },
			{ title: 'Brief Resilience Scale (BRS)', short: 'Brief Resilience Scale', href: '/tools/brief-resilience-scale/', kind: 'questionnaire', description: 'Six statements about how quickly you bounce back from stress, scored 1 to 5 with low, normal and high bands. Measures recovery itself, not coping resources; illness lowers it, and it moves as things change.' },
			{ title: 'AUDIT alcohol screening test', short: 'AUDIT', href: '/tools/audit/', kind: 'questionnaire', description: "The WHO's ten-question alcohol screen, scored 0 to 40 with the risk zones and a consumption, dependence and harm breakdown. Relevant to sleep, HRV and orthostatic symptoms, and before starting medication." },
		],
	},
	{
		name: 'Activity, pacing and exercise',
		tools: [
			{ title: 'Exercise readiness screen', short: 'Exercise readiness screen', href: '/tools/exercise-readiness/', kind: 'guide', description: 'Three quick checks before starting any movement plan: red flags, post-exertional malaise, and relevant comorbidities. Routes you to the page that fits your situation.' },
			{ title: 'Pacing and heart rate ceiling', short: 'Pacing and heart rate ceiling', href: '/tools/pacing-and-heart-rate/', kind: 'guide', description: 'The energy envelope in plain language, a resting-heart-rate-based ceiling with the arithmetic shown, counter-pressure manoeuvres, and a private session log.' },
			{ title: 'Exercise progression for orthostatic intolerance', short: 'Exercise progression', href: '/tools/exercise-progression/', kind: 'guide', description: "A hold-by-default record keeper informed by the CHOP modified Dallas programme and Levine's protocol. You pick the tier; it keeps the record and asks how you were 48 hours later." },
			{ title: 'IPAQ short form', short: 'IPAQ', href: '/tools/ipaq-short-form/', kind: 'questionnaire', description: 'The International Physical Activity Questionnaire: days and minutes of vigorous activity, moderate activity and walking over the last 7 days, plus sitting time. Gives MET-minutes per week and a category. A record, not a target.' },
			{ title: 'Godin-Shephard Leisure-Time Exercise Questionnaire', short: 'Godin-Shephard', href: '/tools/godin-shephard-leisure-time-exercise-questionnaire/', kind: 'questionnaire', description: "Three questions on weekly strenuous, moderate and mild exercise, giving a Leisure Score Index with Godin's 2011 bands. One minute; useful for recording what you actually did week to week." },
		],
	},
];

export const TRACKERS: Tool[] = [
	{ title: 'HRV and resting heart rate tracker', short: 'HRV and resting heart rate', href: '/tools/trackers/hrv-tracker/', kind: 'tracker', description: 'Log daily readings in your browser, or import a CSV from Garmin, Oura, Whoop or a spreadsheet. Rolling 7-day and 30-day medians with trend charts. Stored on your device only.' },
	{ title: 'Symptom diary', short: 'Symptom diary', href: '/tools/trackers/symptom-diary/', kind: 'sheet', description: 'Daily scores for fatigue, breathlessness, head pain, and cognitive function with rolling averages. Useful for identifying patterns and tracking trends.' },
	{ title: 'Stand test logger', short: 'Stand test logger', href: '/tools/trackers/stand-test-logger/', kind: 'sheet', description: 'Record and track orthostatic heart rate responses over time. Log HR at baseline, 2 min, 5 min, and 10 min standing.' },
];

export const GUIDE: Tool = {
	title: 'Which questionnaire should I take?',
	short: 'Which questionnaire should I take?',
	href: '/tools/which-questionnaire/',
	kind: 'guide',
	description: 'Not sure where to start? A plain-language guide to choosing the right post-viral self-assessment tool for your situation.',
};

export const ALL_TOOLS: Tool[] = [...QUESTIONNAIRE_GROUPS.flatMap((g) => g.tools), ...TRACKERS, GUIDE];
