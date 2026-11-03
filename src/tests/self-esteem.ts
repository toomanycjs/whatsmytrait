import type { TestContent } from './content';

export const selfEsteem: TestContent = {
	instrument: 'rosenberg',
	path: '/tests/self-esteem/',
	title: 'Rosenberg self-esteem test: 10 items, free, 2 minutes',
	description: 'The Rosenberg Self-Esteem Scale, scored on your device in two minutes, with your score shown on a strip against the possible range.',
	question: 'How is my self-esteem?',
	subtitle: 'Rosenberg Self-Esteem Scale, 10 items, 2 minutes',
	breadcrumb: 'Self-esteem',
	scales: {
		SE: {
			name: 'Self-esteem',
			means: {
				low: 'On the whole you are less satisfied with yourself than most people say they are.',
				mid: 'Your sense of your own worth is about where most people\'s is.',
				high: 'On the whole you feel you are a person of worth and are satisfied with yourself.',
			},
			high: 'People who score high agree that they are a person of worth on an equal plane with others, have a number of good qualities, can do things as well as most people and take a positive attitude toward themselves. In daily life that shows as taking setbacks as events rather than verdicts, accepting praise and criticism without much fuss, and not needing much reassurance. The scale measures global self-esteem, a stable sense of worth, not confidence in any particular skill.',
			low: 'People who score low agree that they are inclined to feel they are a failure, do not have much to be proud of, wish they had more respect for themselves and at times think they are no good at all. In daily life that shows as discounting achievements, taking criticism hard, and needing more reassurance than others. Self-esteem moves with mood and circumstances, so a low score is a reading of now rather than a fixed fact, and the statement that results describe tendencies applies with full force here.',
		},
	},
	testRetest: 'The University of Maryland page reports test-retest correlations of .82 to .88 and coefficient alpha of .77 to .88 across samples, citing Blascovich and Tomaka (1993) and Rosenberg (1986). No single figure is published for the scale as a whole, so none is stored in the instrument file.',
	related: [
		{ href: '/tests/big-five/', title: 'The Big Five, with the facets', note: 'Self-esteem relates most to neuroticism and extraversion.' },
		{ href: '/traits/neuroticism/', title: 'Neuroticism explained', note: 'The trait most closely tied to self-esteem.' },
		{ href: '/tests/', title: 'All tests', note: 'Grouped by what you want to know.' },
	],
	faqs: [
		{ q: 'What does a Rosenberg score mean?', a: 'Scored one to four per item, the scale runs from 10 to 40; the scale\'s owner also describes scoring from 0 to 30, which is the same minus ten. Higher means higher self-esteem. The owner publishes no percentile norms and says that norms for a sample like yours have to be found in the research literature, so the site draws your score against the possible range and does not invent a comparison.' },
		{ q: 'Is self-esteem the same as confidence?', a: 'No. Confidence is about what you can do; self-esteem is about what you are worth. People can be confident in their work and low in self-esteem, or the reverse.' },
		{ q: 'Does self-esteem change over a lifetime?', a: 'Yes. It moves with mood and events in the short term, and on average rises from adolescence through middle age before declining in old age. Retaking the scale after six months shows your own trend.' },
		{ q: 'Does a low score mean something is wrong?', a: 'No. It is a research measure of how people see themselves, used across whole populations, and a score is not a diagnosis of anything.' },
		{ q: 'Where do my answers go?', a: 'Nowhere. The test is scored in your browser and the result is kept only on this device. If you choose to share a link, your scores are inside the link itself and nothing is sent to this site.' },
	],
};
