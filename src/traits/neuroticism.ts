import type { TraitContent } from './content';
import { CITE, siblingsExcept } from './citations';

export const neuroticism: TraitContent = {
	path: '/traits/neuroticism/',
	title: 'Neuroticism explained: what a high or low score means',
	description: 'What neuroticism is, what high and low scores look like day to day, its six facets, what the research finds it predicts, and where people fall.',
	name: 'Neuroticism',
	subtitle: 'One of the Big Five. The 50-item markers score the same trait the other way up, as emotional stability.',
	breadcrumb: 'Neuroticism',
	summary: 'Neuroticism is how readily negative feelings arise and how long they last: worry, irritation, low mood, self-consciousness and the sense of being overwhelmed. Emotional stability is the same scale read from the other end. High scorers feel setbacks keenly and take longer to settle; low scorers stay calm and recover quickly. It is a tendency everyone has to some degree, and the average person sits in the middle.',
	notMean: [
		'A high score is not a diagnosis of anything, and the scale is not a screening tool. It describes how often and how strongly feelings arise in ordinary life, measured by self-report, across a whole population. Most people with high scores live ordinary lives, and sensitivity brings its own strengths: noticing problems early, taking care, feeling for others.',
		'A low score is not coldness. People low on neuroticism have the full range of emotions; they return to baseline faster.',
	],
	high: 'People high on neuroticism say they worry about things, get irritated easily, often feel blue, find it difficult to approach others, go on binges and panic easily. In daily life that shows as careful planning for what might go wrong, sensitivity to criticism, moods that others can read, and a slow recovery after a bad day.',
	low: 'People low on neuroticism say they are not easily annoyed, feel comfortable with themselves, are not bothered by difficult social situations, resist temptations easily and remain calm under pressure. In daily life that shows as being the steady one in a crisis, not dwelling on what went wrong, and sleeping soundly.',
	facets: [
		{ name: 'Anxiety', line: 'how readily worry and apprehension arise.' },
		{ name: 'Anger', line: 'how readily irritation and temper arise.' },
		{ name: 'Depression', line: 'how readily low mood and discouragement arise.' },
		{ name: 'Self-consciousness', line: 'discomfort under other people\'s attention.' },
		{ name: 'Immoderation', line: 'difficulty resisting cravings and urges.' },
		{ name: 'Vulnerability', line: 'feeling overwhelmed under pressure.' },
	],
	predicts: [
		{ text: 'Neuroticism predicts lower life satisfaction and more strain in close relationships, among the most consistent findings in the field.', cite: CITE.ozer2006 },
		{ text: 'Those links replicated in a pre-registered test across 78 trait-outcome pairs, with small to moderate effects.', cite: CITE.soto2019 },
		{ text: 'On average people become more emotionally stable from their twenties onward.', cite: CITE.roberts2006 },
	],
	strips: [
		{ instrument: 'ipip-neo-120', scale: 'N', label: 'IPIP-NEO-120, neuroticism, 24 items', testHref: '/tests/big-five/' },
		{ instrument: 'ipip-50', scale: 'S', label: 'IPIP-50, emotional stability, 10 items (the other way up)', testHref: '/tests/big-five/short/' },
	],
	test: { href: '/tests/big-five/', label: 'Take the Big Five test' },
	siblings: siblingsExcept('/traits/neuroticism/'),
};
