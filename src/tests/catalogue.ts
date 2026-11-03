// The test catalogue, shared by the home page and the tests index so the two
// never drift. Grouped by what people want to know.

export interface TestEntry {
	title: string;
	href: string;
	items: number;
	minutes: number;
	/** One line on why to take it. */
	why: string;
}

export interface TestGroup {
	name: string;
	tests: TestEntry[];
}

export const TEST_GROUPS: TestGroup[] = [
	{
		name: 'Who am I',
		tests: [
			{ title: 'The Big Five, with the facets', href: '/tests/big-five/', items: 120, minutes: 12, why: 'Five traits and thirty facets, against a sample of over 400,000 people.' },
			{ title: 'The Big Five in five minutes', href: '/tests/big-five/short/', items: 50, minutes: 5, why: 'The five broad traits, against a sample of over 600,000 people.' },
			{ title: 'The Big Five in one minute', href: '/tests/quick/', items: 10, minutes: 1, why: 'A rough position on all five traits when you have no time.' },
			{ title: 'Introvert or extrovert?', href: '/tests/introvert-or-extrovert/', items: 20, minutes: 3, why: 'Where you sit on the one scale everyone asks about.' },
			{ title: 'How is my self-esteem?', href: '/tests/self-esteem/', items: 10, minutes: 2, why: 'The Rosenberg scale, the standard measure of global self-worth.' },
			{ title: 'What are my character strengths?', href: '/tests/character-strengths/', items: 96, minutes: 10, why: 'Twenty-four strengths, so your signature strengths stand out.' },
			{ title: 'How do I handle emotions?', href: '/tests/emotional-intelligence/', items: 68, minutes: 7, why: 'Seven components of trait emotional intelligence.' },
			{ title: 'What is my interpersonal style?', href: '/tests/interpersonal-style/', items: 32, minutes: 3, why: 'How you come across: eight styles on a circle of warmth and dominance.' },
		],
	},
	{
		name: 'What suits me',
		tests: [
			{ title: 'What kind of work would I enjoy?', href: '/tests/career-interests/', items: 60, minutes: 5, why: 'Six interest areas and your three-letter code, mapped to UK jobs.' },
		],
	},
	{
		name: 'How do I compare on one trait',
		tests: [
			{ title: 'How assertive am I?', href: '/tests/assertiveness/', items: 10, minutes: 2, why: 'Taking charge and speaking up, a facet of extraversion.' },
			{ title: 'How patient am I?', href: '/tests/patience/', items: 10, minutes: 2, why: 'How much it takes to make you angry.' },
			{ title: 'How curious am I?', href: '/tests/curiosity/', items: 10, minutes: 2, why: 'Finding the world interesting.' },
			{ title: 'Do I finish what I start?', href: '/tests/perseverance/', items: 8, minutes: 2, why: 'Perseverance, inside conscientiousness.' },
			{ title: 'How orderly am I?', href: '/tests/orderliness/', items: 10, minutes: 2, why: 'Tidiness and plans, the surroundings side of perfectionism.' },
			{ title: 'How creative am I?', href: '/tests/creativity/', items: 8, minutes: 2, why: 'Seeing yourself as an original thinker.' },
			{ title: 'How courageous am I?', href: '/tests/courage/', items: 10, minutes: 2, why: 'Taking a stand and facing discomfort.' },
			{ title: 'How trusting am I?', href: '/tests/trust/', items: 10, minutes: 2, why: 'Assuming people mean well, a facet of agreeableness.' },
			{ title: 'How emotionally stable am I?', href: '/tests/emotional-stability/', items: 20, minutes: 3, why: 'How steady your moods are, the other side of neuroticism.' },
		],
	},
];

export const ALL_TESTS: TestEntry[] = TEST_GROUPS.flatMap((g) => g.tests);
