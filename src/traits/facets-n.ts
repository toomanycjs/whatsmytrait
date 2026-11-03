// The six facets of neuroticism. Names are the authors' own (decision 0003).
import type { FacetSpec } from './facet';
import { CITE } from './citations';

export const FACETS_N: FacetSpec[] = [
	{
		id: 'N1', name: 'Worry', publishedName: 'Anxiety', domain: 'N',
		summary: 'The first facet of neuroticism is how readily worry and apprehension arise: whether a person tends to fear the worst, to feel stressed by ordinary pressures and to carry a list of things that might go wrong. It is a tendency everyone has in some degree, and most people sit in the middle of the range.',
		notMean: [
			'A high score is not a diagnosis, and the scale does not test for any condition. It records how often a person says they worry and feel under stress, compared with a large sample of other people, and nothing more. Many high scorers are careful planners whose worry does useful work.',
			'A low score is not courage, and it is not indifference. People low on this facet feel fear when there is something to fear; it simply does not arrive early or stay long.',
		],
		high: 'People high on this facet say they worry about things, fear for the worst, are afraid of many things and get stressed out easily. In daily life that shows as rehearsing what might go wrong, checking and re-checking, finding deadlines and uncertainty draining, and a mind that is hard to switch off at night.',
		low: 'People low on this facet say they seldom worry, do not expect the worst and take pressure in their stride. In daily life that shows as calm before an exam or an interview, little need for reassurance, and a habit of dealing with problems when they arrive rather than in advance. Others sometimes read this as not taking things seriously enough.',
		predicts: [
			{ text: 'In a meta-analysis of personality and well-being, every neuroticism facet related to lower life satisfaction and happiness, with this facet among the stronger of the six.', cite: CITE.anglim2020 },
			{ text: 'This facet groups with self-consciousness, vulnerability and the low-mood facet into the aspect of neuroticism called withdrawal, as distinct from the anger and immoderation side called volatility.', cite: CITE.deyoung2007 },
			{ text: 'On average people become more emotionally stable from their twenties onward, so a high score at twenty is likely to be a lower one at fifty.', cite: CITE.roberts2006 },
		],
	},
	{
		id: 'N2', name: 'Anger', domain: 'N',
		summary: 'The second facet of neuroticism is how readily irritation and temper arise: how much it takes to annoy a person, and how quickly annoyance becomes anger. It says nothing about what the person does with the anger, which depends on other traits, above all agreeableness.',
		notMean: [
			'A high score is not aggression, and it is not unkindness. The facet measures the feeling, not the behaviour: many people who are quick to anger are also quick to cool, and never raise a hand or a voice. Whether anger is expressed, and how, depends more on agreeableness than on this facet.',
			'A low score is not passivity. Slow-to-anger people have views and defend them; they are harder to provoke.',
		],
		high: 'People high on this facet say they get angry easily, get irritated easily and lose their temper. In daily life that shows as flashes of frustration in traffic and queues, sharp words regretted later, and a low threshold for other people\'s slowness or carelessness. The patience test on this site measures the mirror image.',
		low: 'People low on this facet say they are not easily annoyed and rarely lose their temper. In daily life that shows as calm when things go wrong, arguments that do not escalate, and a tolerance of other people\'s mistakes that can look like indifference but usually is not.',
		predicts: [
			{ text: 'Anger relates to high neuroticism and to low agreeableness, and the two combine: people high on one and low on the other report the most anger.', cite: CITE.pease2015 },
			{ text: 'This facet and immoderation form the volatility aspect of neuroticism, which behaves differently from the withdrawal aspect made of worry, low mood and self-consciousness.', cite: CITE.deyoung2007 },
			{ text: 'Women score a little higher than men on volatility on average, in a large internet sample.', cite: CITE.weisberg2011 },
		],
	},
	{
		id: 'N3', name: 'Low mood', publishedName: 'Depression', domain: 'N',
		summary: 'The third facet of neuroticism is how readily low mood and discouragement arise: whether a person often feels blue, is hard on themselves and struggles to feel comfortable in their own skin. It is a trait facet scored across a whole population, where most people sit in the middle.',
		notMean: [
			'A high score is not a diagnosis, and the scale does not test for any condition. It records how often a person says they feel low and how they feel about themselves, compared with a large sample of other people. It is a tendency, not a state, and a score is a comparison, not a verdict.',
			'A low score is not cheerfulness, which is a facet of extraversion. Low scorers are comfortable with themselves and rarely feel blue; how much joy they feel is a separate question.',
		],
		high: 'People high on this facet say they often feel blue, are often down in the dumps and are not comfortable with themselves. In daily life that shows as a harsh inner critic, a tendency to read setbacks as evidence about oneself, and moods that take time to lift. Many high scorers are also the most reflective and self-aware people in a room.',
		low: 'People low on this facet say they feel comfortable with themselves and rarely feel blue. In daily life that shows as taking criticism as information rather than as a verdict, bouncing back from a bad week, and a settled sense of being all right as they are.',
		predicts: [
			{ text: 'Of all thirty facets, this one is the strongest single correlate of lower life satisfaction and happiness, and cheerfulness, its counterpart in extraversion, the strongest correlate of higher.', cite: CITE.anglim2020 },
			{ text: 'Self-esteem and this side of neuroticism are so closely related that one large study treats them, with self-efficacy and locus of control, as indicators of a single core self-evaluation.', cite: CITE.judgeErez2002 },
			{ text: 'Neuroticism falls on average through adulthood, with most of the change before middle age.', cite: CITE.roberts2006 },
		],
	},
	{
		id: 'N4', name: 'Self-consciousness', domain: 'N',
		summary: 'The fourth facet of neuroticism is discomfort under other people\'s attention: being easily embarrassed, finding it hard to approach strangers, and feeling at ease only with people one knows. It is the facet closest to what people mean by shyness, and it is distinct from introversion.',
		notMean: [
			'It is not introversion. Introversion is a preference for less company; self-consciousness is unease when company is unfamiliar or watching. The two are only loosely related, and the site measures them on different scales: a shy extravert wants company and finds it hard, a confident introvert finds it easy and wants less of it.',
			'A high score is not a lack of social skill. Many high scorers are observant, tactful and well liked; they feel the attention more than others do.',
		],
		high: 'People high on this facet say they find it difficult to approach others, are afraid to draw attention to themselves and only feel comfortable with friends. In daily life that shows as rehearsing a phone call before making it, avoiding the front of a room, blushing easily, and relief when a social event is cancelled.',
		low: 'People low on this facet say they are not bothered by difficult social situations and are comfortable approaching strangers. In daily life that shows as speaking first, taking criticism in public without visible discomfort, and not minding being watched. It is sometimes mistaken for extraversion, which is a different thing.',
		predicts: [
			{ text: 'Shyness and sociability are separate dimensions: a person can be shy and want company, or unsociable and at ease. The classic demonstration found the two only modestly correlated.', cite: CITE.cheek1981 },
			{ text: 'This facet belongs to the withdrawal aspect of neuroticism, with worry, low mood and vulnerability, rather than to the volatility aspect of anger and immoderation.', cite: CITE.deyoung2007 },
			{ text: 'It relates to lower life satisfaction, as every neuroticism facet does, with a smaller effect than the low-mood facet.', cite: CITE.anglim2020 },
		],
	},
	{
		id: 'N5', name: 'Immoderation', domain: 'N',
		summary: 'The fifth facet of neuroticism is difficulty resisting cravings and urges: whether a person tends to overindulge, to go on binges and to give in to temptation when it is in front of them. It sits in neuroticism because the urge is felt as a pressure that is hard to bear, not because it is about mood.',
		notMean: [
			'A high score is not a verdict on willpower or character, and it is not a diagnosis of anything. The scale asks how a person feels about cravings and temptation in ordinary life; it does not ask about any particular habit, and it cannot tell a love of food from a love of shopping.',
			'A low score is not asceticism. People who easily resist temptation can still enjoy things; they stop when they mean to.',
		],
		high: 'People high on this facet say they go on binges, find it hard to resist temptations and struggle to control their cravings. In daily life that shows as a second helping, an open tab at midnight, a purchase that was not planned, and a resolution that lasts until the thing is in reach. Many high scorers are also the most generous and spontaneous people they know.',
		low: 'People low on this facet say they rarely overindulge, easily resist temptations and can control their cravings. In daily life that shows as leaving half a dessert, buying only what was on the list, and stopping at one. Others sometimes find this restraint a little joyless.',
		predicts: [
			{ text: 'In the model of impulsivity built on the Big Five, this facet marks urgency, the tendency to act rashly when feelings run high, which is distinct from the sensation seeking of excitement-seeking and the lack of planning of low cautiousness.', cite: CITE.whiteside2001 },
			{ text: 'This facet and anger form the volatility aspect of neuroticism, which varies separately from the withdrawal aspect.', cite: CITE.deyoung2007 },
		],
	},
	{
		id: 'N6', name: 'Vulnerability', domain: 'N',
		summary: 'The sixth facet of neuroticism is feeling overwhelmed under pressure: whether a person tends to panic when things go wrong, to feel that events are too much for them, and to struggle to think clearly in a crisis. Its opposite is the composure of people who get calmer as things get worse.',
		notMean: [
			'A high score is not weakness, and it is not a diagnosis. It describes how a person says they feel when pressure is high, compared with other people. Many high scorers are highly capable in ordinary conditions and know to avoid roles built around emergencies; that is self-knowledge, not failure.',
			'A low score is not competence. Staying calm and knowing what to do are different things, and the scale measures only the first.',
		],
		high: 'People high on this facet say they panic easily, become overwhelmed by events and feel unable to deal with things. In daily life that shows as freezing when several things go wrong at once, needing someone else to take charge in a crisis, and dread of being the one responsible when it matters.',
		low: 'People low on this facet say they remain calm under pressure and feel able to deal with whatever comes. In daily life that shows as being the steady one when a plan falls apart, thinking clearly in an emergency, and a reputation for being unflappable, which can hide how much is going on underneath.',
		predicts: [
			{ text: 'The sense of being able to deal with things, which this facet measures from the negative side, is close to what the self-efficacy facet of conscientiousness measures from the positive side; one large study treats neuroticism, self-esteem and self-efficacy as indicators of a single core self-evaluation.', cite: CITE.judgeErez2002 },
			{ text: 'It belongs to the withdrawal aspect of neuroticism and relates to lower life satisfaction and happiness, with a moderate effect.', cite: CITE.anglim2020 },
			{ text: 'Emotional stability rises on average through adulthood, so a high score tends to fall with age.', cite: CITE.roberts2006 },
		],
	},
];
