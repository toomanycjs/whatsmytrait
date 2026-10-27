// Structured data for every page, built in the layouts from props and
// frontmatter so no page hand-writes JSON-LD. Page.astro adds the
// breadcrumb, any FAQ, and the WebSite node on the homepage; Post.astro adds
// the article node. Each page outputs one @graph.

import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { DEFAULT_LOCALE, isLocale } from '../i18n/config';
import { asStep, duration, plain, type RecipeData } from './recipe';

export const SITE = 'https://www.postviralrecovery.com';

type Node = Record<string, unknown>;

export interface FaqPair {
	q: string;
	a: string;
}

export interface Crumb {
	name: string;
	path: string;
}

const abs = (path: string) => new URL(path, SITE).href;

/**
 * Home > Section > Page, matching the section label shown above each page's
 * heading. Paths with no index of their own (/tools/trackers/) are skipped.
 */
export function crumbsFor(pathname: string, name: string, sectionLabels: Record<string, string>): Crumb[] {
	const segs = pathname.split('/').filter(Boolean);
	let prefix = '';
	if (segs[0] && isLocale(segs[0]) && segs[0] !== DEFAULT_LOCALE) prefix = `/${segs.shift()}`;
	const crumbs: Crumb[] = [{ name: 'Home', path: `${prefix}/` }];
	if (segs.length === 0) return crumbs;
	const section = segs[0];
	if (segs.length > 1 && sectionLabels[section]) {
		crumbs.push({ name: sectionLabels[section], path: `${prefix}/${section}/` });
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

const author = { '@type': 'Person', name: 'Craig Johnson', url: `${SITE}/about/` };
const publisher = { '@type': 'Organization', '@id': `${SITE}/#publisher`, name: SITE_TITLE, url: `${SITE}/` };

export function websiteNode(lang: string): Node {
	return {
		'@type': 'WebSite',
		'@id': `${SITE}/#website`,
		name: SITE_TITLE,
		url: `${SITE}/`,
		description: SITE_DESCRIPTION,
		inLanguage: lang,
		publisher,
	};
}

export interface ArticleInput {
	section: string;
	title: string;
	description: string;
	pubDate: Date;
	modified?: Date;
	url: string;
	image: string;
	lang: string;
}

/** Evidence reviews are both an Article and a MedicalWebPage; everything else is a BlogPosting. */
export function articleNode(a: ArticleInput): Node {
	const modified = (a.modified ?? a.pubDate).toISOString();
	const node: Node = {
		'@type': a.section === 'evidence' ? ['Article', 'MedicalWebPage'] : 'BlogPosting',
		headline: a.title,
		description: a.description,
		inLanguage: a.lang,
		datePublished: a.pubDate.toISOString(),
		dateModified: modified,
		image: a.image,
		mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
		author,
		publisher,
	};
	if (a.section === 'evidence') node.lastReviewed = modified;
	return node;
}

/**
 * Low Spoon Cooking posts are a Recipe rather than a BlogPosting. The
 * ingredients and steps are the same frontmatter the page renders, so the
 * markup always matches the visible text, which Google requires.
 */
export function recipeNode(a: ArticleInput, r: RecipeData): Node {
	const modified = (a.modified ?? a.pubDate).toISOString();
	const node: Node = {
		'@type': 'Recipe',
		name: a.title,
		description: a.description,
		inLanguage: a.lang,
		datePublished: a.pubDate.toISOString(),
		dateModified: modified,
		image: r.image ? abs(r.image) : a.image,
		mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
		author,
		publisher,
		recipeYield: r.yield,
		prepTime: duration(r.prepMinutes),
		cookTime: duration(r.cookMinutes),
		totalTime: duration(r.prepMinutes + r.cookMinutes),
		recipeIngredient: r.ingredients.flatMap((g) => g.items.map(plain)),
		recipeInstructions: r.steps.map(asStep).map((step, i) => ({
			'@type': 'HowToStep',
			position: i + 1,
			text: plain([step.text, ...(step.options ?? [])].join(' ')),
		})),
	};
	if (r.category) node.recipeCategory = r.category;
	if (r.cuisine) node.recipeCuisine = r.cuisine;
	if (r.keywords?.length) node.keywords = r.keywords.join(', ');
	return node;
}

export function graph(nodes: Node[]) {
	return { '@context': 'https://schema.org', '@graph': nodes };
}
