// Structured data for every page, built in the layouts from props and
// frontmatter so no page hand-writes JSON-LD. Page.astro adds the breadcrumb,
// any FAQ, and the WebSite node on the homepage; article pages add the Article
// node. Each page outputs one @graph. No AggregateRating, no review markup.

import { SECTIONS, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../consts';

type Node = Record<string, unknown>;

export interface FaqPair {
	q: string;
	a: string;
}

export interface Crumb {
	name: string;
	path: string;
}

const abs = (path: string) => new URL(path, SITE_URL).href;

/** Home > Section > Page. */
export function crumbsFor(pathname: string, name: string): Crumb[] {
	const segs = pathname.split('/').filter(Boolean);
	const crumbs: Crumb[] = [{ name: 'Home', path: '/' }];
	if (segs.length === 0) return crumbs;
	const section = segs[0];
	if (segs.length > 1 && SECTIONS[section]) {
		crumbs.push({ name: SECTIONS[section], path: `/${section}/` });
	}
	crumbs.push({ name, path: pathname });
	return crumbs;
}

export function breadcrumbList(crumbs: Crumb[]): Node {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
	};
}

/** FAQ answers must be the same strings the page renders. */
export function faqPage(faqs: FaqPair[]): Node {
	return {
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
	};
}

const publisher = { '@type': 'Organization', '@id': `${SITE_URL}/#publisher`, name: SITE_TITLE, url: `${SITE_URL}/` };

export function websiteNode(): Node {
	return {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		name: SITE_TITLE,
		url: `${SITE_URL}/`,
		description: SITE_DESCRIPTION,
		inLanguage: 'en-GB',
		publisher,
	};
}

export interface ArticleInput {
	title: string;
	description: string;
	pubDate: Date;
	modified?: Date;
	url: string;
	image: string;
}

/** Guides and compare pages are Articles. */
export function articleNode(a: ArticleInput): Node {
	return {
		'@type': 'Article',
		headline: a.title,
		description: a.description,
		inLanguage: 'en-GB',
		datePublished: a.pubDate.toISOString(),
		dateModified: (a.modified ?? a.pubDate).toISOString(),
		image: a.image,
		mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
		author: publisher,
		publisher,
	};
}

export function graph(nodes: Node[]) {
	return { '@context': 'https://schema.org', '@graph': nodes };
}
