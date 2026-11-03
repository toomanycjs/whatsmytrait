import type { TraitContent } from './content';
import { CITE, siblingsExcept } from './citations';

export const agreeableness: TraitContent = {
	path: '/traits/agreeableness/',
	title: 'Agreeableness explained: what a high or low score means',
	description: 'What agreeableness is, what high and low scores look like day to day, its six facets, what the research finds it predicts, and where people fall.',
	name: 'Agreeableness',
	subtitle: 'One of the Big Five.',
	breadcrumb: 'Agreeableness',
	summary: 'Agreeableness is the tendency to put other people\'s interests and feelings on a level with your own: to trust, to help, to cooperate, to be modest and to sympathise. People high on it are warm and accommodating; people low on it are sceptical, competitive and blunt. It is the trait that most shapes how someone handles disagreement.',
	notMean: [
		'A low score does not mean being unkind, and it is not what the word disagreeable means in conversation. Low scorers are often loyal, fair and honest; they simply give less weight to other people\'s feelings when deciding what to say or do.',
		'A high score is not a measure of being liked or of being good. Agreeable people can be taken advantage of, avoid conflicts that need having, and say yes when they mean no.',
	],
	high: 'People high on agreeableness say they trust others, love to help, sympathise with those worse off, avoid fights and do not think highly of themselves. In daily life that shows as being the one others confide in, giving way in arguments, finding it hard to refuse, and assuming good intentions until proved otherwise.',
	low: 'People low on agreeableness say they distrust people, are indifferent to others\' feelings, love a good fight, think highly of themselves and use others for their own ends. In daily life that shows as blunt feedback, hard negotiation, scepticism of motives, comfort with conflict, and a small number of relationships that run deep.',
	facets: [
		{ name: 'Trust', line: 'assuming good intentions in others.' },
		{ name: 'Morality', line: 'straightforwardness and not using people.' },
		{ name: 'Altruism', line: 'wanting to help.' },
		{ name: 'Cooperation', line: 'avoiding conflict and getting along.' },
		{ name: 'Modesty', line: 'not thinking oneself better than others.' },
		{ name: 'Sympathy', line: 'feeling for people who are worse off.' },
	],
	predicts: [
		{ text: 'Agreeableness predicts relationship satisfaction, less conflict with partners and peers, and volunteering, with small to moderate effects.', cite: CITE.ozer2006 },
		{ text: 'Its link to job performance is weak and depends on the job, unlike conscientiousness.', cite: CITE.barrick1991 },
		{ text: 'On average people become more agreeable through adulthood, especially after fifty.', cite: CITE.roberts2006 },
	],
	strips: [
		{ instrument: 'ipip-neo-120', scale: 'A', label: 'IPIP-NEO-120, agreeableness, 24 items', testHref: '/tests/big-five/' },
		{ instrument: 'ipip-50', scale: 'A', label: 'IPIP-50, agreeableness, 10 items', testHref: '/tests/big-five/short/' },
	],
	test: { href: '/tests/big-five/', label: 'Take the Big Five test' },
	siblings: siblingsExcept('/traits/agreeableness/'),
};
