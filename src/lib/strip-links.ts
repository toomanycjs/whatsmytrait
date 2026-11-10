// Link text under a population strip, naming the test that draws it, so a
// page never has two links that read the same but go to different places,
// or a vague "Take this test".
const STRIP_LINK: Record<string, string> = {
	'/tests/big-five/': 'Take the full Big Five test, 120 items',
	'/tests/big-five/short/': 'Take the five-minute Big Five test, 50 items',
};

export const stripLinkText = (href: string) => STRIP_LINK[href] ?? 'Take the test that draws this strip';
