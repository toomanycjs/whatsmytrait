// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import indexNow from './src/integrations/indexnow.mjs';
import linkCheck from './src/integrations/link-check.mjs';
import { lastmodByPath } from './src/lib/lastmod.mjs';

// Placeholder until the owner chooses the domain. Keep in step with
// SITE_URL in src/consts.ts (astro.config cannot import TypeScript).
const SITE_URL = 'https://personality-tests.example';

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	integrations: [
		mdx(),
		sitemap({
			// Real last-modified dates; see src/lib/lastmod.mjs for where they come from.
			serialize(item) {
				const date = lastmodByPath().get(new URL(item.url).pathname);
				return date ? { ...item, lastmod: date } : item;
			},
		}),
		linkCheck(),
		// Submits changed pages to IndexNow on production builds. Build-side only;
		// nothing runs in the visitor's browser.
		indexNow({ key: 'a7c3e91f4b2d8e6c5f0a1b9d3c7e2f48' }),
	],
});
