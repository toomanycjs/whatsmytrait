// References cited on the trait and guide pages. Each was checked against
// Crossref on 3 November 2026. Add to this file rather than typing a
// reference into a page, so a reference is written once.
import type { Citation } from './content';

export const CITE = {
	roberts2007: {
		label: 'Roberts and others, 2007',
		reference: 'Roberts, B. W., Kuncel, N. R., Shiner, R., Caspi, A., & Goldberg, L. R. (2007). The power of personality: The comparative validity of personality traits, socioeconomic status, and cognitive ability for predicting important life outcomes. Perspectives on Psychological Science, 2(4), 313-345.',
		doi: '10.1111/j.1745-6916.2007.00047.x',
	},
	soto2019: {
		label: 'Soto, 2019',
		reference: 'Soto, C. J. (2019). How replicable are links between personality traits and consequential life outcomes? The Life Outcomes of Personality Replication Project. Psychological Science, 30(5), 711-727.',
		doi: '10.1177/0956797619831612',
	},
	roberts2006: {
		label: 'Roberts, Walton and Viechtbauer, 2006',
		reference: 'Roberts, B. W., Walton, K. E., & Viechtbauer, W. (2006). Patterns of mean-level change in personality traits across the life course: A meta-analysis of longitudinal studies. Psychological Bulletin, 132(1), 1-25.',
		doi: '10.1037/0033-2909.132.1.1',
	},
	ozer2006: {
		label: 'Ozer and Benet-Martínez, 2006',
		reference: 'Ozer, D. J., & Benet-Martínez, V. (2006). Personality and the prediction of consequential outcomes. Annual Review of Psychology, 57, 401-421.',
		doi: '10.1146/annurev.psych.57.102904.190127',
	},
	barrick1991: {
		label: 'Barrick and Mount, 1991',
		reference: 'Barrick, M. R., & Mount, M. K. (1991). The Big Five personality dimensions and job performance: A meta-analysis. Personnel Psychology, 44(1), 1-26.',
		doi: '10.1111/j.1744-6570.1991.tb00688.x',
	},
	judge2002: {
		label: 'Judge and others, 2002',
		reference: 'Judge, T. A., Bono, J. E., Ilies, R., & Gerhardt, M. W. (2002). Personality and leadership: A qualitative and quantitative review. Journal of Applied Psychology, 87(4), 765-780.',
		doi: '10.1037/0021-9010.87.4.765',
	},
} satisfies Record<string, Citation>;

export const SIBLINGS = [
	{ href: '/traits/openness/', title: 'Openness to experience' },
	{ href: '/traits/conscientiousness/', title: 'Conscientiousness' },
	{ href: '/traits/extraversion/', title: 'Extraversion' },
	{ href: '/traits/agreeableness/', title: 'Agreeableness' },
	{ href: '/traits/neuroticism/', title: 'Neuroticism' },
];

export const siblingsExcept = (href: string) => SIBLINGS.filter((s) => s.href !== href);
