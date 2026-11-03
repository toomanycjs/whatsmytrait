import type { TestContent } from './content';

const area = (name: string, low: string, mid: string, high: string, highText: string, lowText: string, traitPath: string) => ({
	name, means: { low, mid, high }, high: highText, low: lowText, traitPath,
});

export const careerInterests: TestContent = {
	instrument: 'onet-ip-short',
	path: '/tests/career-interests/',
	title: 'Career interests test: the O*NET Interest Profiler, free',
	description: 'The 60-item O*NET Interest Profiler Short Form, ticked and scored on your device in five minutes, with your six interest areas on strips and your code mapped to UK jobs.',
	question: 'What kind of work would I enjoy?',
	subtitle: 'O*NET Interest Profiler Short Form, 60 items, 5 minutes',
	breadcrumb: 'Career interests',
	minutes: 5,
	scales: {
		R: area('Realistic', 'Few of the hands-on, practical activities appealed to you.', 'Some of the hands-on, practical activities appealed to you.', 'Most of the hands-on, practical activities appealed to you.',
			'A high realistic score means you ticked most of the activities involving tools, machines, plants, animals and physical work: building, repairing, operating, growing. People with realistic interests tend to like practical problems with visible results and to prefer doing to discussing. Realistic jobs span the trades, engineering, agriculture, transport and the emergency services.',
			'A low realistic score means hands-on, mechanical and outdoor activities did not appeal. That is simply a preference, not a lack of practical ability, and it points towards work where the materials are people, ideas, data or art rather than things.', '/careers/realistic/'),
		I: area('Investigative', 'Few of the research and analysis activities appealed to you.', 'Some of the research and analysis activities appealed to you.', 'Most of the research and analysis activities appealed to you.',
			'A high investigative score means you ticked most of the activities involving experiments, laboratories, studying causes and solving abstract problems. People with investigative interests tend to like working out how things work and prefer thinking to persuading. Investigative jobs span science, medicine, research, analysis and software.',
			'A low investigative score means laboratory and research activities did not appeal. It is a preference, not a measure of ability, and it points towards work with more doing, people or expression and less analysis for its own sake.', '/careers/investigative/'),
		A: area('Artistic', 'Few of the creative activities appealed to you.', 'Some of the creative activities appealed to you.', 'Most of the creative activities appealed to you.',
			'A high artistic score means you ticked most of the activities involving writing, music, performance, drawing and film. People with artistic interests tend to like self-expression, variety and work without rigid rules. Artistic jobs span design, writing, music, performance, media and crafts, and many other jobs have an artistic side.',
			'A low artistic score means creative and expressive activities did not appeal, which is a preference and not a judgement of talent. It points towards work with clearer structure and more defined outcomes.', '/careers/artistic/'),
		S: area('Social', 'Few of the helping and teaching activities appealed to you.', 'Some of the helping and teaching activities appealed to you.', 'Most of the helping and teaching activities appealed to you.',
			'A high social score means you ticked most of the activities involving teaching, helping, caring and guiding other people. People with social interests tend to like working with others towards their wellbeing or learning. Social jobs span teaching, health and care, counselling, community work and training.',
			'A low social score means helping and teaching activities did not appeal. It says nothing about kindness or people skills, and many low scorers work well with people in other ways; it points towards work where people are colleagues rather than the purpose.', '/careers/social/'),
		E: area('Enterprising', 'Few of the business and leading activities appealed to you.', 'Some of the business and leading activities appealed to you.', 'Most of the business and leading activities appealed to you.',
			'A high enterprising score means you ticked most of the activities involving selling, managing, negotiating, starting a business and representing others. People with enterprising interests tend to like persuading, leading and taking risks for reward. Enterprising jobs span management, sales, law, marketing, politics and running a business.',
			'A low enterprising score means persuading, selling and managing did not appeal. It points towards work valued for what is made, found out or done rather than for what is won, and it is a preference rather than a measure of leadership ability.', '/careers/enterprising/'),
		C: area('Conventional', 'Few of the organising and record-keeping activities appealed to you.', 'Some of the organising and record-keeping activities appealed to you.', 'Most of the organising and record-keeping activities appealed to you.',
			'A high conventional score means you ticked most of the activities involving records, spreadsheets, procedures, inventory and accuracy. People with conventional interests tend to like clear procedures, order and getting details right. Conventional jobs span accounting, administration, finance, logistics, data and compliance.',
			'A low conventional score means record-keeping and procedural activities did not appeal. It points towards work with less routine and more variety, and it says nothing about being capable of accuracy when needed.', '/careers/conventional/'),
	},
	testRetest: 'Rounds, Su, Lewis and Rivkin (2010) report coefficient alpha of .78 to .87 across the six scales in the developmental sample (N = 1,061) and test-retest correlations of .78 to .86 in a second sample (N = 132). Interests are among the most stable individual differences from early adulthood on.',
	related: [
		{ href: '/careers/', title: 'The six interest types and UK jobs', note: 'What each type is and the jobs that fit it.' },
		{ href: '/tests/big-five/', title: 'The Big Five, with the facets', note: 'Personality and interests are related but different.' },
		{ href: '/careers/codes/', title: 'Twenty Holland codes and UK jobs', note: 'Find your code and the jobs that carry it.' },
	],
	faqs: [
		{ q: 'What is a Holland code?', a: 'Your three highest interest areas, in order, written as their initials: RIA, SEC and so on. It comes from John Holland\'s model of six vocational interest types, which O*NET uses to describe over 900 occupations. The career pages on this site map the twenty commonest codes to UK job titles.' },
		{ q: 'How is the test scored?', a: 'Each tick counts one, so each area scores from 0 to 10, exactly as the paper form is self-scored. The three highest are your code. If two areas tie, the form says to choose the one whose activities you think fit you best.' },
		{ q: 'Why are there no percentiles?', a: 'The short form is designed to be self-scored as a count of ticks per area, and its developers publish percentile ranks only for their US developmental sample. The site shows your counts against the 0 to 10 range and does not present US norms as if they were yours.' },
		{ q: 'Is this the same as the test on My Next Move?', a: 'Same sixty activities. The online version rates each from strongly dislike to strongly like on five points; this is the paper-and-pencil short form, which asks only whether you would like to do each activity, reproduced without change under its licence.' },
		{ q: 'Does the test say what job I should do?', a: 'No. It describes what kinds of work activity you would enjoy. Choosing a job also depends on what you are good at, what is available, pay, training and much else, none of which an interest test measures.' },
		{ q: 'Where do my answers go?', a: 'Nowhere. The test is scored in your browser and the result is kept only on this device.' },
	],
};
