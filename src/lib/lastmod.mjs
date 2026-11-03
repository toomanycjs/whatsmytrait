// Last-modified dates for every page, keyed by URL path, for the sitemap's
// <lastmod> and the article JSON-LD's dateModified. Plain JS so that
// astro.config.mjs and scripts/lastmod.mjs can import it as well as pages.
//
// For each page the first of these that exists wins:
//   1. updatedDate in an article's frontmatter
//   2. the lastReviewed constant in a page's frontmatter
//   3. the git date in src/data/lastmod.json (run `npm run lastmod`)
//   4. an article's pubDate
// Index pages (the homepage, /tests/, /guides/ ...) then take the newest
// date of anything beneath them.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const CONTENT = 'src/content';
const PAGES = 'src/pages';
const JSON_FILE = 'src/data/lastmod.json';

function walk(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
		d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
	);
}

const posix = (p) => p.split(sep).join('/');

function frontmatter(text) {
	const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	const fields = {};
	if (m) {
		for (const line of m[1].split(/\r?\n/)) {
			const kv = line.match(/^(\w+):\s*['"]?([^'"]*?)['"]?\s*$/);
			if (kv) fields[kv[1]] = kv[2];
		}
	}
	return fields;
}

const isoDay = (value) => {
	const d = new Date(value);
	return Number.isNaN(d.valueOf()) ? undefined : d.toISOString().slice(0, 10);
};

/** Every page that has its own source file: { path, file, date? } */
export function sourcePages() {
	const pages = [];

	for (const section of existsSync(CONTENT) ? readdirSync(CONTENT) : []) {
		for (const file of walk(join(CONTENT, section)).filter((f) => /\.mdx?$/.test(f))) {
			const fm = frontmatter(readFileSync(file, 'utf8'));
			if (fm.draft === 'true') continue;
			const slug = posix(relative(join(CONTENT, section), file)).replace(/\.mdx?$/, '');
			pages.push({
				path: `/${section}/${slug}/`,
				file: posix(file),
				date: isoDay(fm.updatedDate ?? ''),
				fallback: isoDay(fm.pubDate ?? ''),
			});
		}
	}

	for (const file of walk(PAGES).filter((f) => f.endsWith('.astro'))) {
		const rel = posix(relative(PAGES, file)).replace(/\.astro$/, '');
		if (rel.includes('[') || rel === '404') continue;
		const reviewed = readFileSync(file, 'utf8').match(/const lastReviewed = '(\d{4}-\d{2}-\d{2})'/);
		const path = rel === 'index' ? '/' : `/${rel.replace(/(^|\/)index$/, '')}/`.replace(/\/+/g, '/');
		pages.push({ path, file: posix(file), date: reviewed?.[1] });
	}

	return pages;
}

let cache;

/** URL path to YYYY-MM-DD for every page. */
export function lastmodByPath() {
	if (cache) return cache;
	const git = existsSync(JSON_FILE) ? JSON.parse(readFileSync(JSON_FILE, 'utf8')) : {};
	const dates = new Map();
	for (const p of sourcePages()) {
		const date = p.date ?? git[p.path] ?? p.fallback;
		if (date) dates.set(p.path, date);
	}
	// Index pages are as fresh as the newest page beneath them.
	for (const [path] of [...dates]) {
		if (!path.endsWith('/')) continue;
		for (const [other, date] of dates) {
			if (other.startsWith(path) && date > dates.get(path)) dates.set(path, date);
		}
	}
	cache = dates;
	return dates;
}
