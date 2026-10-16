// Translation registry: which pages exist in which languages.
//
// Nothing is hand-maintained. At build time this scans every page under
// src/pages and every content-collection entry, works out each one's locale
// and URL from its file path, and groups the variants of the same page.
//
// Grouping rule: a page's translation key defaults to its English path
// (/tools/compass-31/), so a translation saved at src/pages/de/tools/compass-31.astro
// pairs with src/pages/tools/compass-31.astro automatically. When a translated
// slug differs, set the same explicit key on both sides: `translationKey="..."`
// on the <Page> layout of an .astro page, or `translationKey:` in a post's
// frontmatter.
//
// BaseHead uses getAlternates() for hreflang; Header/Footer use localizedPath()
// so navigation stays in the visitor's language wherever a translation exists
// and falls back to English otherwise.

import { getCollection } from 'astro:content';
import { DEFAULT_LOCALE, LOCALES, NON_DEFAULT_LOCALES, localeOfId, stripLocale, type Locale } from './config';

export interface Variant {
	locale: Locale;
	path: string;
}

export interface TranslationGroup {
	key: string;
	variants: Variant[];
}

export interface PageSource extends Variant {
	file: string;
	source: string;
}

const SECTIONS = ['testing', 'evidence', 'low-spoon-cooking'] as const;

// Raw sources, so the key can be read without executing the page. The OG image
// generator reads titles the same way.
const PAGE_SOURCES = import.meta.glob<string>('../pages/**/*.astro', {
	query: '?raw',
	import: 'default',
	eager: true,
});

function normalisePath(pathname: string): string {
	let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
	if (!p.endsWith('/')) p += '/';
	return p;
}

function routeOfFile(file: string): Variant | null {
	const rel = file.replace(/^\.\.\/pages\//, '').replace(/\.astro$/, '');
	if (rel.includes('[') || rel.startsWith('og/')) return null;
	const parts = rel.split('/');
	let locale: Locale = DEFAULT_LOCALE;
	if (parts.length > 1 && (NON_DEFAULT_LOCALES as string[]).includes(parts[0])) {
		locale = parts.shift() as Locale;
	}
	if (parts[parts.length - 1] === 'index') parts.pop();
	const rest = parts.length ? `${parts.join('/')}/` : '';
	const prefix = locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
	return { locale, path: prefix + rest };
}

/** Every static .astro page with its locale, URL path, and raw source. */
export function listPages(): PageSource[] {
	const pages: PageSource[] = [];
	for (const [file, source] of Object.entries(PAGE_SOURCES)) {
		const route = routeOfFile(file);
		if (route) pages.push({ ...route, file, source });
	}
	return pages;
}

function keyOfPage(page: PageSource): string {
	const explicit = page.source.match(/\btranslationKey="([^"]+)"/)?.[1];
	return explicit ?? stripLocale(page.path);
}

let groupsPromise: Promise<Map<string, TranslationGroup>> | undefined;

async function buildGroups(): Promise<Map<string, TranslationGroup>> {
	const groups = new Map<string, TranslationGroup>();
	const add = (key: string, variant: Variant) => {
		const group = groups.get(key) ?? { key, variants: [] };
		if (!group.variants.some((v) => v.locale === variant.locale)) group.variants.push(variant);
		groups.set(key, group);
	};

	for (const page of listPages()) add(keyOfPage(page), { locale: page.locale, path: page.path });

	for (const section of SECTIONS) {
		const entries = await getCollection(section, (e) => !e.data.draft);
		for (const entry of entries) {
			const { locale, rest } = localeOfId(entry.id);
			const englishPath = `/${section}/${rest}/`;
			const path = locale === DEFAULT_LOCALE ? englishPath : `/${locale}${englishPath}`;
			add(entry.data.translationKey ?? englishPath, { locale, path });
		}
	}

	return groups;
}

function groups(): Promise<Map<string, TranslationGroup>> {
	groupsPromise ??= buildGroups();
	return groupsPromise;
}

const LOCALE_ORDER = new Map(LOCALES.map((l, i) => [l, i] as const));

/**
 * All language versions of the page at `pathname`, itself included, in a
 * stable order (English first). Empty when the page has no translations, so
 * callers emit nothing rather than a lone self-reference.
 */
export async function getAlternates(pathname: string): Promise<Variant[]> {
	const path = normalisePath(pathname);
	for (const group of (await groups()).values()) {
		if (group.variants.some((v) => v.path === path)) {
			if (group.variants.length < 2) return [];
			return [...group.variants].sort((a, b) => LOCALE_ORDER.get(a.locale)! - LOCALE_ORDER.get(b.locale)!);
		}
	}
	return [];
}

/**
 * The `locale` version of the English page at `englishPath` if one exists,
 * otherwise the English path itself. Keeps navigation links in-language
 * without ever linking to a page that is not there.
 */
export async function localizedPath(locale: Locale, englishPath: string): Promise<string> {
	const path = normalisePath(englishPath);
	if (locale === DEFAULT_LOCALE) return path;
	for (const group of (await groups()).values()) {
		if (group.variants.some((v) => v.locale === DEFAULT_LOCALE && v.path === path)) {
			return group.variants.find((v) => v.locale === locale)?.path ?? path;
		}
	}
	return path;
}
