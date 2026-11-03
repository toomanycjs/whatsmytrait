// Builds the content for a single-trait test page: one scale, a three-minute
// answer to one question, linking to the full Big Five for the wider picture.
import type { FaqPair } from '../lib/schema';
import type { ScaleCopy, TestContent } from './content';

export interface SingleTraitSpec {
	instrument: string;
	slug: string;
	/** Title tag, under 60 characters. */
	title: string;
	description: string;
	question: string;
	subtitle: string;
	breadcrumb: string;
	minutes: number;
	scale: ScaleCopy;
	/** The parent trait's page. */
	traitPath: string;
	traitTitle: string;
	/** What the key page says about reliability, in one sentence. */
	testRetest: string;
	/** Two or three test-specific questions; the common ones are added. */
	faqs: FaqPair[];
	/** The guide written for this test. */
	guide?: { href: string; title: string; note?: string };
}

export function singleTrait(spec: SingleTraitSpec): TestContent {
	return {
		instrument: spec.instrument,
		path: `/tests/${spec.slug}/`,
		title: spec.title,
		description: spec.description,
		question: spec.question,
		subtitle: spec.subtitle,
		minutes: spec.minutes,
		breadcrumb: spec.breadcrumb,
		scales: { T: { ...spec.scale, traitPath: spec.traitPath } },
		testRetest: spec.testRetest,
		related: [
			{ href: '/tests/big-five/', title: 'The Big Five, with the facets', note: 'The wider picture: five traits and thirty facets.' },
			{ href: spec.traitPath, title: spec.traitTitle, note: 'What the parent trait is and what the research finds.' },
			spec.guide ?? { href: '/tests/', title: 'All tests', note: 'Grouped by what you want to know.' },
		],
		faqs: [
			...spec.faqs,
			{ q: 'Why is there no percentile on this test?', a: 'No norm sample has been published for this scale on its own, and the site never estimates or invents norms. Your marker is drawn against the possible range instead, and the page says so. The Big Five tests do have published norms.' },
			{ q: 'Is a high or low score better?', a: 'Neither. Each end has strengths and costs, and the research describes tendencies across large groups, not what any one person will do. The site never colours scores as good or bad.' },
			{ q: 'Where do my answers go?', a: 'Nowhere. The test is scored in your browser and the result is kept only on this device. If you choose to share a link, your scores are inside the link itself and nothing is sent to this site.' },
		],
	};
}
