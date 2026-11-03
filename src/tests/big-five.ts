// Content for /tests/big-five/: the IPIP-NEO-120, five domains and thirty
// facets. Copy only; the items, keys and norms are in the data file.
import type { TestContent } from './content';

export const bigFive: TestContent = {
	instrument: 'ipip-neo-120',
	path: '/tests/big-five/',
	title: 'Big Five personality test: 120 items, 30 facets, free',
	description: 'The free 120-item Big Five test with thirty facets, scored on your device in about twelve minutes, with percentiles against a sample of 410,000 people.',
	question: 'The Big Five, with the facets',
	subtitle: 'IPIP-NEO-120, 120 items, 12 minutes',
	breadcrumb: 'Big Five',
	normsGroup: 'all',
	scales: {
		N: {
			means: {
				low: 'You tend to stay calm and recover from setbacks faster than most people do.',
				mid: 'Negative feelings arise for you about as readily as for most people.',
				high: 'You tend to feel worry, irritation and low mood more readily than most people do.',
			},
			high: 'People high on neuroticism say they worry about things, get irritated easily, often feel blue, are self-conscious around others, find cravings hard to resist and feel overwhelmed under pressure. In daily life that shows as careful planning for what might go wrong, sensitivity to criticism, moods that others can read, and a slow recovery after a bad day. The six facets below show which of those tendencies is strongest for you. It describes how readily feelings arise, not whether anything is wrong, and it is not a diagnosis.',
			low: 'People low on neuroticism say they are not easily annoyed, feel comfortable with themselves, are not bothered by difficult social situations, resist temptations easily and remain calm under pressure. In daily life that shows as being the steady one in a crisis, not dwelling on what went wrong, and sleeping soundly. It does not mean feeling nothing: low scorers have the full range of emotions and return to baseline faster.',
			traitPath: '/traits/neuroticism/',
		},
		E: {
			means: {
				low: 'You tend to keep to yourself and find quiet company easier than a crowd.',
				mid: 'You are about as outgoing as most people: sociable in some settings, reserved in others.',
				high: 'You tend to seek company, activity and excitement more than most people do.',
			},
			high: 'People high on extraversion say they make friends easily, love large parties, take charge, are always on the go, seek adventure and radiate joy. In daily life that shows as a wide circle, a liking for doing things with others, speaking before thinking, and energy that rises in a busy room. The facets separate warmth, sociability, assertiveness, pace, thrill-seeking and cheerfulness, which do not always go together.',
			low: 'People low on extraversion say they prefer to be alone, avoid crowds, wait for others to lead, like to take it easy and keep others at a distance. In daily life that shows as a small circle of close friends, time alone to recover from social effort, careful speech, and no wish for attention. Introversion is the low end of this scale, not a type, and it is not shyness.',
			traitPath: '/traits/extraversion/',
		},
		O: {
			means: {
				low: 'You tend to prefer the practical and the familiar to ideas and novelty more than most people do.',
				mid: 'You are about as drawn to ideas, art and new experiences as most people.',
				high: 'You tend to seek ideas, art, feelings and new experiences more than most people do.',
			},
			high: 'People high on openness say they have a vivid imagination, believe in the importance of art, experience their emotions intensely, prefer variety to routine, love to read challenging material and question convention. In daily life that shows as a wide range of interests, boredom with repetition and a readiness to try the unfamiliar. The scale measures appetite for ideas and experience, not intelligence.',
			low: 'People low on openness say they prefer to stick with what they know, dislike changes, avoid philosophical discussions and have little interest in art museums or poetry. In daily life that shows as settled habits, practical judgement, a liking for clear rules and familiar places, and impatience with speculation. Practical people solve problems every day; they just do not describe themselves as dreamers.',
			traitPath: '/traits/openness/',
		},
		A: {
			means: {
				low: 'You tend to put your own view first and give less weight to other people\'s feelings than most people do.',
				mid: 'You are about as warm and accommodating as most people.',
				high: 'You tend to trust, help and put others first more than most people do.',
			},
			high: 'People high on agreeableness say they trust others, do not use people, love to help, avoid fights, do not think highly of themselves and feel for those worse off. In daily life that shows as being the one others confide in, giving way in arguments, finding it hard to refuse, and assuming good intentions until proved otherwise. It is not a measure of being liked or of being good.',
			low: 'People low on agreeableness say they distrust people, are indifferent to others\' feelings, love a good fight, think highly of themselves and use others for their own ends. In daily life that shows as blunt feedback, hard negotiation, scepticism of motives and comfort with conflict. It is not unkindness: low scorers are often loyal, fair and honest.',
			traitPath: '/traits/agreeableness/',
		},
		C: {
			means: {
				low: 'You tend to take things as they come and are less drawn to plans, order and persistence than most people.',
				mid: 'You are about as organised and persistent as most people.',
				high: 'You tend to plan, persist, keep order and think before acting more than most people do.',
			},
			high: 'People high on conscientiousness say they complete tasks successfully, like to tidy up, keep their promises, work hard, carry out their plans and avoid rash decisions. In daily life that shows as punctuality, lists, tidy spaces, a steady pace and a reputation for reliability. The costs are a difficulty relaxing, delegating or improvising.',
			low: 'People low on conscientiousness say they leave a mess, break rules, waste time, do just enough to get by and jump into things without thinking. In daily life that shows as flexibility, spontaneity, last-minute finishes and a tolerance for clutter. The scale measures how people organise their effort, not talent or how good the result is.',
			traitPath: '/traits/conscientiousness/',
		},
	},
	testRetest: 'No test-retest figure is given on the IPIP key page for the IPIP-NEO-120. Johnson (2014) reports the facet alphas shown here from an internet sample of 619,150 people. Personality scores are fairly stable over weeks and months; a change of a few points between attempts is usual.',
	related: [
		{ href: '/tests/big-five/short/', title: 'The Big Five in five minutes', note: 'The 50-item markers, for people in a hurry.' },
		{ href: '/traits/', title: 'The five traits explained', note: 'One page per trait, with the facets.' },
		{ href: '/tests/', title: 'All tests', note: 'Grouped by what you want to know.' },
	],
	faqs: [
		{ q: 'What is the difference between this and the short Big Five test?', a: 'This one has 120 items and scores thirty facets, six under each of the five domains, so it can tell you which parts of a trait are high or low for you. The short test has fifty items and scores only the five domains. Both are public-domain IPIP instruments.' },
		{ q: 'Is the IPIP-NEO-120 the same as the NEO PI-R?', a: 'No. The IPIP-NEO-120 is a public-domain inventory built to measure constructs similar to the thirty facets of a well-known commercial inventory, using items from the International Personality Item Pool. The items, the norms and the scoring are its own, and anyone may use it for any purpose.' },
		{ q: 'Who am I being compared with?', a: 'With 410,376 people who completed the inventory online, after rows with any missing answer were removed from the public dataset the test\'s author released. The site also holds counts by age band and for the United Kingdom, from the same dataset.' },
		{ q: 'How long does it take?', a: 'About twelve minutes: 120 statements, each rated on a five-point scale, ten to a screen. Your answers are saved on your device as you go, so you can stop and carry on later.' },
		{ q: 'What is a facet?', a: 'A narrower trait inside a broad one. Extraversion, for example, is made of friendliness, gregariousness, assertiveness, activity level, excitement-seeking and cheerfulness, and two people with the same extraversion score can differ a lot on those six.' },
		{ q: 'Where do my answers go?', a: 'Nowhere. The test is scored in your browser and the result is kept only on this device. If you choose to share a link, your scores are inside the link itself and nothing is sent to this site.' },
	],
};
