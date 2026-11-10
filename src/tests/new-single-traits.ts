// Single-scale tests added from docs/briefs/new-tests.md: empathy (T2),
// leadership (T5), optimism (T6), need for cognition and self-monitoring
// (T7). Items, keys and alphas are in the instrument files; this is copy.
import { singleTrait } from './single-trait';

const keyAlpha = (a: string, page: string) => `The IPIP ${page} gives coefficient alpha of ${a} for this scale and no test-retest figure. Personality scores are fairly stable over weeks; a change of a few points between attempts is usual.`;
const escsAlpha = (a: string) => `The IPIP gives coefficient alpha of ${a} for this scale, from the Eugene-Springfield Community Sample of adults, which took both this scale and the original it was built to match. There is no test-retest figure. Scores are fairly stable over weeks; a change of a few points between attempts is usual.`;

const COURSEWORK = (paper: string) => ({
	q: 'Can I use this in coursework?',
	a: `Yes. The statements are public domain, so they can be reproduced in a project or a study without asking. Cite the International Personality Item Pool and the original paper, ${paper}. The page for students, teachers and researchers has a printable copy with the scoring key.`,
});

export const empathy = singleTrait({
	instrument: 'ipip-empathy',
	slug: 'empathy',
	minutes: 2,
	title: "Empathy test: how strongly do you feel others' emotions?",
	description: "Ten public-domain statements on how strongly other people's feelings affect you. A free empathy test, scored on your device in two minutes.",
	question: 'Empathy test',
	subtitle: 'Emotional empathy: IPIP empathy scale, 10 items, 2 minutes',
	breadcrumb: 'Empathy',
	traitPath: '/traits/sympathy/',
	traitTitle: 'Sympathy',
	scale: {
		name: 'Empathy',
		means: {
			low: 'Other people\'s feelings tend to register with you without moving you much.',
			mid: 'Other people\'s feelings move you in some situations and not in others.',
			high: 'You tend to feel other people\'s emotions strongly, and are easily moved.',
		},
		high: 'People who score high say they feel others\' emotions, suffer from others\' sorrows and are deeply moved by others\' misfortunes. They are easily moved to tears and experience their own emotions intensely. In daily life that shows as being shaken by a sad story in the news, feeling a friend\'s disappointment almost as their own, and crying at films. It describes how strongly feelings reach you, not how well you read them or what you do next.',
		low: 'People who score low say they seldom get emotional and find it hard to understand people who do. In daily life that shows as staying steady when others are upset, judging a situation on its facts, and being the calm person in a crisis. It is not coldness or unkindness: many low scorers help others readily, they are simply less swept up in the feeling while they do it. The scale measures emotional reaction, not care.',
	},
	statements: {
		1: 'Whether other people\'s moods and feelings tend to pass to you, so that you feel something of what they feel.',
		2: 'Whether other people\'s sadness and grief affect you, so that you feel low when someone close to you is.',
		3: 'Whether hearing of someone else\'s bad luck or hardship stirs strong feeling in you, even when it does not touch your life.',
		4: 'Whether emotional moments, your own or other people\'s, bring you close to tears without much prompting.',
		5: 'Whether you cry readily, at films, sad news or other people\'s troubles, rather than rarely.',
		6: 'Whether your own emotions run strong, so that joy, sadness and anger are felt with force.',
		7: 'Whether you feel a deep sense of connection with other people, beyond simply knowing or liking them.',
		8: 'Whether you find it hard to relate to people who show strong emotion, or are puzzled by it.',
		9: 'Whether other people\'s difficulties hold little interest for you, so that you would rather not hear about them.',
		10: 'Whether you rarely feel strongly moved, staying even in situations that stir other people.',
	},
	seeAlso: [{ before: 'Empathy here is emotional: it measures how strongly other people\'s feelings move you, not how well you can work out what they think. Handling emotions well is measured by the ', label: 'emotional intelligence test', href: '/tests/emotional-intelligence/', after: '.' }],
	testRetest: keyAlpha('.80', 'scoring key page for scales similar to the JPI-R'),
	related: [
		{ href: '/tests/emotional-intelligence/', title: 'How do I handle emotions?', note: 'Seven parts of trait emotional intelligence.' },
		{ href: '/traits/sympathy/', title: 'Sympathy', note: 'The agreeableness facet about caring for people in need.' },
		{ href: '/guides/trait-vs-ability-emotional-intelligence/', title: 'Trait vs ability emotional intelligence', note: 'Two ways of measuring emotional skill.' },
	],
	faqs: [
		{ q: 'Is empathy the same as sympathy?', a: 'No. Empathy, as measured here, is feeling something of what another person feels. Sympathy is caring about someone\'s situation and wanting to help, which is a facet of agreeableness. The two often go together, but a person can feel little of another\'s pain and still help them, or feel it strongly and do nothing.' },
		{ q: 'Does this measure emotional or cognitive empathy?', a: 'Emotional. Every statement is about being moved by other people\'s feelings or feeling your own strongly. Cognitive empathy, working out what someone else thinks or feels, is a different skill and is not measured here.' },
	],
});

export const leadership = singleTrait({
	instrument: 'ipip-leadership',
	slug: 'leadership',
	minutes: 2,
	title: 'Am I a leader? A free leadership test',
	description: 'Public-domain statements on how readily you take charge, organise people and encourage a group. Scored on your device in about two minutes.',
	question: 'Am I a leader?',
	subtitle: 'IPIP leadership scale, 7 items, 2 minutes',
	breadcrumb: 'Leadership',
	traitPath: '/traits/assertiveness/',
	traitTitle: 'Assertiveness',
	scale: {
		name: 'Leadership',
		means: {
			low: 'You tend not to take charge of a group, and prefer others to organise it.',
			mid: 'You lead a group in some settings and leave it to others in others.',
			high: 'You tend to bring a group together, include everyone and keep it working well.',
		},
		high: 'People who score high say they make sure everyone in a group feels included, are good at helping people work well together and are told they are strong but fair leaders. In daily life that shows as organising the trip, the rota or the project, noticing who has been left out, and keeping a team pulling the same way. It describes a readiness to lead a group as a character strength, not a style of leadership or a guarantee of being good at it.',
		low: 'People who score low say they find it hard to get others to work together, are not good at taking charge of a group and are not good at planning group activities. In daily life that shows as preferring to contribute rather than coordinate, and to be one voice among several. It is not a lack of ability or influence: many low scorers do excellent work in teams and lead in quieter ways, through expertise rather than position.',
	},
	statements: {
		1: 'Whether you make an effort to bring everyone in a group into what is happening, so that no one is left on the edge.',
		2: 'Whether you are good at getting people to cooperate and work smoothly as a team.',
		3: 'Whether other people have described you as a leader who is firm but treats everyone fairly.',
		4: 'Whether you care about how the people in a group you lead are feeling, and try to keep them content.',
		5: 'Whether you find it hard to get a group of people to cooperate with one another.',
		6: 'Whether taking charge of a group and directing it is something you find you are not good at.',
		7: 'Whether planning and organising things for a group to do is something you struggle with.',
	},
	seeAlso: [{ before: 'Leadership is also one of the 24 strengths in the ', label: 'character strengths test', href: '/tests/character-strengths/', after: ', with four statements; this test is a longer, more reliable measure of the same strength.' }],
	testRetest: keyAlpha('.78', 'scoring key page for the VIA strengths') + ' The scale has seven statements; the key page lists three more as left out.',
	related: [
		{ href: '/tests/character-strengths/', title: 'What are my character strengths?', note: 'All 24 strengths, leadership among them.' },
		{ href: '/tests/assertiveness/', title: 'How assertive am I?', note: 'Taking charge and speaking up, a facet of extraversion.' },
		{ href: '/guides/jobs-for-introverts/', title: 'Jobs for introverts', note: 'Interests and extraversion together.' },
	],
	faqs: [
		{ q: 'Does this tell me my leadership style?', a: 'No. It measures one tendency: how readily you take on bringing a group together and leading it fairly. It does not sort people into styles such as democratic or directive, and it says nothing about how effective a leader you would be in a particular job.' },
		{ q: 'Do extraverts make better leaders?', a: 'Extraverts are more likely to end up leading. A review of the research found extraversion was the trait most closely related to leadership, more to who emerges as a leader in a group than to who leads well (Judge and colleagues, 2002). Many effective leaders are introverts.' },
	],
});

export const optimism = singleTrait({
	instrument: 'ipip-optimism',
	slug: 'optimism',
	minutes: 2,
	title: 'Optimism test: are you an optimist or a pessimist?',
	description: 'Public-domain statements on how much you expect things to turn out well. A free optimism test, scored on your device in about two minutes.',
	question: 'Optimism test',
	subtitle: 'IPIP optimism scale, 10 items, 2 minutes',
	breadcrumb: 'Optimism',
	traitPath: '/traits/cheerfulness/',
	traitTitle: 'Cheerfulness',
	scale: {
		name: 'Optimism',
		means: {
			low: 'You tend to expect difficulties and keep your hopes in check.',
			mid: 'You expect good outcomes in some areas of life and are more guarded in others.',
			high: 'You tend to expect things to turn out well and look on the bright side.',
		},
		high: 'People who score high say they just know they will be a success, look at the bright side of life, feel comfortable with themselves and seldom feel blue. In daily life that shows as starting things expecting them to work, reading setbacks as temporary, and talking about the future with confidence. Dispositional optimism is a general expectation that things will go well; it is not a promise that they will, and high scorers are not immune to disappointment.',
		low: 'People who score low say they see difficulties everywhere, have a dark outlook on the future and feel that their life lacks direction. In daily life that shows as planning for what could go wrong, keeping expectations modest and being hard to impress with promises. A low score means more cautious expectations, nothing more: careful forecasters can be valuable, and expecting little is not the same as giving up.',
	},
	statements: {
		1: 'Whether you feel sure, without needing proof, that you will do well in the things you set out to do.',
		2: 'Whether you are at ease with the person you are, rather than uneasy or at odds with yourself.',
		3: 'Whether low or downcast spells are rare for you, rather than a regular part of your weeks.',
		4: 'Whether you tend to notice what is good in a situation and expect the best, even when things are mixed.',
		5: 'Whether you expect the future to bring more bad than good when you think about what lies ahead.',
		6: 'Whether you feel unsure where your life is heading, without a clear sense of purpose or aim.',
		7: 'Whether you think poorly of yourself and are unhappy with the person you are.',
		8: 'Whether you feel low or downcast often, rather than only now and then.',
		9: 'Whether obstacles and problems are what you notice first, in plans, situations and other people.',
		10: 'Whether you are frequently irritable or out of sorts, rather than in an even or good mood.',
	},
	seeAlso: [{ before: 'Hope, the character strength closest to optimism, is also one of the 24 in the ', label: 'character strengths test', href: '/tests/character-strengths/', after: '.' }],
	testRetest: keyAlpha('.86', 'single-construct scoring key page') + ' Several statements are about mood and how you feel about yourself rather than about the future, so the score also reflects how you have been feeling lately.',
	related: [
		{ href: '/traits/cheerfulness/', title: 'Cheerfulness', note: 'The extraversion facet about positive mood.' },
		{ href: '/tests/character-strengths/', title: 'What are my character strengths?', note: 'Hope is one of the 24.' },
		{ href: '/guides/the-24-character-strengths-explained/', title: 'The 24 character strengths explained', note: 'Where hope sits among them.' },
	],
	faqs: [
		{ q: 'Is optimism the same as cheerfulness?', a: 'No, though they overlap. Cheerfulness is about mood now: how often you feel joy and enthusiasm. Optimism is about expectation: how much you expect the future to turn out well. A person can be serious in mood and still expect good outcomes, or bubbly and still brace for the worst.' },
		{ q: 'Is optimism a personality trait?', a: 'Yes, in the sense research uses. Dispositional optimism is a fairly stable general expectation that good things will happen, measured by scales such as the one this test is built to match (Scheier, Carver and Bridges, 1994). It overlaps with low neuroticism, which is why some of the statements here are about mood.' },
	],
});

export const needForCognition = singleTrait({
	instrument: 'ipip-need-for-cognition',
	slug: 'need-for-cognition',
	minutes: 2,
	title: 'Need for cognition test: do you enjoy thinking hard?',
	description: 'Ten public-domain statements on how much you enjoy effortful thinking: puzzles, ideas and challenging reading. Free, scored on your device in two minutes.',
	question: 'Need for cognition test',
	subtitle: 'IPIP need for cognition scale, 10 items, 2 minutes',
	breadcrumb: 'Need for cognition',
	traitPath: '/traits/intellect/',
	traitTitle: 'Intellect',
	scale: {
		name: 'Need for cognition',
		means: {
			low: 'You tend to prefer things simple and avoid hard thinking when you can.',
			mid: 'You enjoy some kinds of hard thinking and avoid others.',
			high: 'You tend to enjoy hard thinking, complex problems and challenging ideas.',
		},
		high: 'People who score high say they like solving complex problems, love reading challenging material and enjoy thinking up new ways of doing things. In daily life that shows as choosing the harder puzzle, reading the long article, and turning an idea over long after the conversation has ended. Need for cognition is about enjoying effortful thinking, not about being good at it, though the two often go together.',
		low: 'People who score low say they avoid difficult reading and philosophical discussions and have difficulty with abstract ideas. In daily life that shows as preferring practical answers, getting to the point and saving effort for what matters to them. It is not a lack of intelligence: many low scorers think carefully when they need to, they simply do not seek out thinking for its own sake.',
	},
	statements: {
		1: 'Whether you enjoy problems that have many parts and no obvious answer, rather than finding them a chore.',
		2: 'Whether you usually follow an explanation the first time, without needing it repeated.',
		3: 'Whether you are comfortable taking in a large amount of detail and facts at once.',
		4: 'Whether you enjoy coming up with fresh approaches to tasks, rather than sticking with the usual way.',
		5: 'Whether you tend to grasp new ideas and situations quickly.',
		6: 'Whether you enjoy reading things that make you work hard to follow them.',
		7: 'Whether ideas that are general or theoretical, rather than concrete, are hard for you to follow.',
		8: 'Whether you steer clear of people who are hard to understand or who make conversations complicated.',
		9: 'Whether you put down books and articles that demand a lot of effort to follow.',
		10: 'Whether you stay out of conversations about big questions such as meaning, truth or right and wrong.',
	},
	testRetest: escsAlpha('.84'),
	related: [
		{ href: '/traits/intellect/', title: 'Intellect', note: 'The openness facet about enjoying ideas.' },
		{ href: '/traits/openness/', title: 'Openness to experience', note: 'The broad trait it sits closest to.' },
		{ href: '/for-teachers-and-researchers/', title: 'For teachers and researchers', note: 'Printable instruments, scoring keys and licences.' },
	],
	faqs: [
		{ q: 'Is need for cognition the same as intelligence?', a: 'No. It measures how much you enjoy and seek out effortful thinking, not how well you think. The two are related, and people who enjoy thinking get more practice at it, but a very able person can dislike hard thinking and a person who loves it can find it difficult.' },
		{ q: 'How does it relate to openness?', a: 'Closely. Need for cognition overlaps most with the intellect side of openness to experience: enjoying ideas, puzzles and abstract thought. It is narrower than openness as a whole, which also covers art, feelings and imagination.' },
		COURSEWORK('Cacioppo, J. T., & Petty, R. E. (1982). The need for cognition. Journal of Personality and Social Psychology, 42(1), 116-131'),
	],
});

export const selfMonitoring = singleTrait({
	instrument: 'ipip-self-monitoring',
	slug: 'self-monitoring',
	minutes: 2,
	title: 'Self-monitoring test: how much do you adapt to the room?',
	description: 'Ten public-domain statements on how much you watch and adjust the way you come across to suit the situation. Free, scored on your device in two minutes.',
	question: 'Self-monitoring test',
	subtitle: 'IPIP self-monitoring scale, 10 items, 2 minutes',
	breadcrumb: 'Self-monitoring',
	traitPath: '/traits/extraversion/',
	traitTitle: 'Extraversion',
	scale: {
		name: 'Self-monitoring',
		means: {
			low: 'You tend to come across the same way whoever you are with.',
			mid: 'You adjust how you come across in some settings and not in others.',
			high: 'You tend to read the room and adjust how you come across to suit it.',
		},
		high: 'People who score high say they would make a good actor, like to attract attention, are good at impromptu speeches and will put on a show to impress people. In daily life that shows as changing tone between a meeting and a party, sensing what an audience wants and giving it, and being comfortable in the spotlight. High self-monitors fit in easily across very different groups; the cost can be a sense that different people know different versions of them.',
		low: 'People who score low say they hate being the centre of attention, would not be good comedians and do not like to draw attention to themselves. In daily life that shows as behaving much the same at work, at home and with strangers, and saying what they think rather than what will go down well. Low self-monitors come across as consistent and direct; the cost can be friction in settings that reward fitting in.',
	},
	statements: {
		1: 'Whether you could convincingly play a part, showing feelings or a manner that are not quite your own.',
		2: 'Whether you sometimes perform a little to make a good impression, rather than simply being as you are.',
		3: 'Whether you take chances to display your talents or achievements when other people are watching.',
		4: 'Whether you tend to be at the centre of things at social gatherings, keeping the energy up.',
		5: 'Whether you can speak well to a group without preparing, thinking on your feet.',
		6: 'Whether you enjoy being noticed and like other people\'s attention to be on you.',
		7: 'Whether you use praise and compliments as a way of winning people over or getting what you want.',
		8: 'Whether you strongly dislike being the one everyone is looking at.',
		9: 'Whether making people laugh on purpose, by performing or joking, is something you would not be good at.',
		10: 'Whether you prefer to stay out of the spotlight rather than have attention on you.',
	},
	testRetest: escsAlpha('.82'),
	related: [
		{ href: '/traits/extraversion/', title: 'Extraversion', note: 'The broad trait it overlaps with.' },
		{ href: '/tests/introvert-or-extrovert/', title: 'Introvert or extrovert?', note: 'Twenty statements on the one scale everyone asks about.' },
		{ href: '/for-teachers-and-researchers/', title: 'For teachers and researchers', note: 'Printable instruments, scoring keys and licences.' },
	],
	faqs: [
		{ q: 'Is high self-monitoring the same as being fake?', a: 'No. Self-monitoring is about how much you watch and adjust the impression you make to suit the situation. High self-monitors are flexible and socially attuned; low self-monitors are consistent and direct. Neither end is more honest, and both have costs and benefits.' },
		{ q: 'How does it relate to extraversion?', a: 'It overlaps with it. Several statements here, such as being the life of the party and liking attention, are also extraversion statements, so extraverts tend to score higher. The idea of self-monitoring is narrower: adjusting how you come across, which a quiet person can also do.' },
		COURSEWORK('Snyder, M. (1974). Self-monitoring of expressive behavior. Journal of Personality and Social Psychology, 30(4), 526-537'),
	],
});

export const shyness = singleTrait({
	instrument: 'ipip-shyness',
	slug: 'shyness',
	minutes: 2,
	title: 'Am I shy? A free shyness test, scored on your device',
	description: 'Public-domain statements on how comfortable you feel with people you do not know. A free shyness test that takes about two minutes.',
	question: 'Am I shy?',
	subtitle: 'IPIP social discomfort scale, 10 items, 2 minutes',
	breadcrumb: 'Shyness',
	traitPath: '/guides/introversion-is-not-shyness/',
	traitTitle: 'Is introversion the same as shyness?',
	scale: {
		name: 'Shyness',
		means: {
			low: 'You tend to feel at ease with people, including people you do not know.',
			mid: 'You are at ease with people in some settings and wary in others.',
			high: 'You tend to feel wary and ill at ease with people you do not know well.',
		},
		high: 'People who score high say they often feel uncomfortable around others, find it difficult to approach people, are quiet around strangers and only feel comfortable with friends. In daily life that shows as hanging back at a party, rehearsing a phone call before making it, and taking a while to warm up in a new group. Shyness is wariness with unfamiliar people, not a dislike of them: many shy people enjoy company once they feel at home in it.',
		low: 'People who score low say they feel comfortable around people, talk to many different people at parties and are at ease in unfamiliar situations. In daily life that shows as starting conversations with strangers, settling quickly into a new job or group, and taking awkward moments in their stride. It is not the same as being outgoing: a person can be at ease with strangers and still prefer a quiet evening alone.',
	},
	statements: {
		1: 'Whether being with other people, especially in company, often leaves you feeling ill at ease rather than relaxed.',
		2: 'Whether starting a conversation or going up to someone you do not know feels hard for you.',
		3: 'Whether you relax only with people you already know well, and feel guarded with everyone else.',
		4: 'Whether you tend to say little when you are with people you have not met before.',
		5: 'Whether meeting new people is something you approach with some unease beforehand.',
		6: "Whether you are generally at ease in other people's company, including people you know less well.",
		7: 'Whether at a social gathering you move around and chat with many people, rather than staying with a few.',
		8: 'Whether awkward moments with people, such as a tense conversation or an uncomfortable silence, leave you unruffled.',
		9: 'Whether you behave naturally and easily with other people, without feeling stiff or watched.',
		10: 'Whether new places, events and groups of people leave you feeling at ease rather than on edge.',
	},
	testRetest: 'The IPIP comparison table gives coefficient alpha of .86 for this scale, from 501 adults in the Eugene-Springfield Community Sample, and a correlation of .81 with the published inventory scale it was built to match, shyness with strangers. There is no test-retest figure. Scores are fairly stable over weeks; a change of a few points between attempts is usual.',
	related: [
		{ href: '/guides/introversion-is-not-shyness/', title: 'Is introversion the same as shyness?', note: 'Why the two are different.' },
		{ href: '/tests/introvert-or-extrovert/', title: 'Introvert or extrovert?', note: 'Twenty statements on the one scale everyone asks about.' },
		{ href: '/traits/self-consciousness/', title: 'Self-consciousness', note: 'The neuroticism facet about feeling awkward and watched.' },
	],
	faqs: [
		{ q: 'Is shyness the same as introversion?', a: 'No. Shyness is wariness or discomfort with people you do not know. Introversion is a preference for less stimulation and more time alone, and many introverts are perfectly at ease with strangers. The two are related, so shy people are more often introverted, but they are measured separately (Cheek and Buss, 1981).' },
		{ q: 'Can you be shy and outgoing?', a: 'Yes. Some people enjoy company and seek it out but feel nervous with strangers until they warm up. Researchers call this combination shy and sociable, and it is common. This test measures the discomfort with unfamiliar people, not how much you like company.' },
	],
});
