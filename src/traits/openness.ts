import type { TraitContent } from './content';
import { CITE, siblingsExcept } from './citations';

export const openness: TraitContent = {
	path: '/traits/openness/',
	title: 'Openness to experience explained: high and low scores',
	description: 'What openness to experience is, what high and low scores look like day to day, its six facets, what the research finds it predicts, and where people fall.',
	name: 'Openness to experience',
	subtitle: 'One of the Big Five. Called intellect or imagination in the 50-item markers.',
	breadcrumb: 'Openness',
	summary: 'Openness to experience is the breadth of a person\'s appetite for ideas, art, feelings, novelty and variety. People high on it are curious and imaginative and like the unfamiliar; people low on it prefer the practical, the proven and the plain. It is the trait that most reliably separates people who seek out the new from people who are content with what works.',
	notMean: [
		'It is not intelligence. The scale asks what people enjoy and how they see themselves, not how well they think, and the overlap with measured ability is modest. Nor is a low score a lack of imagination in any useful sense: practical people solve problems every day, they just do not describe themselves as dreamers.',
		'It is not a measure of being open-minded in the everyday sense of fair or tolerant. A person can be high on openness and stubborn, or low on it and generous to other views.',
	],
	high: 'People high on openness say they have a vivid imagination, love to read challenging material, see beauty where others do not, prefer variety to routine and experience their emotions intensely. In daily life that shows as a wide range of interests, a taste for art, music and ideas, boredom with repetition, and a readiness to question conventions, including political ones.',
	low: 'People low on openness say they prefer to stick with what they know, dislike changes, avoid philosophical discussions and have little interest in art museums or poetry. In daily life that shows as settled habits, practical judgement, a liking for clear rules and familiar places, and impatience with speculation. Many low scorers are expert at the concrete work they have chosen.',
	facets: [
		{ name: 'Imagination', line: 'how much a person lives in fantasy and daydream rather than only in the concrete present.' },
		{ name: 'Artistic interests', line: 'liking for art, music, poetry and beauty.' },
		{ name: 'Emotionality', line: 'how strongly feelings are experienced and noticed.' },
		{ name: 'Adventurousness', line: 'preference for variety and new experiences over routine.' },
		{ name: 'Intellect', line: 'enjoyment of ideas, abstract discussion and challenging reading.' },
		{ name: 'Liberalism', line: 'readiness to question convention and authority.' },
	],
	predicts: [
		{ text: 'Across the Big Five, openness has the weakest links to health, work and relationship outcomes; its clearest correlates are political attitudes, creative and artistic pursuits, and the breadth of a person\'s interests.', cite: CITE.ozer2006 },
		{ text: 'In a pre-registered replication of 78 trait-outcome links, those involving openness replicated at about the same rate as the others, with small effects.', cite: CITE.soto2019 },
		{ text: 'Openness rises in young adulthood and falls a little in old age, on average.', cite: CITE.roberts2006 },
	],
	strips: [
		{ instrument: 'ipip-neo-120', scale: 'O', label: 'IPIP-NEO-120, openness, 24 items', testHref: '/tests/big-five/' },
		{ instrument: 'ipip-50', scale: 'I', label: 'IPIP-50, intellect or imagination, 10 items', testHref: '/tests/big-five/short/' },
	],
	test: { href: '/tests/big-five/', label: 'Take the Big Five test' },
	siblings: siblingsExcept('/traits/openness/'),
};
