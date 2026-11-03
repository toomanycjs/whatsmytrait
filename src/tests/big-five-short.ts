// Content for /tests/big-five/short/: the 50-item IPIP Big-Five Factor
// Markers. Copy only; the items, keys and norms are in the data file.
import type { TestContent } from './content';

export const bigFiveShort: TestContent = {
	instrument: 'ipip-50',
	path: '/tests/big-five/short/',
	title: 'Big Five personality test, short: 50 items, free',
	description: 'A free 50-item Big Five personality test, scored on your device in about five minutes, with percentiles against a published sample.',
	question: 'The Big Five in five minutes',
	subtitle: 'IPIP Big-Five Factor Markers, 50 items, 5 minutes',
	breadcrumb: 'Big Five, short',
	normsGroup: 'all',
	scales: {
		E: {
			means: {
				low: 'You tend to keep to yourself and find quiet company easier than a crowd.',
				mid: 'You are about as outgoing as most people: sociable in some settings, reserved in others.',
				high: 'You tend to seek company and conversation more than most people do.',
			},
			high: 'People who score high on extraversion say they are the life of the party, start conversations easily and are comfortable around people they do not know. They tend to talk more than they listen, enjoy attention and feel energised by a busy room. In daily life that often shows as a wide circle of acquaintances, a preference for doing things with others, and little hesitation in speaking up. It says nothing about how deep those friendships are, how confident someone is underneath, or whether they are good company.',
			low: 'People who score low on extraversion say they have little to say in groups, keep in the background and are quiet around strangers. They tend to prefer one or two people to a crowd, think before speaking, and find long stretches of socialising tiring rather than energising. In daily life that often shows as a small circle of close friends, a liking for time alone, and a reluctance to draw attention to themselves. It is not shyness, and it is not a lack of social skill: many quiet people are very good with others when they choose to be.',
		},
		A: {
			means: {
				low: 'You tend to put your own view first and are less moved than most by other people\'s feelings.',
				mid: 'You are about as warm and accommodating as most people.',
				high: 'You tend to notice other people\'s feelings and put them first more than most people do.',
			},
			high: 'People who score high on agreeableness say they are interested in people, feel others\' emotions and take time out for them. They tend to assume good intentions, avoid conflict, and go out of their way to make others feel at ease. In daily life that often shows as being the person others confide in, giving way in arguments, and finding it hard to say no. It does not mean being a pushover, and it does not mean being liked: it describes how much weight someone gives to other people\'s feelings, not how well they handle them.',
			low: 'People who score low on agreeableness say they feel little concern for others, are not much interested in other people\'s problems and will say what they think even if it stings. They tend to be sceptical of motives, comfortable with disagreement, and more concerned with being right than with being liked. In daily life that often shows as blunt feedback, a willingness to negotiate hard, and a small number of close relationships that run deep. It is not the same as being unkind: many low scorers are loyal and fair, just not soft.',
		},
		C: {
			means: {
				low: 'You tend to take things as they come and are less drawn to plans, lists and order than most people.',
				mid: 'You are about as organised and persistent as most people.',
				high: 'You tend to plan, finish what you start and keep things in order more than most people do.',
			},
			high: 'People who score high on conscientiousness say they are always prepared, pay attention to details, follow a schedule and get chores done right away. They tend to like order, keep their belongings in their proper place, and feel uneasy when things are left half done. In daily life that often shows as punctuality, tidy spaces, long-term plans that get carried out, and a reputation for reliability. It does not mean being rigid or joyless, and a very high score can come with difficulty relaxing or delegating.',
			low: 'People who score low on conscientiousness say they leave their belongings around, forget to put things back, make a mess of things and sometimes shirk their duties. They tend to work in bursts rather than steadily, improvise rather than plan, and tolerate clutter that would bother others. In daily life that often shows as deadlines met at the last minute, a flexible attitude to rules, and a knack for changing course. It is not a measure of intelligence or talent: many low scorers do excellent work when the work interests them.',
		},
		S: {
			means: {
				low: 'You tend to feel stress, worry and low mood more readily than most people do.',
				mid: 'Your moods are about as steady as most people\'s.',
				high: 'You tend to stay calm and even-tempered more than most people do.',
			},
			high: 'People who score high on emotional stability say they are relaxed most of the time, seldom feel blue and are not easily disturbed. They tend to take setbacks in their stride, recover quickly from bad days, and keep an even mood under pressure. In daily life that often shows as being the calm one in a crisis, sleeping well, and not dwelling on what went wrong. It does not mean feeling nothing: high scorers have the full range of emotions, they just return to baseline faster.',
			low: 'People who score low on emotional stability say they get stressed out easily, worry about things, change their mood a lot and get upset or irritated easily. They tend to feel setbacks keenly, notice threats early, and take longer to settle after a bad day. In daily life that often shows as careful planning for what might go wrong, sensitivity to criticism, and moods that others can read. It is a tendency, not a condition: the scale measures how readily feelings arise, not whether anything is wrong, and sensitive people are often perceptive and conscientious friends.',
		},
		I: {
			means: {
				low: 'You tend to prefer the practical and the familiar to abstract ideas more than most people do.',
				mid: 'You are about as drawn to ideas and imagination as most people.',
				high: 'You tend to enjoy ideas, words and imagination more than most people do.',
			},
			high: 'People who score high on intellect or imagination say they have a rich vocabulary, a vivid imagination, excellent ideas and are quick to understand things. They tend to enjoy abstract discussion, reflect on things, read widely and use difficult words without noticing. In daily life that often shows as curiosity, a taste for the new, and pleasure in puzzles, arguments and art. The scale measures interest in ideas and self-rated quickness, not measured ability, and it says nothing about practical sense.',
			low: 'People who score low on intellect or imagination say they have difficulty with abstract ideas, are not interested in them, and do not have a good imagination. They tend to prefer the concrete to the theoretical, the proven to the novel, and plain words to difficult ones. In daily life that often shows as practical judgement, a liking for routine and hands-on work, and impatience with speculation. It is not a measure of intelligence: the scale asks what people enjoy and how they see themselves, not how well they think.',
		},
	},
	testRetest: 'No test-retest figure is published on the IPIP key page for these markers. Personality scores are fairly stable over weeks and months; a change of a few points between attempts is usual and does not mean you have changed.',
	related: [
		{ href: '/tests/', title: 'All tests', note: 'The full index, grouped by what you want to know.' },
		{ href: '/tests/big-five/short/', title: 'The Big Five in five minutes', note: 'This test.' },
		{ href: '/', title: 'Home', note: 'What the site is and the three most-taken tests.' },
	],
	faqs: [
		{ q: 'Is this the same as the Big Five personality test?', a: 'Yes. It measures the same five broad traits (extraversion, agreeableness, conscientiousness, emotional stability, and intellect or imagination) with the 50-item markers published by Lewis Goldberg in 1992 and reproduced in the International Personality Item Pool. The longer 120-item version adds six facets under each trait.' },
		{ q: 'How accurate is a 50-item Big Five test?', a: 'The five scales have published internal consistency between 0.79 and 0.87, which is good for a ten-item scale. Accuracy also depends on you: answer as you are, not as you would like to be, and compare with people of your own age and sex as the instructions ask. Your percentile is a comparison with a large online sample, not a judgement.' },
		{ q: 'What does a percentile mean on a personality test?', a: 'The share of the comparison sample who scored below you. The 72nd percentile for extraversion means 72 out of 100 people in the sample scored lower than you. The middle 50% of people fall between the 25th and 75th percentiles, which the strip shades slightly darker.' },
		{ q: 'Is a high or low score better?', a: 'Neither. Each end of each scale has strengths and costs, and the research on outcomes describes tendencies across large groups, not what any one person will do. The site never colours scores as good or bad.' },
		{ q: 'Can my personality change?', a: 'Scores on the Big Five are fairly stable over years, and they also shift gradually with age: most people become a little more agreeable, conscientious and emotionally stable through adulthood. Retaking a test after six months or a year shows whether anything has moved for you.' },
		{ q: 'Where do my answers go?', a: 'Nowhere. The test is scored in your browser and the result is kept only on this device. If you choose to share a link, your scores are inside the link itself and nothing is sent to this site.' },
	],
};
