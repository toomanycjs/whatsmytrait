// Builds a facet page's content (TraitContent) from a short spec, so the
// thirty IPIP-NEO-120 facet pages share one shape: the title, description,
// breadcrumb, parent-domain line, population strip, test button and sibling
// facets come from the spec's name and domain; the copy is written per facet
// in facets-<domain>.ts. Facet names are the authors' own, in sentence case.
import type { Citation, TraitContent } from './content';

export type DomainId = 'N' | 'E' | 'O' | 'A' | 'C';

export const DOMAINS: Record<DomainId, { name: string; href: string }> = {
	N: { name: 'Neuroticism', href: '/traits/neuroticism/' },
	E: { name: 'Extraversion', href: '/traits/extraversion/' },
	O: { name: 'Openness to experience', href: '/traits/openness/' },
	A: { name: 'Agreeableness', href: '/traits/agreeableness/' },
	C: { name: 'Conscientiousness', href: '/traits/conscientiousness/' },
};

export interface FacetSpec {
	/** Scale id in the IPIP-NEO-120 data file: N1 to C6. */
	id: string;
	/** The authors' name for the facet, in sentence case. */
	name: string;
	domain: DomainId;
	/** What the facet is, in one paragraph. */
	summary: string;
	high: string;
	low: string;
	/** What it does not mean. A line about the scale's length is added to every facet. */
	notMean: string[];
	predicts: { text: string; cite: Citation }[];
}

/** URL slug from the facet's name: "Self-consciousness" to "self-consciousness". */
export const facetSlug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
export const facetPath = (name: string) => `/traits/${facetSlug(name)}/`;

const SHORT_SCALE = 'Four items make a short scale. A facet score moves more between attempts than the 24-item domain score, and it describes a tendency in ordinary life as the person reports it, not a diagnosis of anything.';

export function facet(spec: FacetSpec, all: FacetSpec[]): TraitContent {
	const domain = DOMAINS[spec.domain];
	const lower = spec.name.toLowerCase();
	const domainLower = domain.name.toLowerCase();
	const siblings = all.filter((f) => f.domain === spec.domain && f.id !== spec.id).map((f) => ({ href: facetPath(f.name), title: f.name }));
	return {
		path: facetPath(spec.name),
		title: `${spec.name}: what a high or low score means`,
		description: `What the ${lower} facet of ${domainLower} is, what high and low scores look like day to day, what the research finds it predicts, and where people fall.`,
		name: spec.name,
		subtitle: `A facet of ${domainLower}. Four items in the IPIP-NEO-120.`,
		breadcrumb: spec.name,
		summary: spec.summary,
		notMean: [...spec.notMean, SHORT_SCALE],
		high: spec.high,
		low: spec.low,
		facetsHeading: 'Parent domain',
		facets: [{ name: domain.name, line: `the broad trait this facet belongs to, with five sibling facets.`, href: domain.href }],
		predicts: spec.predicts,
		strips: [{ instrument: 'ipip-neo-120', scale: spec.id, group: 'all', label: `IPIP-NEO-120, ${lower}, 4 items`, testHref: '/tests/big-five/' }],
		test: { href: '/tests/big-five/', label: 'Take the Big Five test' },
		siblingsHeading: `The other facets of ${domainLower}`,
		siblings,
	};
}
