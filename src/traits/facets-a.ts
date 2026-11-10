// The six facets of agreeableness.
import type { FacetSpec } from './facet';
import { CITE } from './citations';

export const FACETS_A: FacetSpec[] = [
	{
		id: 'A1', name: 'Trust', domain: 'A',
		summary: 'The first facet of agreeableness is assuming good intentions in other people: taking what they say at face value, expecting fair dealing, and giving the benefit of the doubt. The site also measures it on its own with ten items. It is a disposition towards people in general, not an assessment of any particular person.',
		notMean: [
			'A high score is not naivety, and a low score is not cynicism as a flaw. Trusting people are often right, because most people are trustworthy; distrustful people are harder to deceive. The facet measures the default assumption, which each person then adjusts to the evidence.',
			'A low score does not mean a person is untrustworthy themselves. Trust and trustworthiness are different things and only loosely related.',
		],
		high: 'People high on this facet say they trust others, believe that others have good intentions and trust what people say. In daily life that shows as lending without a second thought, taking a story as told, assuming the late reply was an accident, and being surprised when let down.',
		low: 'People low on this facet say they distrust people and doubt what they are told. In daily life that shows as checking the small print, waiting to see what someone does before believing what they say, and keeping a little back until people have proved themselves. Low scorers are rarely conned.',
		items: [
			'whether your starting assumption about people is good faith.',
			'whether you read what people do as well meant.',
			'whether you take people at their word.',
			'whether suspicion comes first.',
		],
		predicts: [
			{ text: 'A survey measure of the propensity to trust predicted how much people actually handed to a stranger in a trust game, and trust and trustworthiness proved to be distinct.', cite: CITE.evans2008 },
			{ text: 'Agreeableness rises on average through adulthood, especially after fifty.', cite: CITE.roberts2006 },
		],
	},
	{
		id: 'A2', name: 'Morality', domain: 'A',
		summary: 'The second facet of agreeableness is straightforwardness and not using people: dealing honestly, not cheating to get ahead, and not treating other people as a means to an end. The authors call it morality. All four items are keyed in reverse, so a high score means denying the four kinds of exploitation they describe.',
		notMean: [
			'A low score is not a verdict on a person\'s character, and a high score is not proof of virtue. The items ask whether a person admits to using, cheating and obstructing others; people differ in how frankly they answer, and a candid answer can score lower than a flattering one.',
			'This facet is not the whole of honesty. Keeping promises and telling the truth are measured by dutifulness, a facet of conscientiousness.',
		],
		high: 'People high on this facet say they do not use others for their own ends, do not cheat to get ahead and do not take advantage of people. In daily life that shows as straight dealing in negotiation, declining an edge that would cost someone else, and discomfort with flattery and manoeuvring even when they work.',
		low: 'People low on this facet admit, more than most, to using others, cutting corners and getting in people\'s way when it suits them. In daily life that shows as a strategic view of other people, comfort with hard bargaining, and a belief that everyone is playing the same game. Many low scorers are candid about it, which is its own kind of honesty.',
		items: [
			'whether people are a means to what you want.',
			'whether you would bend the rules for an advantage.',
			'whether you take an opening someone else has left.',
			'whether you get in other people\'s way.',
		],
		predicts: [
			{ text: 'Of the Big Five facets, straightforwardness and modesty are the two that most closely track the honesty-humility factor of the six-factor HEXACO model.', cite: CITE.ashtonLee2005 },
			{ text: 'Straightforwardness, cooperation and modesty form the politeness aspect of agreeableness, as distinct from the compassion aspect made of sympathy and altruism.', cite: CITE.deyoung2007 },
		],
	},
	{
		id: 'A3', name: 'Altruism', domain: 'A',
		summary: 'The third facet of agreeableness is wanting to help: loving to be of use, being concerned about other people, and making time for them. It is the active, generous side of agreeableness, where sympathy is the feeling side and cooperation the peaceable side.',
		notMean: [
			'A low score is not selfishness as a moral failing. Low scorers help when asked and take care of their own; they do not seek out opportunities to help and do not feel a pull towards other people\'s needs. That is a disposition, not a character reference.',
			'A high score is not self-sacrifice. Helpful people often enjoy helping and are good at it; the cost is finding it hard to say no.',
		],
		high: 'People high on this facet say they love to help others and are concerned about them. In daily life that shows as being the first to offer, noticing who needs a hand, volunteering, and a diary filled with other people\'s errands. Others rely on them, sometimes too much.',
		low: 'People low on this facet say they are indifferent to the feelings of others and take no time for them. In daily life that shows as a clear boundary between their business and other people\'s, help given when asked rather than offered, and an efficiency that warmer people find cold.',
		items: [
			'whether helping is something you enjoy, not just do.',
			'whether other people\'s welfare is on your mind.',
			'whether how others feel makes little difference to you.',
			'whether other people\'s needs get any of your time.',
		],
		predicts: [
			{ text: 'Agreeableness predicts helping, and the link runs through empathic concern: agreeable people feel for others in need and act on it, in both reported and observed behaviour.', cite: CITE.habashi2016 },
			{ text: 'Agreeable people were more willing to help, particularly where no role or relationship required it, in studies that paired personality with real opportunities to help.', cite: CITE.graziano2007 },
			{ text: 'Agreeableness rises on average through adulthood, especially after fifty.', cite: CITE.roberts2006 },
		],
	},
	{
		id: 'A4', name: 'Cooperation', domain: 'A',
		summary: 'The fourth facet of agreeableness is avoiding conflict and getting along: not relishing a fight, not shouting or insulting, and not seeking to get even. All four items are reversed, so the facet is really the absence of a taste for confrontation. The authors call it cooperation; compliance is the older name.',
		notMean: [
			'A low score is not violence or cruelty. It describes a person who does not mind a row, says what they think of people, and does not forget a slight; many such people are fair, and some are the ones who say what needs saying.',
			'A high score is not weakness. Avoiding conflict is often a skill, and cooperative people can hold a line without raising their voice.',
		],
		high: 'People high on this facet say they do not love a good fight, do not yell at or insult people, and do not get back at others. In daily life that shows as giving way to keep the peace, finding a middle path, letting a slight go, and discomfort when others argue. The cost is conflicts that needed having and did not happen.',
		low: 'People low on this facet say they love a good fight, yell at people and get back at others. In daily life that shows as enjoying an argument, bluntness that others find bracing or bruising, holding grudges, and no fear of a difficult conversation. Low scorers often make good advocates.',
		items: [
			'whether an argument is something you relish.',
			'whether disagreement turns into raised voices.',
			'whether you say wounding things when crossed.',
			'whether a slight gets repaid.',
		],
		predicts: [
			{ text: 'Agreeable people handle conflict differently: in studies of adolescents and adults they chose constructive tactics, such as negotiation and giving way, over destructive ones, and reported less conflict overall.', cite: CITE.jensenCampbell2001 },
			{ text: 'Anger relates to low agreeableness as well as to high neuroticism; a person low on this facet and high on the anger facet is the most likely to express it.', cite: CITE.pease2015 },
			{ text: 'Cooperation belongs to the politeness aspect of agreeableness, with straightforwardness and modesty.', cite: CITE.deyoung2007 },
		],
	},
	{
		id: 'A5', name: 'Modesty', domain: 'A',
		summary: 'The fifth facet of agreeableness is not thinking oneself better than others: declining to boast, and holding a modest opinion of one\'s own merits. All four items are reversed, so a high score means disagreeing with statements of superiority. It is close to the humility of the six-factor model.',
		notMean: [
			'A low score is not a verdict of arrogance. Thinking well of oneself is also what confidence and sound self-esteem look like from the inside, and a person can hold a high opinion of their abilities while treating everyone around them with respect.',
			'A high score is not low self-esteem. Modest people may think well of themselves privately; they decline to rank themselves above others or to say so.',
		],
		high: 'People high on this facet say they do not believe they are better than others and do not boast about their virtues. In daily life that shows as deflecting praise, crediting the team, discomfort with self-promotion, and a tendency to be underestimated by people who mistake modesty for a lack of ability.',
		low: 'People low on this facet say they think highly of themselves, have a high opinion of themselves and believe they are better than others. In daily life that shows as confidence in interviews and negotiations, easy talk about their achievements, and a readiness to take the lead on merit, which others find either inspiring or hard to take.',
		items: [
			'whether you rank yourself above the people around you.',
			'how high your opinion of yourself runs.',
			'the same question, put a second way.',
			'whether you talk up your own good points.',
		],
		predicts: [
			{ text: 'Modesty and straightforwardness are the two Big Five facets that most closely track the honesty-humility factor of the HEXACO model.', cite: CITE.ashtonLee2005 },
			{ text: 'Modesty belongs to the politeness aspect of agreeableness, with straightforwardness and cooperation.', cite: CITE.deyoung2007 },
		],
	},
	{
		id: 'A6', name: 'Sympathy', domain: 'A',
		seeAlso: [{ before: 'Being moved by other people\'s feelings, rather than wanting to help, is measured on its own by the ', label: 'empathy test', href: '/tests/empathy/', after: '.' }],
		summary: 'The sixth facet of agreeableness is feeling for people who are worse off: sympathy for the homeless and the needy, and interest in other people\'s problems. It is the tender-minded, compassionate side of agreeableness, where altruism is the helping side.',
		notMean: [
			'A low score is not cruelty. Low scorers often believe that people should look after themselves and that sympathy does not solve much; that is a view about responsibility, not an absence of feeling for those close to them.',
			'A high score is not action. Feeling for the needy and doing something about it are different facets of the same trait, and some of the most sympathetic people are not the most helpful.',
		],
		high: 'People high on this facet say they sympathise with the homeless and feel for those worse off than themselves. In daily life that shows as being affected by news of suffering, giving to appeals, taking the side of the underdog in an argument, and finding it hard to walk past someone in trouble.',
		low: 'People low on this facet say they are not interested in other people\'s problems and try not to think about the needy. In daily life that shows as a brisk, practical attitude to misfortune, a belief in self-reliance, and a firm line between their concerns and the world\'s. Others sometimes find this hard-headedness refreshing.',
		items: [
			'whether people sleeping rough draw your sympathy.',
			'whether hardship in others moves you.',
			'whether other people\'s troubles hold your attention.',
			'whether you look away from people in need.',
		],
		predicts: [
			{ text: 'Empathic concern, the feeling this facet measures, is the route by which agreeableness leads to helping, in both reported and observed behaviour.', cite: CITE.habashi2016 },
			{ text: 'Sympathy and altruism form the compassion aspect of agreeableness, as distinct from the politeness aspect.', cite: CITE.deyoung2007 },
			{ text: 'Agreeableness rises on average through adulthood, especially after fifty.', cite: CITE.roberts2006 },
		],
	},
];
