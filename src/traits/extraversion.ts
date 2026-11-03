import type { TraitContent } from './content';
import { CITE, siblingsExcept } from './citations';

export const extraversion: TraitContent = {
	path: '/traits/extraversion/',
	title: 'Extraversion explained: what a high or low score means',
	description: 'What extraversion is, what high and low scores look like day to day, its six facets, what the research finds it predicts, and where people fall.',
	name: 'Extraversion',
	subtitle: 'One of the Big Five. Low scores are what people mean by introversion.',
	breadcrumb: 'Extraversion',
	summary: 'Extraversion is the tendency to seek company, stimulation and positive excitement: to be sociable, talkative, assertive, active and cheerful. Introversion is simply the low end of the same scale, not a separate type. Most people are somewhere in the middle, which is why the word ambivert gets used.',
	notMean: [
		'Introversion is not shyness. Shyness is discomfort or fear around people; introversion is a preference for less stimulation and smaller company. Many introverts are socially confident and many extraverts are anxious in groups.',
		'A high score is not a measure of social skill, warmth or how much people like you. The scale measures how much someone seeks out company and activity, not how good they are at it.',
	],
	high: 'People high on extraversion say they make friends easily, love large parties, take charge, are always on the go, seek adventure and radiate joy. In daily life that shows as a wide circle, a liking for doing things with others, speaking before thinking, and energy that rises in a busy room and falls when alone for long.',
	low: 'People low on extraversion say they prefer to be alone, avoid crowds, wait for others to lead the way, like to take it easy and keep others at a distance. In daily life that shows as a small circle of close friends, time alone to recover from social effort, careful speech, and no wish to be the centre of attention.',
	facets: [
		{ name: 'Friendliness', line: 'warmth and ease with other people.', href: '/traits/friendliness/' },
		{ name: 'Gregariousness', line: 'liking for crowds and company.', href: '/traits/gregariousness/' },
		{ name: 'Assertiveness', line: 'taking charge and speaking up.', href: '/traits/assertiveness/' },
		{ name: 'Activity level', line: 'pace of life and keeping busy.', href: '/traits/activity-level/' },
		{ name: 'Excitement-seeking', line: 'appetite for thrills and risk.', href: '/traits/excitement-seeking/' },
		{ name: 'Cheerfulness', line: 'how readily joy and enthusiasm arise.', href: '/traits/cheerfulness/' },
	],
	predicts: [
		{ text: 'Extraversion is the Big Five trait most strongly linked to who emerges as a leader and how effective leaders are rated, with a moderate effect.', cite: CITE.judge2002 },
		{ text: 'It predicts happiness and the number and quality of social relationships, and it is one of the better-replicated trait-outcome links.', cite: CITE.ozer2006 },
		{ text: 'The assertive, dominant side of extraversion rises through young adulthood, while the sociable side changes little.', cite: CITE.roberts2006 },
	],
	strips: [
		{ instrument: 'ipip-neo-120', scale: 'E', label: 'IPIP-NEO-120, extraversion, 24 items', testHref: '/tests/big-five/' },
		{ instrument: 'ipip-50', scale: 'E', label: 'IPIP-50, extraversion, 10 items', testHref: '/tests/big-five/short/' },
	],
	test: { href: '/tests/big-five/', label: 'Take the Big Five test' },
	siblings: siblingsExcept('/traits/extraversion/'),
};
