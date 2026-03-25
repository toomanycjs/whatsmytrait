import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const [testing, evidence, nhs] = await Promise.all([
		getCollection('testing', p => !p.data.draft),
		getCollection('evidence', p => !p.data.draft),
		getCollection('nhs', p => !p.data.draft),
	]);

	const allPosts = [
		...testing.map(p => ({ ...p.data, link: `/testing/${p.id}/` })),
		...evidence.map(p => ({ ...p.data, link: `/evidence/${p.id}/` })),
		...nhs.map(p => ({ ...p.data, link: `/nhs/${p.id}/` })),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allPosts,
	});
}
