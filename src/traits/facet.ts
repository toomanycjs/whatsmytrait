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
	/** The name the site uses for the facet, in sentence case: the authors' own unless publishedName is set. */
	name: string;
	/** The authors' name, when the site uses a plainer one for the page (docs/decisions/0003-published-facet-names.md). */
	publishedName?: string;
	domain: DomainId;
	/** What the facet is, in one paragraph. */
	summary: string;
	high: string;
	low: string;
	/** What it does not mean. A line about the scale's length is added to every facet. */
	notMean: string[];
	/** What each of the four items is getting at, one plain line per item in the data file's order. */
	items: string[];
	predicts: { text: string; cite: Citation }[];
	/** One sentence with one link, shown under the summary. */
	seeAlso?: { before: string; label: string; href: string; after: string };
}

/** An item as the instrument data file lists it. */
export interface FacetItem {
	n: number;
	text: string;
	scale: string;
	key: number;
}

/** URL slug from the facet's name: "Self-consciousness" to "self-consciousness". */
export const facetSlug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
export const facetPath = (name: string) => `/traits/${facetSlug(name)}/`;

const SHORT_SCALE = 'Four items make a short scale. A facet score moves more between attempts than the 24-item domain score, and it describes a tendency in ordinary life as the person reports it, not a diagnosis of anything.';

export function facet(spec: FacetSpec, all: FacetSpec[], instrumentItems: FacetItem[]): TraitContent {
	const domain = DOMAINS[spec.domain];
	const lower = spec.name.toLowerCase();
	const domainLower = domain.name.toLowerCase();
	const siblings = all.filter((f) => f.domain === spec.domain && f.id !== spec.id).map((f) => ({ href: facetPath(f.name), title: f.name }));
	const scaleItems = instrumentItems.filter((it) => it.scale === spec.id).sort((a, b) => a.n - b.n);
	if (scaleItems.length !== spec.items.length) throw new Error(`facet ${spec.id}: ${spec.items.length} item lines for ${scaleItems.length} items`);
	const items = scaleItems.map((it, i) => ({ text: it.text.replace(/\.$/, ''), line: spec.items[i], reversed: it.key < 0 }));
	return {
		path: facetPath(spec.name),
		title: `${spec.name}: what a high or low score means`,
		description: `What the ${lower} facet of ${domainLower} is, what high and low scores look like day to day, what the research finds it predicts, and where people fall.`,
		name: spec.name,
		subtitle: spec.publishedName ? `A facet of ${domainLower}, published as ${spec.publishedName}. Four items in the IPIP-NEO-120.` : `A facet of ${domainLower}. Four items in the IPIP-NEO-120.`,
		breadcrumb: spec.name,
		summary: spec.summary,
		seeAlso: spec.seeAlso,
		notMean: [...spec.notMean, SHORT_SCALE],
		high: spec.high,
		low: spec.low,
		facetsHeading: 'Parent domain',
		facets: [{ name: domain.name, line: `the broad trait this facet belongs to, with five sibling facets.`, href: domain.href }],
		items,
		predicts: spec.predicts,
		strips: [{ instrument: 'ipip-neo-120', scale: spec.id, group: 'all', label: `IPIP-NEO-120, ${lower}, 4 items`, testHref: '/tests/big-five/', name: spec.name }],
		test: { href: '/tests/big-five/', label: 'Take the Big Five test' },
		siblingsHeading: `The other facets of ${domainLower}`,
		siblings,
	};
}
