// Content for /tests/hexaco/: the IPIP-HEXACO scales, six traits and 24
// facets, 240 items (test release T8). Items, keys and alphas are in
// packages/instruments/data/ipip-hexaco.json; the statement lines are in
// hexaco-statements.ts.
import type { TestContent } from './content';
import { HEXACO_STATEMENTS } from './hexaco-statements';

export const hexaco: TestContent = {
	instrument: 'ipip-hexaco',
	path: '/tests/hexaco/',
	title: 'HEXACO personality test: 6 traits and 24 facets, free',
	description: 'The six HEXACO traits, including honesty-humility, and their 24 facets, from the free IPIP-HEXACO scales. 240 statements, scored on your device.',
	question: 'The HEXACO personality test',
	subtitle: 'IPIP-HEXACO scales, 240 items, 40 minutes',
	breadcrumb: 'HEXACO',
	minutes: 40,
	scales: {
		HH: {
			means: {
				low: 'You tend to bend rules, flatter and look out for your own advantage more readily than most.',
				mid: 'You hold to fairness and modesty in some situations and less in others.',
				high: 'You tend to be sincere, fair and modest, and uninterested in status or gain for its own sake.',
			},
			high: 'People who score high say they do not pretend to be more than they are, would never cheat or take what is not theirs, and are not drawn to wealth, luxury or status. In daily life that shows as declining an advantage that would not be fair, giving honest answers rather than flattering ones, and being unimpressed by expensive things. Honesty-humility is the trait the HEXACO model adds to the Big Five; it describes how people treat others when they could get away with exploiting them.',
			low: 'People who score low say they use flattery to get ahead, would be tempted by money they could take unnoticed, and enjoy status, luxury and being seen as important. In daily life that shows as working the rules to their advantage, valuing the good things in life openly, and being comfortable with self-promotion. A low score is not a judgement of character: it describes a readiness to put one\'s own interests first, which most people show in some settings and not others.',
			traitPath: '/guides/honesty-humility-explained/',
		},
		EM: {
			name: 'Emotionality',
			means: {
				low: 'You tend to stay steady and self-reliant, and rarely feel fearful or worried.',
				mid: 'You feel fear, worry and the need for support about as often as you stay unmoved.',
				high: 'You tend to feel fear and worry readily, lean on others for support and feel strong bonds.',
			},
			high: 'People who score high say they are afraid of physical danger, worry about things, want comfort and support when things are hard, and feel strong emotional ties to others. In daily life that shows as avoiding risky activities, being moved by goodbyes and wanting to talk a problem over. HEXACO emotionality is not the same as Big Five neuroticism: it covers fear, worry, dependence and sentimentality, and leaves out anger, which HEXACO places under agreeableness.',
			low: 'People who score low say they are not afraid of physical danger, rarely worry, can handle difficulties alone and feel little emotion at partings. In daily life that shows as calm in a crisis, independence, and a matter-of-fact way with endings. It is not coldness: low scorers care about people, they simply need less reassurance and are less shaken by threats and losses.',
		},
		EX: {
			name: 'Extraversion',
			means: {
				low: 'You tend to be reserved, keep to the background and prefer fewer people.',
				mid: 'You are outgoing in some settings and reserved in others.',
				high: 'You tend to be confident, sociable and lively, and enjoy being with people.',
			},
			high: 'People who score high say they express themselves easily, are comfortable taking the lead in a group, enjoy social gatherings and feel lively and optimistic. In daily life that shows as talking readily to strangers, speaking up in meetings and being energised by company. HEXACO extraversion is close to the Big Five trait of the same name, with an emphasis on social self-esteem and confidence.',
			low: 'People who score low say they keep in the background, feel awkward leading a group, prefer quiet activities and are less often cheerful and full of energy. In daily life that shows as preferring a few close friends, listening more than talking, and recharging alone. It is not the same as shyness or unhappiness; many low scorers are content and socially skilled, they simply seek less company and stimulation.',
			traitPath: '/traits/extraversion/',
		},
		AG: {
			name: 'Agreeableness',
			means: {
				low: 'You tend to hold grudges, criticise readily and get angry more easily than most.',
				mid: 'You forgive and compromise in some situations and stand firm in others.',
				high: 'You tend to forgive, compromise and stay calm, and are slow to judge others.',
			},
			high: 'People who score high say they forgive people who have wronged them, are lenient in judging others, willing to compromise and slow to anger. In daily life that shows as letting things go, giving people a second chance and keeping calm in a dispute. HEXACO agreeableness is different from the Big Five trait: it is about forgiveness, gentleness, flexibility and patience, and it takes in the anger that the Big Five places under neuroticism.',
			low: 'People who score low say they hold grudges, are critical of others\' shortcomings, stubborn in defending their views and quick to anger. In daily life that shows as standing firm in an argument, pointing out faults and finding other people\'s mistakes irritating. It is not cruelty: low scorers can be warm and generous, they are simply less ready to overlook being wronged.',
		},
		CO: {
			name: 'Conscientiousness',
			means: {
				low: 'You tend to work in a relaxed way, act on impulse and let details pass.',
				mid: 'You are organised and careful in some areas and relaxed in others.',
				high: 'You tend to be organised, hard-working, thorough and careful in your decisions.',
			},
			high: 'People who score high say they plan ahead and keep things in order, work hard towards their goals, check their work for mistakes and think carefully before acting. In daily life that shows as lists and schedules, finishing tasks early and avoiding rash decisions. HEXACO conscientiousness is close to the Big Five trait of the same name.',
			low: 'People who score low say they are not very organised, do just enough work, tolerate errors and make decisions on impulse. In daily life that shows as flexibility, spontaneity and a relaxed attitude to deadlines and detail. It is not a lack of ability or care: many low scorers do excellent work in bursts, they simply rely less on plans and checks.',
			traitPath: '/traits/conscientiousness/',
		},
		OP: {
			name: 'Openness to experience',
			means: {
				low: 'You tend to prefer the familiar and practical over art, ideas and the unusual.',
				mid: 'You are drawn to art, ideas and new things in some areas and not in others.',
				high: 'You tend to enjoy art, ideas, imagination and unconventional things.',
			},
			high: 'People who score high say they are moved by art and nature, curious about the world, enjoy using their imagination and are drawn to unusual people and ideas. In daily life that shows as visiting galleries, reading widely, making things and questioning convention. HEXACO openness is close to the Big Five trait of the same name.',
			low: 'People who score low say they are not much interested in art, rarely seek out new knowledge, do not think of themselves as creative and prefer the conventional. In daily life that shows as practical interests, trust in tried and tested ways and comfort with routine. It is not narrow-mindedness: low scorers often know a great deal about the things they care about, they simply seek novelty less.',
			traitPath: '/traits/openness/',
		},
	},
	scaleNames: { EM2: 'Worry' },
	subscaleWord: 'facet',
	statements: HEXACO_STATEMENTS,
	seeAlso: [
		{ before: 'Two of the 24 facets also have short tests of their own: the ', label: 'patience test', href: '/tests/patience/', after: ' and the perfectionism test, with the same ten statements each.' },
	],
	testRetest: 'The IPIP comparison table gives no sample size and no test-retest figure. Facet alphas run from .67 (flexibility) and .72 (perfectionism), the two lowest, to .88 (organisation), so read those two facets as rough guides; the six traits, each scored from 40 statements, run from .87 to .91.',
	related: [
		{ href: '/compare/big-five-vs-hexaco/', title: 'Big Five vs HEXACO', note: 'Five traits or six, and which to take.' },
		{ href: '/guides/honesty-humility-explained/', title: 'What is honesty-humility?', note: 'The trait HEXACO adds.' },
		{ href: '/tests/big-five/', title: 'The Big Five, with the facets', note: 'Thirty facets, with percentiles.' },
	],
	faqs: [
		{ q: 'What is honesty-humility?', a: 'The sixth trait the HEXACO model adds to the Big Five: sincerity, fairness, greed avoidance and modesty. People high on it are unwilling to manipulate or exploit others even when they could get away with it, and uninterested in status and wealth for their own sake. Ashton and Lee found it turns up in personality studies across many languages.' },
		{ q: 'How is HEXACO different from the Big Five?', a: 'HEXACO has six traits instead of five. Besides adding honesty-humility, it reshuffles two of the Big Five: anger moves from neuroticism into agreeableness, and sentimentality moves the other way, so HEXACO emotionality and agreeableness are not the same as their Big Five namesakes. Extraversion, conscientiousness and openness are close to the Big Five versions.' },
		{ q: 'Is this the official HEXACO-PI-R?', a: 'No. It is the free IPIP-HEXACO, built by two of the HEXACO model\'s authors with the founder of the IPIP to measure the same constructs with different, public-domain statements (Ashton, Lee and Goldberg, 2007). The official inventory is a separate, published questionnaire.' },
		{ q: 'Why is there no percentile on this test?', a: 'The published HEXACO norms belong to the official inventory and cannot be used with these statements, and the site never estimates or invents norms. Your markers are drawn against the possible range instead. The 120-item Big Five test does have published norms.' },
		{ q: 'Is a high or low score better?', a: 'Neither. Each end of each trait has strengths and costs, and the research describes tendencies across large groups, not what any one person will do. The site never colours scores as good or bad.' },
		{ q: 'Where do my answers go?', a: 'Nowhere. The test is scored in your browser and the result is kept only on this device, and a long test like this one is saved as you go, so you can stop and carry on later. If you choose to share a link, your scores are inside the link itself and nothing is sent to this site.' },
	],
};
