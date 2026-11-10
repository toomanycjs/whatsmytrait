// Published and updated dates for every page, keyed by URL path, for the
// dates shown on each page, the article JSON-LD and the sitemap's <lastmod>.
// Plain JS so that astro.config.mjs and scripts can import it as well as pages.
//
// Every date is a field someone edits by hand; nothing is written at build:
//   - markdown articles (guides, compare): pubDate and updatedDate in the
//     frontmatter;
//   - every other page: src/data/dates.json, { published, updated } per path.
// Index pages (the homepage, /tests/, /guides/ ...) take the newest updated
// date of anything beneath them and show no date of their own.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const CONTENT = 'src/content';
const DATES_FILE = 'src/data/dates.json';
const INDEXES = ['/', '/tests/', '/traits/', '/careers/', '/guides/', '/compare/'];

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

let cache;

/** URL path to { published, updated } (YYYY-MM-DD) for every page that has dates. */
export function datesByPath() {
	if (cache) return cache;
	const dates = new Map();

	for (const section of existsSync(CONTENT) ? readdirSync(CONTENT) : []) {
		for (const file of walk(join(CONTENT, section)).filter((f) => /\.mdx?$/.test(f))) {
			const fm = frontmatter(readFileSync(file, 'utf8'));
			if (fm.draft === 'true') continue;
			const slug = posix(relative(join(CONTENT, section), file)).replace(/\.mdx?$/, '');
			const published = isoDay(fm.pubDate ?? '');
			if (!published) continue;
			dates.set(`/${section}/${slug}/`, { published, updated: isoDay(fm.updatedDate ?? '') ?? published });
		}
	}

	const table = existsSync(DATES_FILE) ? JSON.parse(readFileSync(DATES_FILE, 'utf8')) : {};
	for (const [path, d] of Object.entries(table)) {
		if (path.startsWith('_')) continue;
		dates.set(path, { published: d.published, updated: d.updated ?? d.published });
	}

	// Index pages are as fresh as the newest page beneath them.
	for (const index of INDEXES) {
		let newest;
		let first;
		for (const [path, d] of dates) {
			if (path === index || !path.startsWith(index)) continue;
			if (!newest || d.updated > newest) newest = d.updated;
			if (!first || d.published < first) first = d.published;
		}
		if (newest) dates.set(index, { published: first, updated: newest, index: true });
	}

	cache = dates;
	return dates;
}

/** URL path to the updated date, for the sitemap. */
export function lastmodByPath() {
	return new Map([...datesByPath()].map(([path, d]) => [path, d.updated]));
}

/** The dates for one page, or undefined. */
export function datesFor(path) {
	return datesByPath().get(path);
}
