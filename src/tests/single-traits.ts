// The nine single-trait tests and the introvert-or-extrovert test: one scale
// each, a three-minute answer to exactly that question.
import { singleTrait } from './single-trait';

const ipipAlpha = (a: string) => `The IPIP key page gives coefficient alpha of ${a} for this scale and no test-retest figure. Personality scores are fairly stable over weeks; a change of a few points between attempts is usual.`;
// IPIP-HEXACO facets: the scale's own alpha is in the IPIP comparison table;
// the figure beside the facet on the key page is the published inventory's.
const hexacoAlpha = (a: string) => `The IPIP comparison table for the IPIP-HEXACO scales gives coefficient alpha of ${a} for this scale, with no sample size and no test-retest figure. (The figure printed beside the facet on the scoring key page is the alpha of the published inventory's own scale, not of these ten statements.) Personality scores are fairly stable over weeks; a change of a few points between attempts is usual.`;

export const introvertOrExtrovert = singleTrait({
	instrument: 'ipip-extraversion-20',
	slug: 'introvert-or-extrovert',
	seeAlso: [{ before: 'Introversion is not shyness: feeling uneasy with people you do not know is a separate tendency, measured by the ', label: 'shyness test', href: '/tests/shyness/', after: '.' }],
	minutes: 2,
	guide: { href: '/guides/introversion-is-not-shyness/', title: 'Is introversion the same as shyness?', note: 'The guide written for this test.' },
	title: 'Introvert or extrovert? A free 20-item test, 2 minutes',
	description: 'Am I an introvert or an extrovert? Twenty public-domain statements scored on your device in two minutes, with the result shown on a strip.',
	question: 'Introvert or extrovert?',
	subtitle: 'IPIP Extraversion scale, 20 items, 2 minutes',
	breadcrumb: 'Introvert or extrovert',
	traitPath: '/traits/extraversion/',
	traitTitle: 'Extraversion explained',
	scale: {
		name: 'Extraversion',
		means: {
			low: 'You sit at the introvert end: you tend to keep to yourself and find quiet company easier than a crowd.',
			mid: 'You sit in the middle, where most people are: sociable in some settings, reserved in others.',
			high: 'You sit at the extrovert end: you tend to seek company, conversation and attention.',
		},
		high: 'People who score high say they are the life of the party, make friends easily, start conversations, feel at ease with people and know how to captivate them. In daily life that shows as a wide circle, a liking for busy rooms, speaking before thinking and little hesitation in taking charge. Extroversion is a preference for stimulation and company; it is not a measure of social skill, warmth or how much people like you.',
		low: 'People who score low say they keep in the background, have little to say, are quiet around strangers, bottle up their feelings and find it difficult to approach others. In daily life that shows as a small circle of close friends, time alone to recover from social effort and no wish for attention. Introversion is not shyness: shyness is fear of people, introversion is a preference for less of them. Many introverts are confident and good company when they choose.',
	},
	testRetest: ipipAlpha('.91'),
	faqs: [
		{ q: 'What is an ambivert?', a: 'Someone near the middle of the extraversion scale, which is where most people are. Extraversion is a continuum, not two types, so ambivert is just a name for the large middle.' },
		{ q: 'Is introversion the same as shyness?', a: 'No. Shyness is discomfort or fear around people; introversion is a preference for less stimulation and smaller company. The scale here measures the preference, not the fear.' },
		{ q: 'Can I be an introvert and still like people?', a: 'Yes. Low scorers often have close, deep friendships; they simply find large groups and constant company tiring and prefer one or two people at a time.' },
	],
});

export const assertiveness = singleTrait({
	instrument: 'ipip-assertiveness',
	slug: 'assertiveness',
	minutes: 2,
	guide: { href: '/guides/what-assertiveness-is-and-is-not/', title: 'What is assertiveness, and what is it not?', note: 'The guide written for this test.' },
	title: 'How assertive am I? A free 10-item test, 2 minutes',
	description: 'How assertive are you? Ten public-domain statements from the IPIP-NEO assertiveness facet, scored on your device in two minutes.',
	question: 'How assertive am I?',
	subtitle: 'IPIP-NEO assertiveness facet, 10 items, 2 minutes',
	breadcrumb: 'Assertiveness',
	traitPath: '/traits/extraversion/',
	traitTitle: 'Extraversion explained',
	scale: {
		name: 'Assertiveness',
		means: {
			low: 'You tend to wait for others to lead and hold back your opinions.',
			mid: 'You take charge in some situations and hold back in others, like most people.',
			high: 'You tend to take charge, lead and try to influence what happens.',
		},
		high: 'People who score high say they take charge, try to lead others, can talk others into doing things and seek to influence them. In daily life that shows as speaking first in meetings, volunteering to lead, pushing for a decision and stating a view before being asked. The costs are being heard as domineering and crowding out quieter people. It is a facet of extraversion, not a measure of competence or of being right.',
		low: 'People who score low say they wait for others to lead the way, keep in the background, have little to say and hold back their opinions. In daily life that shows as letting others decide, speaking when asked, and preferring to influence by example or in writing. It is not a lack of views or ability: many low scorers lead well in roles that reward listening, and the research links assertiveness to emerging as a leader more than to leading well.',
	},
	testRetest: ipipAlpha('.84'),
	faqs: [
		{ q: 'Is assertiveness the same as aggression?', a: 'No. Assertiveness is stating what you want and taking the lead; aggression is doing so at others\' expense. The scale measures the first. Low agreeableness, measured by the Big Five tests, is closer to the second.' },
		{ q: 'Can assertiveness be learned?', a: 'The behaviours can be practised and many people become more comfortable speaking up with experience and age; the research finds the assertive side of extraversion rises through young adulthood on average. The underlying preference moves more slowly.' },
	],
});

export const patience = singleTrait({
	instrument: 'ipip-patience',
	slug: 'patience',
	minutes: 2,
	guide: { href: '/guides/patience-as-a-trait/', title: 'Is patience a personality trait?', note: 'The guide written for this test.' },
	title: 'How patient am I? A free 10-item test, 2 minutes',
	description: 'How patient are you? Ten public-domain statements from the IPIP patience scale, scored on your device in two minutes.',
	question: 'How patient am I?',
	subtitle: 'IPIP patience scale, 10 items, 2 minutes',
	breadcrumb: 'Patience',
	traitPath: '/traits/agreeableness/',
	traitTitle: 'Agreeableness explained',
	scale: {
		name: 'Patience',
		means: {
			low: 'You tend to get annoyed and lose your temper more readily than most people.',
			mid: 'It takes about as much to make you angry as it takes most people.',
			high: 'It takes a lot to make you angry; you rarely get irritated.',
		},
		high: 'People who score high say it takes a lot to make them angry, they rarely feel angry with people, rarely get irritated and seldom get mad. In daily life that shows as calm in queues and traffic, tolerance of other people\'s mistakes, and arguments that do not escalate. It is the slow-to-anger sense of patience, measured as a facet of agreeableness in the HEXACO model; it says nothing about how well you wait for results.',
		low: 'People who score low say they are easily annoyed, get angry and irritated easily, lose their temper and get upset easily. In daily life that shows as quick flashes of frustration, sharp words that are regretted later, and a low threshold for other people\'s slowness. It is not the same as being unkind, and many quick-tempered people are also quick to make up; the scale measures how readily anger arises, not what is done with it.',
	},
	testRetest: hexacoAlpha('.80'),
	faqs: [
		{ q: 'Is this patience as in waiting, or as in temper?', a: 'Temper. The scale measures how much it takes to make you angry or irritated. Patience in the sense of persisting and waiting for results is closer to perseverance, which has its own test.' },
		{ q: 'Why is patience listed under agreeableness?', a: 'In the HEXACO model of personality, patience is one of the four facets of agreeableness, alongside forgiveness, gentleness and flexibility. The item pool here is the public-domain IPIP version of that facet.' },
	],
});

export const curiosity = singleTrait({
	instrument: 'ipip-curiosity',
	slug: 'curiosity',
	minutes: 2,
	guide: { href: '/guides/curiosity-and-openness/', title: 'How does curiosity relate to openness?', note: 'The guide written for this test.' },
	title: 'How curious am I? A free 10-item test, 2 minutes',
	description: 'How curious are you? Ten public-domain statements from the IPIP curiosity scale, scored on your device in two minutes.',
	question: 'How curious am I?',
	subtitle: 'IPIP curiosity scale, 10 items, 2 minutes',
	breadcrumb: 'Curiosity',
	traitPath: '/traits/openness/',
	traitTitle: 'Openness to experience explained',
	scale: {
		name: 'Curiosity',
		means: {
			low: 'You tend to have a few settled interests and are not much drawn to the unfamiliar.',
			mid: 'You find about as much to interest you as most people do.',
			high: 'You tend to find the world interesting and are rarely bored.',
		},
		high: 'People who score high say they find the world a very interesting place, are never bored, are excited by many different activities and love to hear about other countries and cultures. In daily life that shows as wide reading, questions, new hobbies that are actually taken up, and an easy time on long journeys. Curiosity is a strength that overlaps with openness to experience; it is interest, not intelligence.',
		low: 'People who score low say they are not all that curious about the world, have few interests and find it difficult to entertain themselves. In daily life that shows as settled routines, a small number of deep interests rather than many shallow ones, and little appetite for novelty for its own sake. It is not a deficit: depth and focus are what low scorers often have instead, and many are expert in the few things they care about.',
	},
	testRetest: ipipAlpha('.78'),
	faqs: [
		{ q: 'Is curiosity the same as openness to experience?', a: 'They overlap. Openness is the broad Big Five trait covering imagination, art, feelings, variety and ideas; curiosity is the narrower appetite for finding things interesting. The Big Five tests measure openness against norms.' },
		{ q: 'Does curiosity change with age?', a: 'Openness, the broad trait it belongs to, rises in young adulthood and falls a little in old age on average. No study specific to this ten-item scale is cited on the key page.' },
	],
});

export const perseverance = singleTrait({
	instrument: 'ipip-perseverance',
	slug: 'perseverance',
	minutes: 2,
	guide: { href: '/guides/perseverance-and-conscientiousness/', title: 'How does perseverance relate to conscientiousness?', note: 'The guide written for this test.' },
	title: 'How much perseverance do I have? Free 8-item test',
	description: 'Do you finish what you start? Eight public-domain statements from the IPIP perseverance scale, scored on your device in two minutes.',
	question: 'Do I finish what I start?',
	subtitle: 'IPIP industry and perseverance scale, 8 items, 2 minutes',
	breadcrumb: 'Perseverance',
	traitPath: '/traits/conscientiousness/',
	traitTitle: 'Conscientiousness explained',
	scale: {
		name: 'Perseverance',
		means: {
			low: 'You tend to give up or change course when a task drags on.',
			mid: 'You finish about as much of what you start as most people do.',
			high: 'You tend to finish what you start, despite obstacles.',
		},
		high: 'People who score high say they do not quit a task before it is finished, finish things despite obstacles, work hard and do not get sidetracked. In daily life that shows as projects that reach the end, long courses completed, and a reluctance to leave anything half done. Perseverance is a strength closely tied to the self-discipline and achievement-striving facets of conscientiousness. The cost is persisting with things that should be dropped.',
		low: 'People who score low say they do not finish what they start, give up easily and do not stick with what they decide to do. In daily life that shows as enthusiasm that fades, several things on the go, and a readiness to cut losses that more persistent people lack. It is not a verdict on ability or effort: many low scorers work hard in bursts and change direction well, which is sometimes the better strategy.',
	},
	testRetest: ipipAlpha('.81'),
	faqs: [
		{ q: 'Is this the same as grit?', a: 'Close. Grit, as usually measured, combines perseverance of effort with consistency of interest over years. This scale measures the perseverance part. Both sit inside conscientiousness in the Big Five.' },
		{ q: 'Why only eight items?', a: 'The IPIP key page lists ten items for this scale but marks two as omitted from the scored version; the site keeps the eight the key scores.' },
	],
});

export const orderliness = singleTrait({
	instrument: 'ipip-orderliness',
	slug: 'orderliness',
	minutes: 2,
	guide: { href: '/guides/orderliness-and-perfectionism/', title: 'Is orderliness the same as perfectionism?', note: 'The guide written for this test.' },
	title: 'How orderly am I? A free 10-item test, 2 minutes',
	description: 'How orderly are you, and is it perfectionism? Ten public-domain statements from the IPIP-NEO orderliness facet, scored on your device.',
	question: 'How orderly am I?',
	subtitle: 'IPIP-NEO orderliness facet, 10 items, 2 minutes',
	breadcrumb: 'Orderliness',
	traitPath: '/traits/conscientiousness/',
	traitTitle: 'Conscientiousness explained',
	scale: {
		name: 'Orderliness',
		means: {
			low: 'You tend to tolerate mess and are not much bothered by untidiness.',
			mid: 'You like about as much order as most people do.',
			high: 'You like things tidy, planned and in their proper place.',
		},
		high: 'People who score high say they like order and regularity, like to tidy up, want everything to be just right and do things according to a plan. In daily life that shows as tidy desks and homes, lists, labelled boxes and discomfort when things are out of place. This is the facet of conscientiousness that people usually mean when they call themselves a perfectionist about their surroundings. The cost is time spent arranging rather than doing, and friction with less orderly people.',
		low: 'People who score low say they leave a mess in their room, leave their belongings around, forget to put things back and are not bothered by untidiness or by messy people. In daily life that shows as working happily amid clutter, finding things by memory rather than system, and an easy tolerance of other people\'s untidiness. It is not laziness, and it is separate from how hard someone works or whether they finish things; those are other facets.',
	},
	testRetest: ipipAlpha('.82'),
	faqs: [
		{ q: 'Is orderliness the same as perfectionism?', a: 'It is the part of perfectionism that is about surroundings and routine. The wish to get work exactly right belongs more to achievement-striving, and the worry about getting it wrong to neuroticism. This scale measures liking for order.' },
		{ q: 'Does a high score mean I am conscientious?', a: 'It means you are high on one of the six facets of conscientiousness. The 120-item Big Five test scores all six, and people often differ across them.' },
	],
});

export const creativity = singleTrait({
	instrument: 'ipip-creativity',
	slug: 'creativity',
	minutes: 2,
	guide: { href: '/guides/creativity-as-a-trait/', title: 'Is creativity a personality trait?', note: 'The guide written for this test.' },
	title: 'How creative am I? A free 8-item test, 2 minutes',
	description: 'How creative are you, as a trait? Eight public-domain statements from the IPIP originality and creativity scale, scored on your device.',
	question: 'How creative am I?',
	subtitle: 'IPIP originality and creativity scale, 8 items, 2 minutes',
	breadcrumb: 'Creativity',
	traitPath: '/traits/openness/',
	traitTitle: 'Openness to experience explained',
	scale: {
		name: 'Creativity',
		means: {
			low: 'You tend to prefer proven ways of doing things to inventing new ones.',
			mid: 'You come up with new ideas about as often as most people do.',
			high: 'You tend to see yourself as an original thinker who finds new ways to do things.',
		},
		high: 'People who score high say they come up with new and different ideas, like to think of new ways to do things, are original thinkers and have an imagination that stretches beyond their friends\'. In daily life that shows as improvising, questioning how things are done, and a taste for making rather than following. The scale measures self-rated originality, a strength that overlaps with openness to experience; it does not measure creative output, talent or training.',
		low: 'People who score low say they do not pride themselves on being original, are not considered to have new and different ideas and have no special urge to do something original. In daily life that shows as a preference for proven methods, improving on what exists rather than replacing it, and comfort in following a good plan. It is not a lack of skill: much valuable work is careful execution, and many low scorers are the people who make others\' ideas actually happen.',
	},
	testRetest: ipipAlpha('.85'),
	faqs: [
		{ q: 'Does this test measure creative ability?', a: 'No. It measures whether you see yourself as original and inclined to find new ways of doing things. Creative ability is assessed with tasks, not self-report, and the two correlate only moderately.' },
		{ q: 'Why only eight items?', a: 'The IPIP key page lists ten items for this scale but marks two as omitted from the scored version; the site keeps the eight the key scores.' },
	],
});

export const courage = singleTrait({
	instrument: 'ipip-courage',
	slug: 'courage',
	minutes: 2,
	guide: { href: '/guides/courage-as-a-trait/', title: 'Is courage a personality trait?', note: 'The guide written for this test.' },
	title: 'How courageous am I? A free 10-item test, 2 minutes',
	description: 'Do you speak up and face what is uncomfortable? Ten public-domain statements from the IPIP courage scale, scored on your device.',
	question: 'How courageous am I?',
	subtitle: 'IPIP valour, bravery and courage scale, 10 items, 2 minutes',
	breadcrumb: 'Courage',
	traitPath: '/traits/extraversion/',
	traitTitle: 'Extraversion explained',
	scale: {
		name: 'Courage',
		means: {
			low: 'You tend to avoid awkward situations and keep an unpopular view to yourself.',
			mid: 'You speak up and face discomfort about as readily as most people do.',
			high: 'You tend to take a stand, say the unpopular thing and face your fears.',
		},
		high: 'People who score high say they have taken frequent stands in the face of strong opposition, do not hesitate to express an unpopular opinion, call for action while others talk and can face their fears. In daily life that shows as being the one who raises the awkward point, speaking up for someone being treated badly, and doing the thing that frightens them. Courage as a strength is about moral and social bravery as much as physical; the cost is friction and the occasional unnecessary fight.',
		low: 'People who score low say they avoid dealing with uncomfortable emotions and awkward situations, do not stand up for their beliefs and do not speak their mind when there might be negative results. In daily life that shows as keeping the peace, choosing battles carefully, and expressing disagreement privately or in writing. It is not cowardice: avoiding needless conflict is often wise, and many low scorers act bravely when it matters while declining the daily skirmishes.',
	},
	testRetest: ipipAlpha('.75'),
	faqs: [
		{ q: 'Is this about physical bravery?', a: 'Mostly not. The items are about taking stands, voicing unpopular opinions and facing discomfort, which is the sense of courage used in the character strengths research. Physical risk-taking is closer to excitement-seeking, a facet of extraversion.' },
		{ q: 'Why only ten items when the page lists eleven?', a: 'The IPIP key page lists eleven items but marks one as omitted from the scored scale; the site keeps the ten the key scores.' },
	],
});

export const trust = singleTrait({
	instrument: 'ipip-trust',
	slug: 'trust',
	minutes: 2,
	guide: { href: '/guides/trust-and-agreeableness/', title: 'How does trust relate to agreeableness?', note: 'The guide written for this test.' },
	title: 'How trusting am I? A free 10-item test, 2 minutes',
	description: 'Do you assume people mean well, or suspect hidden motives? Ten public-domain statements from the IPIP-NEO trust facet, scored on your device.',
	question: 'How trusting am I?',
	subtitle: 'IPIP-NEO trust facet, 10 items, 2 minutes',
	breadcrumb: 'Trust',
	traitPath: '/traits/agreeableness/',
	traitTitle: 'Agreeableness explained',
	scale: {
		name: 'Trust',
		means: {
			low: 'You tend to suspect hidden motives and keep your guard up with people.',
			mid: 'You give people the benefit of the doubt about as readily as most people do.',
			high: 'You tend to assume people mean well and tell the truth.',
		},
		high: 'People who score high say they trust others, believe that others have good intentions, trust what people say, believe in human goodness and think that all will be well. In daily life that shows as taking people at their word, lending and sharing freely, and being slow to suspect. Trust is the first facet of agreeableness. The cost is being taken advantage of sometimes; the benefit is the relationships and cooperation that only trust makes possible.',
		low: 'People who score low say they distrust people, suspect hidden motives, are wary of others and doubt that people are basically moral. In daily life that shows as checking before believing, reading the small print, and taking time before letting anyone close. It is not paranoia and it is not a judgement about anyone; it is a default setting for new people and claims, and a low score often reflects experience. Low scorers are hard to fool.',
	},
	testRetest: ipipAlpha('.82'),
	faqs: [
		{ q: 'Do I have trust issues?', a: 'This scale cannot say. It measures how readily you assume good intentions in people in general, which is a trait that varies across the whole population. It does not measure trust in any particular person or relationship.' },
		{ q: 'Is low trust a bad thing?', a: 'No. Low trust protects against being deceived and is common among people who have reason to be careful. High trust eases cooperation. Each end has its costs, and the site never codes scores as good or bad.' },
	],
});

export const emotionalStability = singleTrait({
	instrument: 'ipip-emotional-stability-20',
	slug: 'emotional-stability',
	minutes: 3,
	guide: { href: '/guides/emotional-stability-explained/', title: 'What is emotional stability?', note: 'The guide written for this test.' },
	title: 'How emotionally stable am I? A free 20-item test',
	description: 'How steady are your moods? Twenty public-domain statements from the IPIP emotional stability markers, scored on your device in three minutes.',
	question: 'How emotionally stable am I?',
	subtitle: 'IPIP Emotional Stability scale, 20 items, 3 minutes',
	breadcrumb: 'Emotional stability',
	traitPath: '/traits/neuroticism/',
	traitTitle: 'Neuroticism explained',
	scale: {
		name: 'Emotional stability',
		means: {
			low: 'You tend to feel stress, worry and irritation more readily than most people do.',
			mid: 'Your moods are about as steady as most people\'s.',
			high: 'You tend to stay calm and even-tempered, and recover quickly from setbacks.',
		},
		high: 'People who score high say they are relaxed most of the time, seldom feel blue, are not easily bothered by things, rarely get irritated and seldom get mad. In daily life that shows as being the steady one in a crisis, taking criticism without dwelling on it, and sleeping soundly. High scorers have the full range of emotions; they return to baseline faster. The trait is the other side of neuroticism, which the Big Five tests measure with six facets.',
		low: 'People who score low say they get stressed out easily, worry about things, are easily disturbed, change their mood a lot, take offence easily and get caught up in their problems. In daily life that shows as feeling setbacks keenly, planning for what might go wrong, and taking time to settle after a bad day. It is a tendency everyone has to some degree, measured across a whole population; it describes how readily feelings arise, not whether anything is wrong, and it is not a diagnosis.',
	},
	testRetest: ipipAlpha('.91'),
	faqs: [
		{ q: 'Is this the same as neuroticism?', a: 'Yes, scored the other way up. A high emotional stability score is a low neuroticism score. The Big Five tests on this site report neuroticism (120 items, with six facets) or emotional stability (50 items), and the trait page explains both.' },
		{ q: 'Can emotional stability change?', a: 'On average people become more emotionally stable from their twenties onward, and scores also move a little with circumstances. Retaking the test after six months shows whether anything has moved for you.' },
	],
});

export const perfectionism = singleTrait({
	instrument: 'ipip-perfectionism',
	slug: 'perfectionism',
	minutes: 2,
	title: 'Am I a perfectionist? A free 10-item test, 2 minutes',
	description: 'Ten public-domain statements on how carefully you check details and how much mistakes bother you. Scored on your device in two minutes.',
	question: 'Am I a perfectionist?',
	subtitle: 'IPIP-HEXACO perfectionism facet, 10 items, 2 minutes',
	breadcrumb: 'Perfectionism',
	traitPath: '/guides/orderliness-and-perfectionism/',
	traitTitle: 'Is orderliness the same as perfectionism?',
	scale: {
		name: 'Perfectionism',
		means: {
			low: 'You tend to let small details pass and move on once a thing is good enough.',
			mid: 'You attend closely to detail in some things and let it go in others.',
			high: 'You tend to notice details, check your work and want it exactly right.',
		},
		high: 'People who score high say they pay attention to details, have an eye for detail, spot mistakes and want every detail taken care of. They dislike imperfect work, demand quality and keep going until everything is right. In daily life that shows as checking a document twice before sending it, noticing the typo or the figure that does not add up, and finding it hard to hand over work they think could still be better. The same habit can make a task take longer than it needs to.',
		low: 'People who score low say small details tend to slip past them and that they would rather let things happen than check every part. In daily life that shows as working quickly, being content once something does its job, and caring more about the overall result than the finish. It is not carelessness about what matters to them: many low scorers are thorough about the few things they care about and relaxed about the rest. The scale measures how far the urge to get details right reaches, not effort or ability.',
	},
	statements: {
		1: 'Whether you naturally notice and look after the small particulars of a task, rather than only its broad outline.',
		2: 'Whether you keep working on something until no flaw is left, rather than stopping once it is good enough.',
		3: 'Whether small details catch your attention, such as a typo, a crooked picture or a figure that does not add up.',
		4: 'Whether it matters to you that nothing in a piece of work is left loose or unfinished, down to the smallest part.',
		5: "Whether work with flaws in it, your own or other people's, bothers you rather than leaving you indifferent.",
		6: 'Whether you want things such as figures, plans and arguments to fit together exactly, with no loose ends.',
		7: 'Whether you tend to be the person who spots the errors in a piece of work that other people missed.',
		8: 'Whether you expect a high standard from the work you do and from the work others give you.',
		9: 'Whether the small particulars of a task tend to slip past you while you concentrate on the bigger picture.',
		10: 'Whether you would rather let a task take its course than check and steer every part of it yourself.',
	},
	testRetest: hexacoAlpha('.72') + ' An alpha of .72 is acceptable but lower than most scales on this site, so treat the score as a rough guide.',
	related: [
		{ href: '/guides/orderliness-and-perfectionism/', title: 'Is orderliness the same as perfectionism?', note: 'How the two differ, with the research.' },
		{ href: '/tests/orderliness/', title: 'How orderly am I?', note: 'Tidiness, routines and plans, the other side of conscientiousness.' },
		{ href: '/traits/orderliness/', title: 'Orderliness', note: 'The facet of conscientiousness, with where people fall.' },
	],
	faqs: [
		{ q: 'Is perfectionism good or bad?', a: 'Neither, as this scale measures it. Research on perfectionism separates two parts: striving for high standards and wanting work exactly right, which goes with conscientiousness and with better outcomes, and worrying about mistakes and doubting your work, which goes with neuroticism and with worse ones (Stoeber and Otto, 2006). Nine of these ten statements are about the first part: noticing details, checking work and wanting it right.' },
		{ q: 'How is perfectionism different from orderliness?', a: 'Orderliness is about tidiness, routines and plans for your surroundings; perfectionism here is about the quality and detail of the work itself. In the HEXACO model both sit under conscientiousness and they tend to go together, but a person can keep a messy desk and still check every figure in a report. The orderliness test measures the first.' },
	],
});
