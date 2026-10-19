// Fails the build if any page links to a retired /nhs/ URL, a /nhs/ page is
// built again, or an internal link drops its trailing slash. vercel.json
// redirects all three, but internal links should never rely on a redirect.

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
const NHS = /href="(?:https:\/\/www\.postviralrecovery\.com)?(\/nhs\/[^"]*)"/g;

export default function linkCheck() {
	return {
		name: 'link-check',
		hooks: {
			'astro:build:done': ({ dir, logger }) => {
				const root = fileURLToPath(dir);
				const problems = [];
				for (const file of htmlFiles(root)) {
					const page = '/' + file.slice(root.length).replace(/\\/g, '/').replace(/^\/|index\.html$/g, '');
					if (page.startsWith('/nhs/')) problems.push(`${page} is built, but /nhs/ is retired`);
					const html = readFileSync(file, 'utf8');
					for (const [, href] of html.matchAll(NHS)) problems.push(`${page} links to ${href}`);
					for (const [, href] of html.matchAll(NO_SLASH)) problems.push(`${page} links to ${href} without a trailing slash`);
				}
				if (problems.length) {
					throw new Error(`link check failed:\n  ${problems.join('\n  ')}`);
				}
				logger.info('no /nhs/ links or slashless internal links');
			},
		},
	};
}
