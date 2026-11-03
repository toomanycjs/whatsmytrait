// The six facets of openness to experience.
import type { FacetSpec } from './facet';
import { CITE } from './citations';

export const FACETS_O: FacetSpec[] = [
	{
		id: 'O1', name: 'Imagination', domain: 'O',
		summary: 'The first facet of openness is how much a person lives in fantasy and daydream rather than only in the concrete present: having a vivid imagination, enjoying flights of fancy, and getting lost in thought. It is the inward, make-believe side of openness.',
		notMean: [
			'A high score is not creativity in the sense of making things, and it is not intelligence. Imagining is an activity people enjoy; whether it produces anything depends on other traits, above all conscientiousness. Nor does a high score mean being unrealistic about life.',
			'A low score is not dullness. Low scorers attend to what is in front of them, which is its own strength and the one most work rewards.',
		],
		high: 'People high on this facet say they have a vivid imagination, enjoy wild flights of fantasy, love to daydream and like to get lost in thought. In daily life that shows as a rich inner life, stories and scenarios running during a dull meeting, a taste for fiction and invented worlds, and the occasional missed stop on the bus.',
		low: 'People low on this facet say they rarely daydream and keep their attention on what is real and present. In daily life that shows as practicality, a preference for facts over fiction, and a mind that stays with the task. Others sometimes wish they would speculate more.',
		predicts: [
			{ text: 'Imagination, artistic interests and emotionality form the openness aspect, which is about aesthetic and sensory engagement, as distinct from the intellect aspect about ideas.', cite: CITE.deyoung2007 },
			{ text: 'The openness aspect, which includes imagination, predicts creative achievement in the arts, while the intellect aspect predicts it in the sciences.', cite: CITE.kaufman2016 },
			{ text: 'Openness is a family of related traits rather than one thing, and different members of the family relate to different outcomes, so a single openness score hides variety that the facets show.', cite: CITE.connelly2014 },
		],
	},
	{
		id: 'O2', name: 'Artistic interests', domain: 'O',
		summary: 'The second facet of openness is liking for art, music, poetry and beauty: believing that art matters, noticing beauty where others do not, and enjoying galleries and verse. It is a facet of appreciation, not of talent, and people high on it are as often audiences as makers.',
		notMean: [
			'A high score is not artistic ability, and a low score is not philistinism. The facet records how much a person values and notices art and beauty; whether they can draw or play is another matter, and so is whether they are cultured in any snobbish sense.',
			'A low score does not mean a person has no taste. Low scorers like what they like; they do not seek out art or find it important.',
		],
		high: 'People high on this facet say they believe in the importance of art, see beauty in things others might not notice, and enjoy poetry and art museums. In daily life that shows as time spent in galleries and at concerts, an eye for light and colour on an ordinary street, and strong reactions to music that others find hard to explain.',
		low: 'People low on this facet say they do not like poetry and do not enjoy going to art museums. In daily life that shows as indifference to decoration, a preference for things that work over things that are beautiful, and some puzzlement at the fuss made over art. Many low scorers respond strongly to the natural world or to craft without calling it art.',
		predicts: [
			{ text: 'Aesthetic openness, which this facet measures, predicts creative achievement in the arts, where intellect predicts it in the sciences.', cite: CITE.kaufman2016 },
			{ text: 'Artistic interests belong to the openness aspect, with imagination and emotionality.', cite: CITE.deyoung2007 },
			{ text: 'Women score a little higher than men on the openness aspect, which includes artistic interests, while men score higher on intellect, in a large internet sample.', cite: CITE.weisberg2011 },
		],
	},
	{
		id: 'O3', name: 'Emotionality', domain: 'O',
		summary: 'The third facet of openness is how strongly feelings are experienced and noticed: whether a person feels their emotions intensely, picks up other people\'s, and pays attention to their own inner weather. It belongs to openness because it is about receptiveness to experience, in this case the experience of feeling.',
		notMean: [
			'It is not neuroticism. Emotionality is about the richness and intensity of feeling of every kind, including joy; neuroticism is about how readily bad feelings arise. A person can feel everything strongly and be perfectly stable, or feel little and still worry a great deal.',
			'A low score is not coldness. Low scorers feel; they notice it less and talk about it less.',
		],
		high: 'People high on this facet say they experience their emotions intensely and feel others\' emotions. In daily life that shows as being moved by music and news, knowing how a room feels on entering it, crying at films, and being affected by other people\'s moods whether they want to be or not.',
		low: 'People low on this facet say they rarely notice their emotional reactions and do not understand people who get emotional. In daily life that shows as an even keel, decisions made on facts, and a certain bafflement at displays of feeling. Others sometimes read this as detachment.',
		predicts: [
			{ text: 'Emotionality belongs to the openness aspect, with imagination and artistic interests, rather than to the intellect aspect.', cite: CITE.deyoung2007 },
			{ text: 'In the development sample for the IPIP-NEO-120 this facet has one of the lower reliabilities of the thirty, so its score moves more between attempts than most.', cite: CITE.johnson2014 },
			{ text: 'Women score a little higher than men on the openness aspect, which includes emotionality, in a large internet sample.', cite: CITE.weisberg2011 },
		],
	},
	{
		id: 'O4', name: 'Adventurousness', domain: 'O',
		summary: 'The fourth facet of openness is preference for variety and new experiences over routine: wanting to try new foods, places and ways of doing things rather than sticking with what is known. It is openness in action, where imagination is openness in thought.',
		notMean: [
			'It is not excitement-seeking, which is about thrills and risk and belongs to extraversion. Adventurousness is about novelty: a new recipe, a different route, an unfamiliar country. The two go together often but not always.',
			'A low score is not rigidity or fear. Low scorers have found what works and see no reason to change it, which is often the sensible position.',
		],
		high: 'People high on this facet say they prefer variety to routine and are not attached to conventional ways. In daily life that shows as ordering the dish they have never tried, moving house and job more often than others, restlessness with sameness, and a willingness to do things differently just to see what happens.',
		low: 'People low on this facet say they prefer to stick with things they know and dislike changes. In daily life that shows as the same holiday every year, a favourite order at a favourite restaurant, loyalty to tried methods, and discomfort when a routine is disturbed. Low scorers are often the steadiest people in a changing organisation.',
		predicts: [
			{ text: 'Sensation seeking relates to openness as well as to extraversion, and this facet is where the two traits meet.', cite: CITE.aluja2003 },
			{ text: 'Openness rises in young adulthood and falls a little in old age, on average.', cite: CITE.roberts2006 },
			{ text: 'Facets of the same domain can differ in how they change with age, so the domain average does not describe every facet; the openness facets are among the examples.', cite: CITE.mottus2015 },
		],
	},
	{
		id: 'O5', name: 'Intellect', domain: 'O',
		summary: 'The fifth facet of openness is enjoyment of ideas: liking challenging reading, abstract and theoretical discussion, and thinking for its own sake. It is the facet of openness most often confused with intelligence, which it is not.',
		notMean: [
			'It is not intelligence. The items ask what a person enjoys and how they see themselves, not how well they reason; the overlap with measured ability is real but modest, and plenty of able people have no taste for theory. A low score says nothing about how clever someone is.',
			'A high score is not wisdom or good judgement. Loving ideas and handling them well are different things.',
		],
		high: 'People high on this facet say they love to read challenging material and enjoy philosophical and theoretical discussions. In daily life that shows as arguments for the fun of it, a shelf of difficult books, curiosity about how things work in principle, and restlessness with talk that stays practical.',
		low: 'People low on this facet say they avoid philosophical discussions and are not interested in theoretical ones. In daily life that shows as a preference for the concrete, questions about what works rather than why, and a tolerance for not knowing the theory behind a thing that works. Many low scorers are expert practitioners.',
		predicts: [
			{ text: 'Intellect is one of the two aspects of openness, distinct from the aesthetic and imaginative aspect, and the one more related to measured ability.', cite: CITE.deyoung2007 },
			{ text: 'The intellect aspect predicts creative achievement in the sciences, where the openness aspect predicts it in the arts.', cite: CITE.kaufman2016 },
			{ text: 'In a meta-analysis of openness measures, the intellect family of traits relates more to measured cognitive ability than the other openness traits do, and the relation is moderate at most.', cite: CITE.connelly2014 },
		],
	},
	{
		id: 'O6', name: 'Liberalism', domain: 'O',
		summary: 'The sixth facet of openness is readiness to question convention and authority. The items ask about voting, about moral absolutes and about being tough on crime, so this is the most directly political of the thirty facets. The authors\' name for it is liberalism in the American sense; the opposite pole is traditionalism rather than any particular party.',
		notMean: [
			'A score is not a judgement of anyone\'s politics, and the site takes no side. The facet records where a person says they stand relative to a large, mostly American sample; the items were written for that audience, and the words liberal and conservative do not map neatly onto British parties.',
			'A low score is not closed-mindedness. Valuing tradition and clear rules is a position many thoughtful people hold.',
		],
		high: 'People high on this facet say they tend to vote for liberal candidates and doubt that there is an absolute right and wrong. In daily life that shows as questioning rules and the people who make them, sympathy for the unconventional, and a readiness to change a long-held view when the argument is good.',
		low: 'People low on this facet say they tend to vote for conservative candidates, believe in absolute right and wrong and think society should be tough on crime. In daily life that shows as respect for institutions and established ways, a liking for clear moral lines, and scepticism of change for its own sake.',
		predicts: [
			{ text: 'Openness relates to liberal attitudes and conscientiousness to conservative ones, on economic and social issues alike, in large American samples.', cite: CITE.gerber2010 },
			{ text: 'This facet has the lowest reliability of the thirty in the development sample, so a single score is a rougher reading than most.', cite: CITE.johnson2014 },
		],
	},
];
