import type { TestContent } from './content';

const c = (name: string, low: string, mid: string, high: string, highText: string, lowText: string) => ({ name, means: { low, mid, high }, high: highText, low: lowText });

export const emotionalIntelligence: TestContent = {
	instrument: 'ipip-ei',
	path: '/tests/emotional-intelligence/',
	title: 'Emotional intelligence test: 7 components, 68 items, free',
	description: 'A free 68-item measure of seven components of trait emotional intelligence from the IPIP, scored on your device in seven minutes, each shown on a strip.',
	question: 'How do I handle emotions?',
	subtitle: 'IPIP emotional intelligence components, 68 items, 7 minutes',
	breadcrumb: 'Emotional intelligence',
	scales: {
		PE: c('Positive expressivity', 'You tend to keep happy feelings to yourself.', 'You show happiness about as openly as most people.', 'You tend to show happiness and affection openly.',
			'People who score high say they express affection physically, laugh out loud, hug close friends and show their feelings when happy. In daily life that shows as warmth that is easy to read, laughter that others catch, and no hesitation in saying what someone means to them. It is about expression, not how much is felt.',
			'People who score low say they keep their happy feelings to themselves and find it difficult to show that they care. In daily life that shows as affection expressed in deeds rather than words, and warmth that takes longer to read. Low expressivity is not low feeling; many reserved people feel as much and show less.'),
		NE: c('Negative expressivity', 'You tend to hide anger, fear and sadness.', 'You show negative feelings about as much as most people.', 'You tend to show anger, fear and sadness when you feel them.',
			'People who score high say they show their fear and sadness, look upset when something bad happens and shout when angry. In daily life that shows as moods others can see at once, and little pretence. The cost is that others know when you are struggling; the benefit is that they can help.',
			'People who score low say they keep their feelings to themselves however unhappy or scared they are, rarely show anger and wish they could show negative feelings more easily. In daily life that shows as composure others may read as calm or as distance. It is a style of expression, not an absence of feeling.'),
		AE: c('Attending to emotions', 'You tend not to think much about how you feel.', 'You notice and think about your feelings about as much as most people.', 'You tend to notice your feelings and think about where they come from.',
			'People who score high say they pay attention to their feelings, notice their emotions, think about their causes and often stop to analyse how they feel. In daily life that shows as a rich vocabulary for moods and an interest in why. The cost is dwelling; the benefit is knowing what is going on inside before acting on it.',
			'People who score low say they rarely think about how they feel, rarely analyse their emotions and often ignore their feelings. In daily life that shows as getting on with things, and sometimes not knowing why a mood has arrived. It is not a lack of feeling and can be a practical strength when action matters more than reflection.'),
		ED: c('Emotion-based decision-making', 'You tend to decide by logic and facts rather than feelings.', 'You weigh feelings and logic about equally when deciding.', 'You tend to decide by feeling and inspiration rather than logic.',
			'People who score high say they listen to their feelings when making important decisions, base their goals on inspiration rather than logic and listen to their heart rather than their brain. In daily life that shows as choices that feel right before they can be justified, and a distrust of plans that look good on paper but feel wrong.',
			'People who score low say they plan their lives logically, believe important decisions should be based on reasoning and make decisions on facts, not feelings. In daily life that shows as lists of pros and cons, and a wariness of being swayed by mood. Neither style is the better one; each catches what the other misses.'),
		RJ: c('Responsive joy', 'Other people\'s happiness tends not to move you much.', 'You catch other people\'s good moods about as much as most people.', 'You tend to catch other people\'s joy and excitement.',
			'People who score high say they feel other people\'s joy, get caught up when others celebrate, end up laughing when the people around them laugh and like to watch children open presents. In daily life that shows as being good company at celebrations and lifted by a happy room.',
			'People who score low say they are unaffected by other people\'s happiness, rarely get caught up in the excitement and dislike being around happy people when they feel sad. In daily life that shows as a mood that holds its own course regardless of the room. It is independence of mood, not coldness.'),
		RD: c('Responsive distress', 'Other people\'s suffering tends not to upset you much.', 'You are moved by others\' misfortunes about as much as most people.', 'You tend to be deeply moved by other people\'s suffering.',
			'People who score high say they are deeply moved by others\' misfortunes, easily moved to tears, upset by the misfortunes of strangers and would be upset to see an injured animal. In daily life that shows as crying at films, being affected by news, and feeling others\' pain as their own. The cost is carrying it.',
			'People who score low say they are calm even in tense situations, not easily disturbed by events, unaffected by the suffering of others and remain calm during emergencies. In daily life that shows as steadiness when others are upset, which is valuable in a crisis. It is about what is felt, not what is done to help.'),
		EC: c('Empathic concern', 'You tend to feel little concern for people you do not know.', 'You feel concern for others about as much as most people.', 'You tend to feel concern and sympathy for other people, including strangers.',
			'People who score high say they are concerned about others, feel sympathy for those worse off than themselves, sympathise with the homeless and believe the poor deserve sympathy. In daily life that shows as giving, volunteering and taking the side of the underdog. It overlaps with agreeableness in the Big Five.',
			'People who score low say they feel little concern for others, have little sympathy for the unemployed, look down on weakness and do not like getting involved in other people\'s problems. In daily life that shows as a firm line between their affairs and others\'. It is a stance about responsibility, not a measure of kindness to those close to them.'),
	},
	testRetest: 'The IPIP key page gives coefficient alpha per scale for women and men separately (from .59 to .83) and no test-retest figure. These scales measure trait emotional intelligence, how people describe their own emotional style; they do not measure emotional ability, which needs performance tasks.',
	related: [
		{ href: '/tests/big-five/', title: 'The Big Five, with the facets', note: 'Several components overlap with agreeableness and neuroticism.' },
		{ href: '/tests/interpersonal-style/', title: 'What is my interpersonal style?', note: 'How you come across to others.' },
		{ href: '/tests/', title: 'All tests', note: 'Grouped by what you want to know.' },
	],
	faqs: [
		{ q: 'What is the difference between trait and ability emotional intelligence?', a: 'Trait emotional intelligence is how people describe their own emotional style, measured by self-report like this test. Ability emotional intelligence is how well people actually perceive and reason about emotions, measured with tasks that have right answers. The two correlate only weakly. This test measures the first.' },
		{ q: 'Is there one emotional intelligence score?', a: 'Not here. Barchard\'s analysis found seven distinct components that do not add up to one thing, so the site reports seven strips and no total. A high score on one component says nothing about the others.' },
		{ q: 'Is high emotional intelligence always good?', a: 'No. High responsive distress means carrying other people\'s pain; high negative expressivity means everyone knows when you are angry. Each component has costs at each end, and the site never codes scores as good or bad.' },
		{ q: 'Why no percentiles?', a: 'No norm sample is published for these scales and the site never estimates one. Your markers are drawn against the possible range.' },
		{ q: 'Where do my answers go?', a: 'Nowhere. The test is scored in your browser and the result is kept only on this device.' },
	],
};
