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
		],
	},
	{
		name: 'What suits me',
		tests: [],
	},
	{
		name: 'How do I compare',
		tests: [],
	},
];

export const ALL_TESTS: TestEntry[] = TEST_GROUPS.flatMap((g) => g.tests);
