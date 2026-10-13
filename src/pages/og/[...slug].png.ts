import type { InferGetStaticPathsType } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { SITE_TITLE } from '../../consts';
import { DEFAULT_LOCALE, localeOfId, ui, type Locale } from '../../i18n/config';
import { listPages } from '../../i18n/registry';

// Share image in the site's own register: serif title, a small coloured
// section kicker, hairline rules, white ground. Colours are the section
// tokens from global.css so the card matches the page it links to.
const SECTION_COLORS: Record<string, string> = {
	testing: '#1e6b3c',
	evidence: '#3a4fa8',
	tools: '#7a3a8c',
	nhs: '#b84a1e',
};
const ACCENT = '#0d6b74';
const BLACK = '#14181e';
const GRAY = '#5a6c7c';
const RULE = '#e2e8ee';

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

// Page titles carry an SEO tail after a colon ("COMPASS-31: free online
// questionnaire with automatic scoring"). On the card the head is the title
// and the tail becomes a quieter second line, so the image reads like the
// page's own heading rather than a search snippet.
function splitTitle(title: string): { head: string; tail?: string } {
	const m = title.match(/^(.{6,70}?):\s+(.{12,})$/);
	if (m) return { head: m[1], tail: m[2].charAt(0).toUpperCase() + m[2].slice(1) };
	if (title === SITE_TITLE) {
		return { head: title, tail: 'Validated questionnaires, trackers, evidence reviews and NHS guidance for post-viral illness, dysautonomia and ME/CFS' };
	}
	return { head: title };
}

export async function GET({ props }: { props: Props }) {
	const { title, section, locale } = props;
	const color = SECTION_COLORS[section] ?? ACCENT;
	const label = sectionLabel(locale as Locale, section);
	const { head, tail } = splitTitle(title);
	const headSize = head.length > 64 ? 48 : head.length > 40 ? 56 : 66;

	const serif = fs.readFileSync('./public/fonts/source-serif-4-600.woff');
	const sansRegular = fs.readFileSync('./public/fonts/atkinson-regular.woff');
	const sansBold = fs.readFileSync('./public/fonts/atkinson-bold.woff');

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#ffffff',
					fontFamily: 'Atkinson',
					padding: '56px 72px 48px',
				},
				children: [
					// Kicker row: section name on the left, site name on the right
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'baseline',
								paddingBottom: '18px',
								borderBottom: `2px solid ${BLACK}`,
							},
							children: [
								{
									type: 'div',
									props: {
										style: { fontSize: '26px', fontWeight: 700, color },
										children: label || ' ',
									},
								},
								{
									type: 'div',
									props: {
										style: { fontSize: '28px', fontFamily: 'Source Serif 4', fontWeight: 600, color: BLACK },
										children: 'Post Viral Recovery',
									},
								},
							],
						},
					},
					// Title block
					{
						type: 'div',
						props: {
							style: {
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								paddingTop: '28px',
								paddingBottom: '28px',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontFamily: 'Source Serif 4',
											fontSize: `${headSize}px`,
											fontWeight: 600,
											color: BLACK,
											lineHeight: 1.15,
											letterSpacing: '-0.01em',
										},
										children: head,
									},
								},
								...(tail
									? [
											{
												type: 'div',
												props: {
													style: {
														fontSize: '30px',
														color: GRAY,
														lineHeight: 1.35,
														marginTop: '22px',
													},
													children: tail,
												},
											},
										]
									: []),
							],
						},
					},
					// Footer rule and address
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								borderTop: `1px solid ${RULE}`,
								paddingTop: '18px',
								fontSize: '22px',
								color: GRAY,
							},
							children: [
								{ type: 'div', props: { children: 'postviralrecovery.com' } },
								{ type: 'div', props: { children: section === 'tools' ? 'Free, scored in your browser' : ' ' } },
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
				{ name: 'Source Serif 4', data: serif, weight: 600, style: 'normal' as const },
				{ name: 'Atkinson', data: sansRegular, weight: 400, style: 'normal' as const },
				{ name: 'Atkinson', data: sansBold, weight: 700, style: 'normal' as const },
			],
		},
	);

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: { 'Content-Type': 'image/png' },
	});
}
