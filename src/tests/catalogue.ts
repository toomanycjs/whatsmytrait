// The test catalogue, shared by the home page and the tests index so the two
// never drift. Grouped by what people want to know.

import ipip120 from '@site/instruments/data/ipip-neo-120.json';
import ipip50 from '@site/instruments/data/ipip-50.json';
import { bigFive } from './big-five';
import { bigFiveShort } from './big-five-short';
import { TESTS } from './registry';

export interface TestEntry {
	title: string;
	href: string;
	items: number;
	minutes: number;
	/** One line on why to take it. */
	why: string;
}

// Item counts and times come from each test's data and content files, so
// the catalogue, the test page and its meta tags cannot disagree.
const FACTS = new Map<string, { items: number; minutes: number }>();
const itemCount = (data: unknown) => (data as { items: unknown[] }).items.length;
for (const t of TESTS) FACTS.set(t.content.path, { items: itemCount(t.data), minutes: t.content.minutes ?? Math.max(1, Math.round(itemCount(t.data) / 10)) });
FACTS.set(bigFive.path, { items: itemCount(ipip120), minutes: bigFive.minutes! });
FACTS.set(bigFiveShort.path, { items: itemCount(ipip50), minutes: bigFiveShort.minutes! });
const entry = (e: { title: string; href: string; why: string }): TestEntry => {
	const f = FACTS.get(e.href);
	if (!f) throw new Error(`catalogue: no test registered at ${e.href}`);
	return { ...e, ...f };
};

export interface TestGroup {
	name: string;
	tests: TestEntry[];
}

export const TEST_GROUPS: TestGroup[] = [
	{
		name: 'Who am I',
		tests: [
			entry({ title: 'The Big Five, with the facets', href: '/tests/big-five/', why: 'Five traits and thirty facets, against a sample of over 400,000 people.' }),
			entry({ title: 'The Big Five in five minutes', href: '/tests/big-five/short/', why: 'The five broad traits, against a sample of over 600,000 people.' }),
			entry({ title: 'The Big Five in one minute', href: '/tests/quick/', why: 'A rough position on all five traits when you have no time.' }),
			entry({ title: 'Introvert or extrovert?', href: '/tests/introvert-or-extrovert/', why: 'Where you sit on the one scale everyone asks about.' }),
			entry({ title: 'How is my self-esteem?', href: '/tests/self-esteem/', why: 'The Rosenberg scale, the standard measure of global self-worth.' }),
			entry({ title: 'What are my character strengths?', href: '/tests/character-strengths/', why: 'Twenty-four strengths, so your signature strengths stand out.' }),
			entry({ title: 'How do I handle emotions?', href: '/tests/emotional-intelligence/', why: 'Seven components of trait emotional intelligence.' }),
			entry({ title: 'What is my interpersonal style?', href: '/tests/interpersonal-style/', why: 'How you come across: eight styles on a circle of warmth and dominance.' }),
		],
	},
	{
		name: 'Go deeper than the Big Five',
		tests: [
			entry({ title: 'The Big Five aspects test', href: '/tests/big-five-aspects/', why: 'Ten aspects, two under each trait, a hundred statements.' }),
			entry({ title: 'The HEXACO personality test', href: '/tests/hexaco/', why: 'Six traits, including honesty-humility, and 24 facets.' }),
		],
	},
	{
		name: 'What suits me',
		tests: [
			entry({ title: 'What kind of work would I enjoy?', href: '/tests/career-interests/', why: 'Six interest areas and your three-letter code, mapped to UK jobs.' }),
		],
	},
	{
		name: 'How do I compare on one trait',
		tests: [
			entry({ title: 'How assertive am I?', href: '/tests/assertiveness/', why: 'Taking charge and speaking up, a facet of extraversion.' }),
			entry({ title: 'How patient am I?', href: '/tests/patience/', why: 'How much it takes to make you angry.' }),
			entry({ title: 'How curious am I?', href: '/tests/curiosity/', why: 'Finding the world interesting.' }),
			entry({ title: 'Do I finish what I start?', href: '/tests/perseverance/', why: 'Perseverance, inside conscientiousness.' }),
			entry({ title: 'Am I shy?', href: '/tests/shyness/', why: 'How at ease you feel with people you do not know.' }),
			entry({ title: 'Empathy test', href: '/tests/empathy/', why: 'How strongly other people\'s feelings move you.' }),
			entry({ title: 'Am I a leader?', href: '/tests/leadership/', why: 'Bringing a group together and leading it fairly.' }),
			entry({ title: 'Optimism test', href: '/tests/optimism/', why: 'How much you expect things to turn out well.' }),
			entry({ title: 'Am I a perfectionist?', href: '/tests/perfectionism/', why: 'Attention to detail and wanting work exactly right, a facet of conscientiousness.' }),
			entry({ title: 'How orderly am I?', href: '/tests/orderliness/', why: 'Tidiness and plans, the surroundings side of perfectionism.' }),
			entry({ title: 'How creative am I?', href: '/tests/creativity/', why: 'Seeing yourself as an original thinker.' }),
			entry({ title: 'How courageous am I?', href: '/tests/courage/', why: 'Taking a stand and facing discomfort.' }),
			entry({ title: 'How trusting am I?', href: '/tests/trust/', why: 'Assuming people mean well, a facet of agreeableness.' }),
			entry({ title: 'How emotionally stable am I?', href: '/tests/emotional-stability/', why: 'How steady your moods are, the other side of neuroticism.' }),
		],
	},
	{
		name: 'For coursework',
		tests: [
			entry({ title: 'Locus of control test', href: '/tests/locus-of-control/', why: 'Internal or external: how far your life feels in your own hands, from Levenson.' }),
			entry({ title: 'Need for cognition test', href: '/tests/need-for-cognition/', why: 'How much you enjoy hard thinking, from Cacioppo and Petty.' }),
			entry({ title: 'Self-monitoring test', href: '/tests/self-monitoring/', why: 'How much you adapt the way you come across, from Snyder.' }),
		],
	},
];

export const ALL_TESTS: TestEntry[] = TEST_GROUPS.flatMap((g) => g.tests);
