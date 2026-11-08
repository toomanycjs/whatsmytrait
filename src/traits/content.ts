// The shape of a trait page's content file (src/traits/<slug>.ts).

export interface Citation {
	/** "Soto (2019)" */
	label: string;
	/** Full reference. */
	reference: string;
	doi?: string;
}

export interface TraitStrip {
	/** Instrument data file id. */
	instrument: string;
	/** Scale id within it. */
	scale: string;
	/** Norms group. */
	group?: string;
	/** Label beside the strip, e.g. "IPIP-NEO-120, 24 items". */
	label: string;
	/** Test page that produces a score on this strip. */
	testHref: string;
	/** Name shown on the strip, when it differs from the instrument's scale name. */
	name?: string;
}

export interface TraitContent {
	path: string;
	title: string;
	description: string;
	/** The H1. */
	name: string;
	subtitle: string;
	breadcrumb: string;
	/** What the trait is, in one paragraph. */
	summary: string;
	/** What high and low look like in daily life. */
	high: string;
	low: string;
	/** The facets, one line each (for a domain), or the parent (for a facet). */
	facets: { name: string; line: string; href?: string }[];
	/** Heading over the facets list; "Facets" unless set. */
	facetsHeading?: string;
	/** The scale's items (facet pages): the statement as the instrument words it, a plain line on what it is getting at, and whether agreeing lowers the score. */
	items?: { text: string; line: string; reversed: boolean }[];
	/** What the research says it predicts, each with its citation. */
	predicts: { text: string; cite: Citation }[];
	/** What it does not mean. Written before what it does. */
	notMean: string[];
	/** Population strips, usually the 120-item domain and the 50-item scale. */
	strips: TraitStrip[];
	/** The test button. */
	test: { href: string; label: string };
	/** Sibling traits. */
	siblings: { href: string; title: string }[];
	/** Heading over the siblings list; "The other traits" unless set. */
	siblingsHeading?: string;
}
