// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import indexNow from './src/integrations/indexnow.mjs';

// Keep in step with LOCALES in src/i18n/config.ts. English is served
// unprefixed; every other language lives under its own prefix (/de/...).
const locales = ['en', 'de', 'nl', 'it', 'sv', 'es'];

// https://astro.build/config
export default defineConfig({
	site: 'https://www.postviralrecovery.com',
	i18n: {
		defaultLocale: 'en',
		locales,
		routing: { prefixDefaultLocale: false },
	},
	integrations: [
		mdx(),
		// The sitemap groups URLs that share a path under different locale
		// prefixes and emits xhtml:link alternates for them, mirroring the
		// hreflang tags in <head>. Bare language codes, not regions.
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: Object.fromEntries(locales.map((l) => [l, l])),
			},
		}),
		indexNow({ key: 'eb73f98dcdd3385b928b449ee1887596' }),
	],
});
