// The six facets of extraversion.
import type { FacetSpec } from './facet';
import { CITE } from './citations';

export const FACETS_E: FacetSpec[] = [
	{
		id: 'E1', name: 'Friendliness', domain: 'E',
		summary: 'The first facet of extraversion is warmth and ease with other people: making friends easily, feeling comfortable around people, and letting them close rather than keeping them at a distance. It is the facet of extraversion that overlaps most with agreeableness, and the one people usually mean when they call someone friendly.',
		notMean: [
			'A low score is not dislike of people, and it is not rudeness. Low scorers are often loyal to a few and courteous to everyone; they do not move towards strangers, and they take longer to let anyone in.',
			'A high score is not a measure of how much people like you. Warmth is a disposition the person reports, not a verdict from their friends.',
		],
		high: 'People high on this facet say they make friends easily and feel comfortable around people. In daily life that shows as first-name terms within minutes, a wide circle of friends from every stage of life, and warmth towards people they have only just met. Others experience them as easy to be with.',
		low: 'People low on this facet say they avoid contacts with others and keep people at a distance. In daily life that shows as a small circle of long-standing friends, reserve with new people, and a preference for being approached rather than approaching. Warmth, when it comes, is slow and lasting.',
		items: [
			'whether acquaintances turn into friends without much effort.',
			'whether company puts you at ease rather than on guard.',
			'whether you steer clear of people when you can.',
			'whether you hold back from letting people get close.',
		],
		predicts: [
			{ text: 'Friendliness, gregariousness and cheerfulness form the enthusiasm aspect of extraversion, which is about sociability and positive feeling, as distinct from the assertiveness aspect about taking charge.', cite: CITE.deyoung2007 },
			{ text: 'Across 39 nations the core of extraversion was found to be sensitivity to reward and the pleasant feelings that come with it, with sociability following from that rather than defining it.', cite: CITE.lucas2000 },
			{ text: 'Extraversion facets relate to higher life satisfaction and happiness, with warmth among the stronger facets after cheerfulness.', cite: CITE.anglim2020 },
		],
	},
	{
		id: 'E2', name: 'Gregariousness', domain: 'E',
		summary: 'The second facet of extraversion is liking for crowds and company: wanting to be where the people are, enjoying large parties and talking to many people rather than a few. It is the facet closest to what sociable means in ordinary speech, and the one most directly opposed to a preference for being alone.',
		notMean: [
			'A low score is not shyness, and it is not unfriendliness. Shyness is discomfort around people; low gregariousness is a preference for fewer of them. Many low scorers are warm, confident hosts of small gatherings who simply find a crowded room tiring.',
			'A high score is not a measure of social skill or of how many friends a person has. It records appetite for company, not success at it.',
		],
		high: 'People high on this facet say they love large parties, talk to a lot of different people at parties and seek out crowds. In daily life that shows as a full calendar, a liking for busy restaurants and open-plan offices, boredom with a quiet weekend, and energy that rises as the room fills.',
		low: 'People low on this facet say they prefer to be alone and avoid crowds. In daily life that shows as leaving a party early and happily, choosing a walk over a festival, deep conversations with one person at a time, and a need for time alone to recover from a day of people.',
		items: [
			'whether a crowded room is a pleasure or an ordeal.',
			'whether you move around a room rather than stay with one group.',
			'whether your own company is the company you would choose.',
			'whether busy places are something you keep away from.',
		],
		predicts: [
			{ text: 'The central feature running through the facets of extraversion appears to be enjoying social attention, the experience of being noticed and engaged with by others, which gregariousness measures most directly.', cite: CITE.ashton2002 },
			{ text: 'Gregariousness belongs to the enthusiasm aspect of extraversion, with friendliness and cheerfulness.', cite: CITE.deyoung2007 },
			{ text: 'The sociable side of extraversion, which Roberts and colleagues call social vitality, rises in adolescence and then changes little or falls slightly through adulthood, unlike the assertive side.', cite: CITE.roberts2006 },
		],
	},
	{
		id: 'E3', name: 'Assertiveness', domain: 'E',
		seeAlso: [{ before: 'Bringing a group together and leading it fairly, rather than simply taking charge, is measured by the ', label: 'leadership test', href: '/tests/leadership/', after: '.' }],
		summary: 'The third facet of extraversion is taking charge and speaking up: the readiness to lead, to take control of a situation and to try to influence what happens, rather than waiting for others to lead the way. It is the facet of extraversion that matters most at work, and the one the site also measures on its own with ten items.',
		notMean: [
			'A high score is not competence, and it is not aggression. Assertive people put themselves forward; whether they are right, or fair, is a separate matter. Aggression is pushing at others\' expense and sits closer to low agreeableness.',
			'A low score is not a lack of views or ability. Many low scorers lead well in roles that reward listening, and influence by example or in writing rather than by taking the floor.',
		],
		high: 'People high on this facet say they take charge, try to lead others and take control of things. In daily life that shows as speaking first in a meeting, volunteering to chair, pushing for a decision when others are circling, and finding it hard to sit in a badly led group without stepping in.',
		low: 'People low on this facet say they wait for others to lead the way and hold back from taking control. In daily life that shows as letting others set the agenda, contributing when asked, and a preference for a clear brief over an open field. Low scorers are often the ones who make a leader\'s plan work.',
		items: [
			'whether you step forward when a group needs someone to decide.',
			'whether you want to be the one setting the direction.',
			'whether you would rather run a situation than let it run.',
			'whether you hang back until someone else goes first.',
		],
		predicts: [
			{ text: 'Extraversion is the Big Five trait most strongly linked to emerging as a leader and to being rated an effective one, and its assertive side carries much of that link.', cite: CITE.judge2002 },
			{ text: 'The assertive side of extraversion, which Roberts and colleagues call social dominance, rises steadily through young adulthood and middle age, unlike the sociable side.', cite: CITE.roberts2006 },
			{ text: 'Men score a little higher than women on the assertiveness aspect on average, while women score higher on the enthusiasm aspect, in a large internet sample.', cite: CITE.weisberg2011 },
		],
	},
	{
		id: 'E4', name: 'Activity level', domain: 'E',
		summary: 'The fourth facet of extraversion is pace of life: whether a person keeps busy, fills their spare time with things to do and lives at speed, or prefers to take it easy. It is about tempo and energy rather than about people, which is why some very active people are not otherwise extraverted.',
		notMean: [
			'A low score is not laziness. Low scorers get things done at their own pace and often with more care; the facet measures how fast and how full a person likes their days, not how much they achieve.',
			'A high score is not fitness or physical activity. The items ask about being busy and on the go, which can mean a packed diary as easily as a long run.',
		],
		high: 'People high on this facet say they are always busy, always on the go and do a lot in their spare time. In daily life that shows as walking fast, talking fast, a diary with no gaps, several projects at once, and restlessness on a quiet afternoon. Others find them energising or exhausting, depending on the day.',
		low: 'People low on this facet say they like to take it easy and do not need to fill every hour. In daily life that shows as an unhurried pace, one thing at a time, long evenings doing nothing in particular, and an unforced calm that busier people envy.',
		items: [
			'whether your days are full by choice.',
			'whether you keep moving rather than sitting still.',
			'whether free time fills up with things to do.',
			'whether an unhurried pace is the one you prefer.',
		],
		predicts: [
			{ text: 'Activity level and excitement-seeking are the two facets of extraversion that fall most clearly with age, in a longitudinal study of adults.', cite: CITE.terracciano2005 },
			{ text: 'Activity level groups with assertiveness into the agentic aspect of extraversion, rather than with warmth and sociability.', cite: CITE.deyoung2007 },
			{ text: 'Facets of the same domain can show different age patterns: in a large sample, age differences within extraversion were not uniform across its facets.', cite: CITE.mottus2015 },
		],
	},
	{
		id: 'E5', name: 'Excitement-seeking', domain: 'E',
		summary: 'The fifth facet of extraversion is appetite for thrills and risk: loving excitement, seeking adventure, and enjoying the feeling of being a little reckless. It overlaps with what other models call sensation seeking, and it is the facet of extraversion least related to liking people.',
		notMean: [
			'A high score is not irresponsibility. Many high scorers are careful in the things that matter to them and take their risks on purpose, in sport, travel or work; the facet measures the appetite, and cautiousness, a facet of conscientiousness, measures the brakes.',
			'A low score is not timidity. Low scorers may be brave when it counts; they do not seek the feeling of danger for its own sake.',
		],
		high: 'People high on this facet say they love excitement, seek adventure, enjoy being reckless and act wild and crazy. In daily life that shows as fast driving, loud music, last-minute travel, a taste for the edge in sport and nightlife, and boredom with routine that others find restful.',
		low: 'People low on this facet say they do not seek adventure or excitement and have no wish to be reckless. In daily life that shows as a preference for the familiar, holidays that are restful rather than thrilling, and a quiet satisfaction that others sometimes mistake for dullness.',
		items: [
			'whether a thrill is something you look for.',
			'whether you go after new and risky experiences.',
			'whether throwing caution aside is fun in itself.',
			'whether you let go in ways other people might not.',
		],
		predicts: [
			{ text: 'In the model of impulsivity built on the Big Five, this facet is the marker of sensation seeking, which is distinct from acting rashly under strong feeling and from failing to plan.', cite: CITE.whiteside2001 },
			{ text: 'Sensation seeking relates to both extraversion and openness to experience, which is why this facet sits near adventurousness in openness without being the same thing.', cite: CITE.aluja2003 },
			{ text: 'Excitement-seeking falls with age, more clearly than most facets, in a longitudinal study of adults.', cite: CITE.terracciano2005 },
		],
	},
	{
		id: 'E6', name: 'Cheerfulness', domain: 'E',
		seeAlso: [{ before: 'Cheerfulness is about mood now; expecting things to turn out well is measured separately by the ', label: 'optimism test', href: '/tests/optimism/', after: '.' }],
		summary: 'The sixth facet of extraversion is how readily joy and enthusiasm arise: whether a person tends to feel cheerful, to have fun, to love life and to see the bright side. It is the positive-emotion heart of extraversion, and the facet with the strongest link to happiness of any of the thirty.',
		notMean: [
			'A low score is not sadness, which belongs to neuroticism. Low scorers are not unhappy; they are even, and they feel joy as a quiet thing rather than a loud one. The two facets vary independently: people can be low on both, high on both, or one of each.',
			'A high score is not optimism in the sense of expecting good outcomes, and it is not a guarantee of a happy life. It is a disposition to feel good readily, which circumstances still test.',
		],
		high: 'People high on this facet say they radiate joy, have a lot of fun, love life and look at the bright side. In daily life that shows as laughter that others catch, enthusiasm for small things, a quick recovery of good spirits, and being the person others want at a party or a bedside.',
		low: 'People low on this facet say they do not radiate joy and are not often described as fun. In daily life that shows as an even temper, pleasure that is felt more than shown, and a reserve that others may read as seriousness. Many low scorers are deeply content.',
		items: [
			'whether your good mood is visible to the people around you.',
			'how much of your time is spent enjoying yourself.',
			'whether you feel glad to be alive, most days.',
			'whether your attention goes to what is going well.',
		],
		predicts: [
			{ text: 'Of all thirty facets, positive emotions, which this facet measures, is the strongest single correlate of life satisfaction and happiness.', cite: CITE.anglim2020 },
			{ text: 'Extraverts respond with more positive feeling to pleasant and rewarding situations, a difference in emotional reactivity that this facet captures.', cite: CITE.smillie2012 },
			{ text: 'Sensitivity to reward and the pleasant feelings that follow it appear to be the core of extraversion across cultures, with sociability a consequence.', cite: CITE.lucas2000 },
		],
	},
];
