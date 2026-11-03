// Fails the build if an internal link drops its trailing slash or points at a
// page that was not built. Internal links never rely on a redirect.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

function htmlFiles(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
		const p = join(dir, d.name);
		return d.isDirectory() ? htmlFiles(p) : d.name.endsWith('.html') ? [p] : [];
	});
}

// Root-relative hrefs whose last segment has no file extension and no trailing slash.
const NO_SLASH = /href="(\/(?:[^"#?/.]+\/)*[^"#?/.]+)(?:[#?][^"]*)?"/g;
// Root-relative page links with a trailing slash, before any #fragment or ?query.
const PAGE = /href="(\/(?:[^"#?/.]+\/)*)(?:[#?][^"]*)?"/g;

export default function linkCheck() {
	return {
		name: 'link-check',
		hooks: {
			'astro:build:done': ({ dir, logger }) => {
				const root = fileURLToPath(dir);
				const problems = [];
				const files = htmlFiles(root);
				const built = new Set(files.map((f) => '/' + f.slice(root.length).replace(/\\/g, '/').replace(/^\/|index\.html$/g, '')));
				for (const file of files) {
					const page = '/' + file.slice(root.length).replace(/\\/g, '/').replace(/^\/|index\.html$/g, '');
					const html = readFileSync(file, 'utf8');
					for (const [, href] of html.matchAll(NO_SLASH)) problems.push(`${page} links to ${href} without a trailing slash`);
					for (const [, href] of html.matchAll(PAGE)) if (!built.has(href)) problems.push(`${page} links to ${href}, which is not a built page`);
				}
				if (problems.length) {
					throw new Error(`link check failed:\n  ${problems.join('\n  ')}`);
				}
				logger.info('no slashless internal links or links to missing pages');
			},
		},
	};
}
