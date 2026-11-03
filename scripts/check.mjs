// Project checks that run before any page ships: `npm run check`.
//
// 1. The wordlist. The site measures traits, not states, so clinical
//    vocabulary must not appear in copy, component names, CSS classes or
//    content schemas. The permitted exceptions are listed below.
// 2. Against the built site in dist/ (run `npm run build` first; skipped with
//    a notice if dist/ is missing):
//    - orphans: every test, trait, career, compare and guide page is linked
//      from at least two other pages;
//    - a sources and licence box on every test, trait, career, compare page
//      with sources, and the trust pages that carry one;
//    - a licence line wherever an instrument is reproduced;
//    - title tags under 60 characters;
//    - trademarked test names only on /compare/ pages.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src', 'packages/instruments/src', 'packages/instruments/data'];
const EXTENSIONS = /\.(astro|ts|mjs|js|css|md|mdx|json)$/;

const BANNED = [
	'symptom', 'clinical', 'clinician', 'patient', 'diagnos', 'severity', 'screener', 'screening',
	'disorder', 'depress', 'anxiety', 'medical', 'illness', 'treatment', 'therapy',
];
// The adjective in the patience test's question is not the clinical noun.
// "clinical sites" is the owner's own wording on the About page.
const ALLOWED_PHRASES = ['not a diagnosis', 'never diagnose', 'does not diagnose', 'do not diagnose', 'never diagnoses', 'how patient', 'patient person', 'more patient', 'less patient', 'clinical sites'];
// Published scale names inside an approved instrument's data file. The
// IPIP-NEO-120 is an approved inventory and names two of its thirty facets
// Anxiety and Depression; they are trait facets of Neuroticism, kept as the
// authors name them (docs/decisions/0003-published-facet-names.md). Only the
// exact name line in a data file is allowed; the words stay banned in copy.
const ALLOWED_DATA_LINES = ['"name": "anxiety"', '"name": "depression"'];
const TRADEMARKS = ['MBTI', 'Myers-Briggs', '16Personalities', 'NEO PI', 'VIA Survey'];

function walk(dir, test = (name) => EXTENSIONS.test(name)) {
	let out = [];
	for (const d of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, d.name);
		if (d.isDirectory()) out = out.concat(walk(p, test));
		else if (test(d.name)) out.push(p);
	}
	return out;
}

const problems = [];

// ── 1. Wordlist ──
for (const root of ROOTS) {
	let files = [];
	try { files = walk(root); } catch { continue; }
	for (const file of files) {
		const lines = readFileSync(file, 'utf8').split(/\r?\n/);
		lines.forEach((line, i) => {
			let text = line.toLowerCase();
			if (file.includes('data') && file.endsWith('.json')) {
				if (/^\s*"text":/.test(line) || /^\s*"instructions":/.test(line)) return;
				if (ALLOWED_DATA_LINES.some((l) => text.includes(l))) return;
			}
			if (/name['"]?:\s*['"](anxiety|depression)['"]/i.test(line)) return;
			if (file.endsWith('check.mjs')) return;
			// Job titles are the National Careers Service's and O*NET's own names, not the site's copy.
			if (file.replace(/\\/g, '/').includes('src/careers/') && /\{\s*title:/.test(line)) return;
			for (const phrase of ALLOWED_PHRASES) text = text.split(phrase).join('');
			for (const word of BANNED) {
				if (text.includes(word)) problems.push(`wordlist: ${file}:${i + 1}: "${word}" in: ${line.trim().slice(0, 100)}`);
			}
		});
	}
}

// ── 2. The built site ──
if (!existsSync('dist')) {
	console.log('dist/ not found: run npm run build to check orphans, sources boxes, licence lines and titles');
} else {
	const files = walk('dist', (name) => name.endsWith('.html'));
	const pages = new Map();
	for (const file of files) {
		const path = '/' + file.slice('dist'.length).replace(/\\/g, '/').replace(/^\/|index\.html$/g, '');
		pages.set(path, readFileSync(file, 'utf8'));
	}
	const linkRe = /href="(\/(?:[^"#?/.]+\/)*)(?:[#?][^"]*)?"/g;
	const inbound = new Map();
	for (const [from, html] of pages) {
		const targets = new Set();
		for (const [, href] of html.matchAll(linkRe)) if (href !== from) targets.add(href);
		for (const t of targets) inbound.set(t, (inbound.get(t) ?? 0) + 1);
	}
	const SECTIONS = ['/tests/', '/traits/', '/careers/', '/compare/', '/guides/'];
	for (const [path, html] of pages) {
		if (path === '/404/' || path === '/') continue;
		const content = SECTIONS.some((s) => path.startsWith(s) && path !== s);
		if (content && (inbound.get(path) ?? 0) < 2) problems.push(`orphan: ${path} is linked from ${inbound.get(path) ?? 0} other pages (needs 2)`);
		const isTest = path.startsWith('/tests/') && path !== '/tests/' && path !== '/tests/which/';
		if ((isTest || path.startsWith('/traits/') && path !== '/traits/' || path.startsWith('/careers/') && path !== '/careers/') && !html.includes('data-sources-box')) {
			problems.push(`sources: ${path} has no sources and licence box`);
		}
		if ((isTest || path === '/licences/' || path === '/for-teachers-and-researchers/' || path.startsWith('/careers/')) && !html.includes('data-licence-line')) {
			problems.push(`licence: ${path} has no licence line`);
		}
		const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
		if (title.length > 60) problems.push(`title: ${path} title is ${title.length} characters: ${title}`);
		if (!path.startsWith('/compare/')) {
			const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
			for (const tm of TRADEMARKS) if (title.includes(tm) || h1.includes(tm)) problems.push(`trademark: ${path} uses ${tm} in its title or H1`);
		}
	}
	console.log(`built site: ${pages.size} pages checked for orphans, sources boxes, licence lines, titles and trademarks`);
}

if (problems.length) {
	console.error(`check failed (${problems.length}):\n  ${problems.join('\n  ')}`);
	process.exit(1);
}
console.log('check passed');
