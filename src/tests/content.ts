// The shape of a test page's content file (src/tests/<slug>.ts): everything
// the test template needs beyond the instrument file. Copy, not data: the
// instrument's items, keys, norms and reliability come from the data file.

import type { FaqPair } from '../lib/schema';

export interface ScaleCopy {
	/** Name on the page, if it differs from the instrument's scale name. */
	name?: string;
	/** The italic what-this-means sentence, by band of the person's percentile (or raw thirds without norms). */
	means: { low: string; mid: string; high: string };
	/** 80 to 120 words on what a high score looks like. */
	high: string;
	/** 80 to 120 words on what a low score looks like. */
	low: string;
	/** The trait page that explains this scale, once it exists. */
	traitPath?: string;
}

export interface TestContent {
	/** The instrument data file id. */
	instrument: string;
	/** Site path of this page, with slashes. */
	path: string;
	/** Title tag, under 60 characters, written for the search. */
	title: string;
	/** Meta description: one plain sentence with the item count and time. */
	description: string;
	/** The H1, named for the question. */
	question: string;
	/** One-line subtitle naming the instrument and its length. */
	subtitle: string;
	/** Name of this page in breadcrumbs and links. */
	breadcrumb: string;
	/** The norms group to compare against by default. */
	normsGroup?: string;
	/** Scales shown on the results page, in order. Facets are drawn under their domain automatically. */
	scales: Record<string, ScaleCopy>;
	/** A short note on test-retest reliability, or that none is published. */
	testRetest: string;
	/** Three hand-picked links. */
	related: { href: string; title: string; note?: string }[];
	faqs: FaqPair[];
}
