import type { TraitContent } from './content';
import { CITE, siblingsExcept } from './citations';

export const conscientiousness: TraitContent = {
	path: '/traits/conscientiousness/',
	title: 'Conscientiousness explained: what a high or low score means',
	description: 'What conscientiousness is, what high and low scores look like day to day, its six facets, what the research finds it predicts, and where people fall.',
	name: 'Conscientiousness',
	subtitle: 'One of the Big Five.',
	breadcrumb: 'Conscientiousness',
	summary: 'Conscientiousness is the tendency to be organised, persistent, careful and dutiful: to plan, to finish, to keep things in order and to think before acting. It is the Big Five trait with the broadest record of predicting how people do at work and how long they live, and the one most people wish they had more of.',
	notMean: [
		'A high score is not a verdict on talent, and a low score is not laziness. The scale measures how people organise their effort, not how much they have or how good the result is. Many low scorers do excellent work when it interests them, in bursts, late.',
		'It is not the same as worrying about getting things wrong. A very conscientious person can be relaxed; the trait is about habits of order and persistence, not worry.',
	],
	high: 'People high on conscientiousness say they are always prepared, like to tidy up, keep their promises, work hard, carry out their plans and avoid rash decisions. In daily life that shows as punctuality, lists, tidy spaces, a steady pace, and a reputation for reliability. The costs are a difficulty relaxing, delegating or improvising.',
	low: 'People low on conscientiousness say they leave a mess, break rules, waste time, do just enough to get by and jump into things without thinking. In daily life that shows as flexibility, spontaneity, last-minute finishes, and a tolerance for clutter that would bother others. The costs are missed deadlines and the irritation of more orderly people.',
	facets: [
		{ name: 'Self-efficacy', line: 'confidence in one\'s ability to get things done.', href: '/traits/self-efficacy/' },
		{ name: 'Orderliness', line: 'liking for tidiness and things in their place.', href: '/traits/orderliness/' },
		{ name: 'Dutifulness', line: 'keeping promises and following rules.', href: '/traits/dutifulness/' },
		{ name: 'Achievement-striving', line: 'working hard and aiming high.', href: '/traits/achievement-striving/' },
		{ name: 'Self-discipline', line: 'starting tasks and carrying them through.', href: '/traits/self-discipline/' },
		{ name: 'Cautiousness', line: 'thinking before acting.', href: '/traits/cautiousness/' },
	],
	predicts: [
		{ text: 'Conscientiousness is the one Big Five trait that predicts job performance across occupational groups, with a modest but consistent effect.', cite: CITE.barrick1991 },
		{ text: 'It predicts longevity, divorce and occupational attainment about as well as socioeconomic status and cognitive ability do, across many longitudinal studies.', cite: CITE.roberts2007 },
		{ text: 'On average people become more conscientious through their twenties and thirties and keep rising into old age.', cite: CITE.roberts2006 },
	],
	strips: [
		{ instrument: 'ipip-neo-120', scale: 'C', label: 'IPIP-NEO-120, conscientiousness, 24 items', testHref: '/tests/big-five/' },
		{ instrument: 'ipip-50', scale: 'C', label: 'IPIP-50, conscientiousness, 10 items', testHref: '/tests/big-five/short/' },
	],
	test: { href: '/tests/big-five/', label: 'Take the Big Five test' },
	siblings: siblingsExcept('/traits/conscientiousness/'),
};
