// The six facets of conscientiousness.
import type { FacetSpec } from './facet';
import { CITE } from './citations';

export const FACETS_C: FacetSpec[] = [
	{
		id: 'C1', name: 'Self-efficacy', domain: 'C',
		seeAlso: [{ before: 'A related idea from psychology courses, whether you see outcomes as down to you or to luck and other people, is measured by the ', label: 'locus of control test', href: '/tests/locus-of-control/', after: '.' }],
		summary: 'The first facet of conscientiousness is confidence in one\'s ability to get things done: feeling competent, expecting to handle tasks smoothly and to do them well. Competence is the older name. It is a self-belief, measured by what people say about themselves, not a measure of ability.',
		notMean: [
			'A high score is not ability, and a low score is not incompetence. The items ask whether a person feels capable; some very able people doubt themselves and some less able people do not. Self-report measures the belief.',
			'It is not self-esteem, which is about worth rather than capability, though the two travel together closely.',
		],
		high: 'People high on this facet say they complete tasks successfully, excel in what they do and know how to get things done. In daily life that shows as taking on new work without fuss, expecting to cope, learning from a failure rather than being stopped by it, and being the person others ask when something must be done.',
		low: 'People low on this facet say they do not feel they handle tasks smoothly or excel. In daily life that shows as hesitation before a new job, over-preparation, a habit of crediting luck for success and themselves for failure, and a reluctance to volunteer that hides real competence.',
		items: [
			'whether what you start tends to come out right.',
			'whether you rate your own work above most people\'s.',
			'whether jobs go without a struggle in your hands.',
			'whether you feel you have the method, not just the will.',
		],
		predicts: [
			{ text: 'Generalised self-efficacy, self-esteem, low neuroticism and an internal locus of control are so closely related that one large study treats them as indicators of a single core self-evaluation.', cite: CITE.judgeErez2002 },
			{ text: 'Self-efficacy groups with achievement-striving and self-discipline into the industriousness aspect of conscientiousness, as distinct from the orderliness aspect.', cite: CITE.deyoung2007 },
			{ text: 'Among the conscientiousness facets, competence has the strongest link to life satisfaction and well-being.', cite: CITE.anglim2020 },
		],
	},
	{
		id: 'C2', name: 'Orderliness', domain: 'C',
		seeAlso: [{ before: 'Wanting the work itself exactly right, down to the last detail, is a separate habit; the ', label: 'perfectionism test', href: '/tests/perfectionism/', after: ' measures it.' }],
		summary: 'The second facet of conscientiousness is liking for tidiness and things in their place: putting things back, keeping a room clear, and taking pleasure in order. The site also measures it on its own with ten items. It is the surroundings side of conscientiousness, and the one people usually mean by perfectionism about their environment.',
		notMean: [
			'A low score is not laziness, and it is not a sign of poor work. Many untidy people are productive, punctual and reliable; the facet is about the state of their desk, not the state of their output. Order and industriousness are different sides of conscientiousness and vary separately.',
			'A high score is not fussiness, and it is not perfectionism in the sense of never being satisfied. Orderly people like things in their place and feel better when they are.',
		],
		high: 'People high on this facet say they like to tidy up and put things back in their proper place. In daily life that shows as a clear desk, labelled folders, a kitchen where everything has a home, and irritation at other people\'s clutter. The cost is time spent arranging that others spend doing.',
		low: 'People low on this facet say they leave a mess, leave their belongings around and forget to put things back. In daily life that shows as piles that only they can navigate, a search for keys most mornings, and a tolerance for clutter that orderly people find hard to be around. Many low scorers know exactly where everything is.',
		items: [
			'whether putting things straight is a pleasure.',
			'whether things end up where they were last used.',
			'what your own space looks like when no one is coming round.',
			'whether your things spread through the house.',
		],
		predicts: [
			{ text: 'In a meta-analysis of conscientiousness and job performance, the order facet added little beyond the broad trait, while achievement and dependability added most.', cite: CITE.dudley2006 },
			{ text: 'Orderliness is one of the two aspects of conscientiousness, distinct from industriousness, and the two can be high or low independently.', cite: CITE.deyoung2007 },
			{ text: 'Order emerges as a facet of its own in every major personality questionnaire that measures conscientiousness.', cite: CITE.roberts2005 },
		],
	},
	{
		id: 'C3', name: 'Dutifulness', domain: 'C',
		summary: 'The third facet of conscientiousness is keeping promises and following rules: telling the truth, honouring commitments, and not breaking rules even when it would be convenient. It is the facet of conscientiousness that is about obligation to others rather than about getting things done.',
		notMean: [
			'A low score is not dishonesty as a settled fact. The items ask about rules and promises; many low scorers are honest people who think some rules are stupid and some promises were made too quickly. A high score is not a certificate of character either.',
			'It is not the same as the morality facet of agreeableness, which is about not exploiting people. A person can be scrupulous about rules and still use others, or bend rules and be straight with everyone.',
		],
		high: 'People high on this facet say they keep their promises, tell the truth and do not break rules. In daily life that shows as being where they said they would be, doing the paperwork properly, returning the extra change, and discomfort when others cut corners. They are the people organisations run on.',
		low: 'People low on this facet say they break rules and sometimes their promises. In daily life that shows as a flexible attitude to deadlines and procedures, a readiness to make exceptions, and little love of form-filling. Low scorers are often the ones who get things done when the rules would have stopped them.',
		items: [
			'whether what you said you would do, you do.',
			'whether honesty holds even when a lie would be easier.',
			'whether a rule binds you when no one is checking.',
			'the promise item, put the other way round.',
		],
		predicts: [
			{ text: 'In a meta-analysis of job performance, dependability, the narrow trait this facet measures, predicted performance and in particular the avoidance of counterproductive behaviour at work.', cite: CITE.dudley2006 },
			{ text: 'Across seven major questionnaires, a facet about honesty and rule-following emerged separately from facets about industry and order.', cite: CITE.roberts2005 },
			{ text: 'Responsibility and conventionality, the trait family that includes dutifulness, relate to less risky driving, drug use and other behaviours that shorten life.', cite: CITE.bogg2004 },
		],
	},
	{
		id: 'C4', name: 'Achievement-striving', domain: 'C',
		summary: 'The fourth facet of conscientiousness is working hard and aiming high: doing more than is asked, putting effort in, and not being content with just enough. It is the ambition and drive inside conscientiousness, and the facet most tied to how people do at work.',
		notMean: [
			'A low score is not laziness as a moral failing. Low scorers put in what is needed and keep their effort for what they care about; many have decided that work is not where their life is, which is a choice rather than a deficiency.',
			'A high score is not talent or success. Striving is about effort; results depend on ability, opportunity and luck, and the trait has costs in rest, relationships and the ability to stop.',
		],
		high: 'People high on this facet say they work hard and do more than is expected of them. In daily life that shows as first in and last out, a drive to be the best at whatever they take up, a dislike of coasting, and difficulty with holidays. Others experience them as driven, and sometimes as hard to keep up with.',
		low: 'People low on this facet say they do just enough to get by and put little time and effort into their work. In daily life that shows as a clear line between work and life, effort spent where it matters to them, and a relaxed attitude to ambition that strivers find baffling and sometimes envy.',
		items: [
			'how much effort you put in as a matter of course.',
			'whether you go past the brief.',
			'whether the minimum is your usual target.',
			'whether work gets a small share of you.',
		],
		predicts: [
			{ text: 'In a meta-analysis of conscientiousness and job performance, the achievement facet predicted performance across jobs and added to the prediction beyond the broad trait.', cite: CITE.dudley2006 },
			{ text: 'Facets of the Big Five predict job performance beyond their domains, and the conscientiousness facets are where the gain is largest.', cite: CITE.judge2013 },
			{ text: 'Achievement-striving belongs to the industriousness aspect of conscientiousness, with self-efficacy and self-discipline.', cite: CITE.deyoung2007 },
		],
	},
	{
		id: 'C5', name: 'Self-discipline', domain: 'C',
		summary: 'The fifth facet of conscientiousness is starting tasks and carrying them through: being prepared, following a plan to the end, and not wasting time. It governs the gap between intending and doing, and it is the facet people usually mean when they say they lack willpower.',
		notMean: [
			'A low score is not a lack of ability or of good intentions. Low scorers often intend as much as anyone and know exactly what they should be doing; the difficulty is in the starting, and in the finishing. Procrastination is a habit, not a character flaw.',
			'A high score is not rigidity. Disciplined people can be spontaneous; they finish what they start.',
		],
		high: 'People high on this facet say they are always prepared, carry out their plans and do not waste their time. In daily life that shows as starting the task before the deadline looms, finishing the course, the book and the project, and a steady pace that outlasts other people\'s bursts. The cost is difficulty letting a plan go when it has stopped making sense.',
		low: 'People low on this facet say they waste their time and have difficulty starting tasks. In daily life that shows as deadlines that do the starting for them, a trail of half-finished projects, excellent work done in a final rush, and a lot of time spent on things that were not the thing. Many low scorers are highly capable and know it.',
		items: [
			'whether you arrive ready.',
			'whether a plan made is a plan done.',
			'how much of your time slips away on nothing in particular.',
			'whether getting going is the hard part.',
		],
		predicts: [
			{ text: 'In the model of impulsivity built on the Big Five, low self-discipline marks lack of perseverance, which is distinct from acting rashly under strong feeling, from sensation seeking and from failing to plan.', cite: CITE.whiteside2001 },
			{ text: 'Self-discipline belongs to the industriousness aspect of conscientiousness, with self-efficacy and achievement-striving.', cite: CITE.deyoung2007 },
			{ text: 'Facets and even single items predict life outcomes beyond the five domains, so a self-discipline score carries information the conscientiousness score alone does not.', cite: CITE.stewart2022 },
		],
	},
	{
		id: 'C6', name: 'Cautiousness', domain: 'C',
		summary: 'The sixth facet of conscientiousness is thinking before acting: not rushing in, not making rash decisions, and taking time to consider. All four items are reversed, so a high score means denying the four kinds of haste they describe. Deliberation is the older name.',
		notMean: [
			'A low score is not stupidity, and it is not recklessness as a verdict. Quick deciders are often right, and in some work speed matters more than deliberation; the facet measures the tendency to pause, not the quality of what follows.',
			'A high score is not timidity. Cautious people take risks; they take them after thinking.',
		],
		high: 'People high on this facet say they do not jump into things, do not make rash decisions and think before acting. In daily life that shows as sleeping on it, reading the reviews, weighing options that others would not have noticed, and sometimes missing a chance that did not wait.',
		low: 'People low on this facet say they jump into things without thinking, make rash decisions and rush in. In daily life that shows as fast decisions, a willingness to act on half the information, regret about some purchases and relationships, and a capacity for seizing the moment that cautious people lack.',
		items: [
			'whether you act before weighing it up.',
			'whether choices get made in a hurry you later regret.',
			'whether speed wins over care at the start of something.',
			'whether thought comes after the deed.',
		],
		predicts: [
			{ text: 'In the model of impulsivity built on the Big Five, low cautiousness marks lack of premeditation, which is distinct from acting rashly under strong feeling, from sensation seeking and from failing to persevere.', cite: CITE.whiteside2001 },
			{ text: 'Impulse control, the trait family that includes cautiousness, has the strongest links among the conscientiousness traits to lower drug use, risky driving and other behaviours that shorten life.', cite: CITE.bogg2004 },
			{ text: 'In a meta-analysis of job performance, cautiousness added less to the prediction than achievement or dependability did.', cite: CITE.dudley2006 },
		],
	},
];
