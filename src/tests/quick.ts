import type { TestContent } from './content';

const tipiScale = (name: string, low: string, mid: string, high: string, highText: string, lowText: string, traitPath: string) => ({
	name, means: { low, mid, high }, high: highText, low: lowText, traitPath,
});

export const quick: TestContent = {
	instrument: 'tipi',
	path: '/tests/quick/',
	title: 'Quick Big Five test: 10 items, one minute, free',
	description: 'The Ten-Item Personality Inventory, a one-minute Big Five measure scored on your device, with each trait shown on a strip.',
	question: 'The Big Five in one minute',
	subtitle: 'Ten-Item Personality Inventory, 10 items, 1 minute',
	breadcrumb: 'Quick test',
	minutes: 1,
	scales: {
		E: tipiScale('Extraversion', 'You rate yourself as more reserved than extraverted.', 'You rate yourself as neither especially extraverted nor reserved.', 'You rate yourself as extraverted and enthusiastic.',
			'A high score means you agreed that extraverted and enthusiastic describes you and disagreed that reserved and quiet does. With two items the scale can only place you roughly; the fifty-item test is far more precise and the trait page explains what extraversion covers.',
			'A low score means you agreed that reserved and quiet describes you more than extraverted and enthusiastic. Introversion is the low end of this scale, not a type, and it is not shyness. Take the longer tests for a precise position.', '/traits/extraversion/'),
		A: tipiScale('Agreeableness', 'You rate yourself as more critical than warm.', 'You rate yourself as neither especially warm nor critical.', 'You rate yourself as sympathetic and warm.',
			'A high score means you agreed that sympathetic and warm describes you and disagreed that critical and quarrelsome does. This is the TIPI\'s weakest scale (alpha .40), so treat it as a rough pointer.',
			'A low score means you agreed that critical and quarrelsome describes you more than sympathetic and warm. Low agreeableness is scepticism and bluntness, not unkindness. The longer tests measure it with ten or twenty-four items.', '/traits/agreeableness/'),
		C: tipiScale('Conscientiousness', 'You rate yourself as more disorganised than dependable.', 'You rate yourself as neither especially dependable nor disorganised.', 'You rate yourself as dependable and self-disciplined.',
			'A high score means you agreed that dependable and self-disciplined describes you and disagreed that disorganized and careless does. The longer tests separate orderliness, self-discipline and achievement-striving, which this cannot.',
			'A low score means you agreed that disorganized and careless describes you more than dependable and self-disciplined. It says nothing about talent or how hard you work when something interests you.', '/traits/conscientiousness/'),
		S: tipiScale('Emotional stability', 'You rate yourself as more anxious and easily upset than calm.', 'You rate yourself as neither especially calm nor easily upset.', 'You rate yourself as calm and emotionally stable.',
			'A high score means you agreed that calm and emotionally stable describes you and disagreed that anxious and easily upset does. The trait is the other side of neuroticism, which the 120-item test scores with six facets.',
			'A low score means you agreed that anxious and easily upset describes you more than calm and emotionally stable. It describes how readily feelings arise, measured across a whole population; it is not a diagnosis.', '/traits/neuroticism/'),
		O: tipiScale('Openness to experiences', 'You rate yourself as more conventional than open to new experiences.', 'You rate yourself as neither especially open nor conventional.', 'You rate yourself as open to new experiences and complex.',
			'A high score means you agreed that open to new experiences and complex describes you and disagreed that conventional and uncreative does. Openness is appetite for ideas, art and novelty, not intelligence.',
			'A low score means you agreed that conventional and uncreative describes you more than open to new experiences and complex. Practical, settled people solve problems every day; the scale measures appetite for the new, not ability.', '/traits/openness/'),
	},
	testRetest: 'Gosling, Rentfrow and Swann (2003) report six-week test-retest reliabilities of .77 (extraversion), .71 (agreeableness), .76 (conscientiousness), .70 (emotional stability) and .62 (openness), and alphas of .68, .40, .50, .73 and .45. Two-item scales are expected to have low alpha; the authors recommend judging the TIPI by its test-retest reliability and its convergence with longer measures, and using it only where a longer measure is not practical.',
	related: [
		{ href: '/tests/big-five/short/', title: 'The Big Five in five minutes', note: 'Fifty items, with published norms and percentiles.' },
		{ href: '/tests/big-five/', title: 'The Big Five, with the facets', note: 'The full picture: 120 items, thirty facets.' },
		{ href: '/traits/', title: 'The five traits explained', note: 'One page per trait.' },
	],
	faqs: [
		{ q: 'How accurate is a ten-item personality test?', a: 'Rough but real. Each trait is measured by two pairs of adjectives, so the scale is coarse and its internal consistency is low, as the authors expected. Its test-retest reliability over six weeks is .62 to .77 and it correlates well with longer Big Five measures. Use it for a quick position and the longer tests when the result matters.' },
		{ q: 'Why is the scale one to seven?', a: 'Each trait score is the average of its two items, each rated from 1 (disagree strongly) to 7 (agree strongly), with one item reverse scored. The authors publish means and standard deviations by sex but no percentile table, so the site draws your score against the one-to-seven range and does not invent percentiles.' },
		{ q: 'Which test should I take instead?', a: 'The fifty-item test if you have five minutes and want percentiles; the 120-item test if you have twelve minutes and want the thirty facets.' },
		{ q: 'Where do my answers go?', a: 'Nowhere. The test is scored in your browser and the result is kept only on this device. If you choose to share a link, your scores are inside the link itself and nothing is sent to this site.' },
	],
};
