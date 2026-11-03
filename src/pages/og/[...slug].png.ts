// Share image per page, generated at build from the page's glyph and title:
// Page ground, the title in Familjen Grotesk, a glyph of strips with markers
// in the Marker colour, the site name and the one-line promise. No photos.
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { SITE_TITLE } from '../../consts';

const PAGE = '#F2F4F1';
const INK = '#23282D';
const QUIET = '#55606A';
const MARKER = '#F2C230';
const HAIR = 'rgba(35,40,45,0.18)';

// Static pages: read the literal title from each <Page ...> or <LongForm ...> tag.
const PAGE_SOURCES = import.meta.glob<string>('../**/*.astro', { query: '?raw', import: 'default', eager: true });

function staticPages() {
	const out: { slug: string; title: string; section: string }[] = [];
	for (const [file, source] of Object.entries(PAGE_SOURCES)) {
		const rel = file.replace(/^\.\.\//, '').replace(/\.astro$/, '');
		if (rel.includes('[') || rel.startsWith('og/') || rel === '404') continue;
		const tag = source.match(/<(?:Page|LongForm|TestPage|TraitPage|CareerTypePage)\b([^>]*?)>/)?.[1] ?? '';
		let title = tag.match(/\btitle="([^"]*)"/)?.[1];
		if (!title && /\btitle=\{SITE_TITLE\}/.test(tag)) title = SITE_TITLE;
		if (!title) continue; // pages whose title comes from a content file are covered below
		const slug = rel === 'index' ? 'home' : rel.replace(/\/index$/, '');
		out.push({ slug, title, section: slug.split('/')[0] });
	}
	return out;
}

export async function getStaticPaths() {
	const paths: { params: { slug: string }; props: { title: string; section: string } }[] = [];
	for (const p of staticPages()) paths.push({ params: { slug: p.slug }, props: { title: p.title, section: p.section } });
	// Pages built from content files.
	const { TESTS } = await import('../../tests/registry');
	for (const t of TESTS) paths.push({ params: { slug: t.content.path.replace(/^\/|\/$/g, '') }, props: { title: t.content.question, section: 'tests' } });
	const { bigFive } = await import('../../tests/big-five');
	const { bigFiveShort } = await import('../../tests/big-five-short');
	for (const c of [bigFive, bigFiveShort]) paths.push({ params: { slug: c.path.replace(/^\/|\/$/g, '') }, props: { title: c.question, section: 'tests' } });
	const { SIBLINGS } = await import('../../traits/citations');
	for (const s of SIBLINGS) paths.push({ params: { slug: s.href.replace(/^\/|\/$/g, '') }, props: { title: s.title, section: 'traits' } });
	const { CAREER_TYPES } = await import('../../careers/registry');
	for (const c of CAREER_TYPES) paths.push({ params: { slug: c.path.replace(/^\/|\/$/g, '') }, props: { title: `${c.name} careers`, section: 'careers' } });
	for (const e of await getCollection('guides', (x) => !x.data.draft)) paths.push({ params: { slug: `guides/${e.id}` }, props: { title: e.data.question ?? e.data.title, section: 'guides' } });
	for (const e of await getCollection('compare', (x) => !x.data.draft)) paths.push({ params: { slug: `compare/${e.id}` }, props: { title: e.data.question ?? e.data.title, section: 'compare' } });
	// De-duplicate by slug (a static page may also appear in a registry).
	const seen = new Set<string>();
	return paths.filter((p) => (seen.has(p.params.slug) ? false : (seen.add(p.params.slug), true)));
}

type Props = { title: string; section: string };

/** The glyph: strips with markers. Five for tests and traits, six for careers, one otherwise. */
function glyph(section: string) {
	const n = section === 'careers' ? 6 : section === 'tests' || section === 'traits' ? 5 : 1;
	const positions = [0.62, 0.3, 0.74, 0.46, 0.22, 0.56];
	const rows = [];
	for (let i = 0; i < n; i++) {
		const y = n === 1 ? 60 : 12 + i * (120 / n);
		rows.push({ type: 'div', props: { style: { position: 'absolute', left: 0, top: `${y}px`, width: '220px', height: '2px', backgroundColor: INK } } });
		rows.push({ type: 'div', props: { style: { position: 'absolute', left: `${positions[i] * 220 - 5}px`, top: `${y - 8}px`, width: '10px', height: '18px', backgroundColor: MARKER, border: `1.5px solid ${INK}`, borderRadius: '3px' } } });
	}
	return { type: 'div', props: { style: { position: 'relative', width: '220px', height: '132px', display: 'flex' }, children: rows } };
}

export async function GET({ props }: { props: Props }) {
	const { title, section } = props;
	const font = fs.readFileSync('./src/assets/fonts/familjen-grotesk-400.ttf');
	const fontBold = fs.readFileSync('./src/assets/fonts/familjen-grotesk-600.ttf');
	const size = title.length > 60 ? 48 : title.length > 36 ? 58 : 68;
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: PAGE, fontFamily: 'Familjen Grotesk', padding: '64px 72px 56px', color: INK },
				children: [
					{ type: 'div', props: { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '28px', borderBottom: `1px solid ${HAIR}` }, children: [
						{ type: 'div', props: { style: { fontSize: '26px', fontWeight: 600 }, children: SITE_TITLE } },
						{ type: 'div', props: { style: { fontSize: '22px', color: QUIET }, children: section === 'home' ? '' : section.charAt(0).toUpperCase() + section.slice(1) } },
					] } },
					{ type: 'div', props: { style: { flex: 1, display: 'flex', alignItems: 'center', gap: '56px', paddingTop: '28px' }, children: [
						{ type: 'div', props: { style: { flex: 1, fontSize: `${size}px`, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.015em', display: 'flex' }, children: title } },
						glyph(section),
					] } },
					{ type: 'div', props: { style: { display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: `1px solid ${HAIR}`, fontSize: '22px', color: QUIET }, children: [
						{ type: 'div', props: { children: 'Free, open tests. Scored on your device.' } },
						{ type: 'div', props: { children: 'Results describe tendencies and are not a diagnosis.' } },
					] } },
				],
			},
		},
		{ width: 1200, height: 630, fonts: [{ name: 'Familjen Grotesk', data: font, weight: 400, style: 'normal' as const }, { name: 'Familjen Grotesk', data: fontBold, weight: 600, style: 'normal' as const }] },
	);
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
