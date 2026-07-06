// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import indexNow from './src/integrations/indexnow.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.postviralrecovery.com',
	integrations: [mdx(), sitemap(), indexNow({ key: 'eb73f98dcdd3385b928b449ee1887596' })],
});
