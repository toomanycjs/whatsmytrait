import { getCollection } from 'astro:content';
import { isDefaultLocaleId } from '../i18n/config';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const [testing, evidence, cooking] = await Promise.all([
		getCollection('testing', p => !p.data.draft && isDefaultLocaleId(p.id)),
		getCollection('evidence', p => !p.data.draft && isDefaultLocaleId(p.id)),
		getCollection('low-spoon-cooking', p => !p.data.draft && isDefaultLocaleId(p.id)),
	]);

	const allPosts = [
		...testing.map(p => ({ ...p.data, link: `/testing/${p.id}/` })),
		...evidence.map(p => ({ ...p.data, link: `/evidence/${p.id}/` })),
		...cooking.map(p => ({ ...p.data, link: `/low-spoon-cooking/${p.id}/` })),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allPosts,
	});
}
