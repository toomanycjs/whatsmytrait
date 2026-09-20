import type { InferGetStaticPathsType } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { SITE_TITLE } from '../../consts';
import { DEFAULT_LOCALE, localeOfId, ui, type Locale } from '../../i18n/config';
import { listPages } from '../../i18n/registry';

const SECTION_COLORS: Record<string, string> = {
	evidence: '#2563eb',
	testing: '#059669',
	nhs: '#1d4ed8',
	tools: '#7c3aed',
};
const DEFAULT_COLOR = '#0d6b74';

const ENTITIES: Record<string, string> = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'",
	'&ndash;': '–',
	'&mdash;': '—',
};

function decodeEntities(text: string) {
	return text.replace(/&(?:amp|lt|gt|quot|#39|ndash|mdash);/g, (entity) => ENTITIES[entity]);
}

/** Section kicker for the image, in the page's own language. */
function sectionLabel(locale: Locale, firstSegment: string | undefined): string {
	const t = ui(locale);
	switch (firstSegment) {
		case 'testing': return t.nav.testing;
		case 'evidence': return t.nav.evidence;
		case 'nhs': return t.nav.nhs;
		case 'tools': return t.nav.tools;
		case 'about': return t.nav.about;
		case 'contact': return t.nav.contact;
		default: return '';
	}
}

// Static pages set their title on the <Page> layout (or <BaseHead> directly),
// so read it back out of the source rather than keeping a second copy here:
// a hand-maintained list drifts out of sync the moment a title is rewritten.
// The registry already knows every page's locale and URL, translations included.
function staticPages() {
	return listPages().map((page) => {
		const tag = page.source.match(/<(?:Page|BaseHead)\b([^>]*?)\/?>/)?.[1] ?? '';
		let title = tag.match(/\btitle="([^"]*)"/)?.[1];
		if (!title && /\btitle=\{SITE_TITLE\}/.test(tag)) title = SITE_TITLE;
		if (!title) {
			throw new Error(`No literal title found on <Page> or <BaseHead> in ${page.file}`);
		}
		const slug = page.path.replace(/^\/|\/$/g, '') || 'home';
		const segments = page.path.replace(/^\/|\/$/g, '').split('/');
		if (page.locale !== DEFAULT_LOCALE) segments.shift();
		return {
			slug,
			title: decodeEntities(title),
			section: segments[0] ?? '',
			locale: page.locale,
		};
	});
}

export async function getStaticPaths() {
	const collections = ['testing', 'evidence', 'nhs'] as const;
	const paths = [];

	for (const collection of collections) {
		const posts = await getCollection(collection, (p) => !p.data.draft);
		for (const post of posts) {
			const { locale, rest } = localeOfId(post.id);
			const slug = locale === DEFAULT_LOCALE ? `${collection}/${rest}` : `${locale}/${collection}/${rest}`;
			paths.push({
				params: { slug },
				props: { title: post.data.title, section: collection, locale },
			});
		}
	}

	for (const page of staticPages()) {
		paths.push({
			params: { slug: page.slug },
			props: { title: page.title, section: page.section, locale: page.locale },
		});
	}

	return paths;
}

type Props = InferGetStaticPathsType<typeof getStaticPaths>['props'];

export async function GET({ props }: { props: Props }) {
	const { title, section, locale } = props;
	const color = SECTION_COLORS[section] ?? DEFAULT_COLOR;
	const label = sectionLabel(locale as Locale, section).toUpperCase();
	const fontSize = title.length > 80 ? 36 : title.length > 50 ? 42 : 48;

	const fontRegular = fs.readFileSync('./public/fonts/atkinson-regular.woff');
	const fontBold = fs.readFileSync('./public/fonts/atkinson-bold.woff');

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#fafafa',
					fontFamily: 'Atkinson',
				},
				children: [
					{
						type: 'div',
						props: {
							style: { width: '100%', height: '8px', backgroundColor: color },
						},
					},
					{
						type: 'div',
						props: {
							style: {
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								padding: '48px 64px 40px',
							},
							children: [
								{
									type: 'div',
									props: {
										style: { display: 'flex', flexDirection: 'column' },
										children: [
											{
												type: 'div',
												props: {
													style: {
														fontSize: '20px',
														fontWeight: 700,
														color,
														letterSpacing: '0.12em',
														marginBottom: '28px',
													},
													children: label,
												},
											},
											{
												type: 'div',
												props: {
													style: {
														fontSize: `${fontSize}px`,
														fontWeight: 700,
														color: '#1a1a1a',
														lineHeight: 1.25,
													},
													children: title,
												},
											},
										],
									},
								},
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											borderTop: '2px solid #e5e5e5',
											paddingTop: '20px',
										},
										children: [
											{
												type: 'div',
												props: {
													style: {
														fontSize: '22px',
														fontWeight: 700,
														color: '#444',
													},
													children: 'Post Viral Recovery',
												},
											},
											{
												type: 'div',
												props: {
													style: { fontSize: '18px', color: '#999' },
													children: 'postviralrecovery.com',
												},
											},
										],
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Atkinson', data: fontRegular, weight: 400, style: 'normal' as const },
				{ name: 'Atkinson', data: fontBold, weight: 700, style: 'normal' as const },
			],
		},
	);

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: { 'Content-Type': 'image/png' },
	});
}
