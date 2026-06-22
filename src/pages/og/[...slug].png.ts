import type { InferGetStaticPathsType } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';

const SECTION_COLORS: Record<string, string> = {
	evidence: '#2563eb',
	testing: '#059669',
	nhs: '#1d4ed8',
	tools: '#7c3aed',
};

const SECTION_LABELS: Record<string, string> = {
	evidence: 'EVIDENCE REVIEW',
	testing: 'TESTING',
	nhs: 'NHS GUIDANCE',
	tools: 'TOOLS',
};

const TOOL_PAGES = [
	{ slug: 'tools/compass-31', title: 'COMPASS-31 questionnaire: free online version with automatic scoring' },
	{ slug: 'tools/bell-scale', title: 'Bell CFIDS Disability Scale: free online functional capacity assessment' },
	{ slug: 'tools/epworth', title: 'Epworth Sleepiness Scale: free online questionnaire with scoring' },
	{ slug: 'tools/fss', title: 'Fatigue Severity Scale (FSS): free online questionnaire with scoring' },
	{ slug: 'tools/nasa-lean-test', title: 'NASA lean test: how to do a poor man\'s tilt table test at home, with timer and logging' },
	{ slug: 'tools/nijmegen', title: 'Nijmegen questionnaire: free online breathing pattern disorder screening tool' },
	{ slug: 'tools/which-questionnaire', title: 'Which questionnaire should I take? A guide to post-viral self-assessment tools' },
	{ slug: 'tools/fibromyalgia-survey', title: 'Fibromyalgia symptom test: free online 2016 ACR survey with scoring' },
	{ slug: 'tools/trackers/hrv-tracker', title: 'Free HRV and resting heart rate tracker: Google Sheets template for daily logging' },
	{ slug: 'tools/trackers/stand-test-logger', title: 'Free stand test logger: track orthostatic heart rate over time' },
	{ slug: 'tools/trackers/symptom-diary', title: 'Free post-viral symptom diary: Google Sheets template with rolling averages' },
];

export async function getStaticPaths() {
	const collections = ['testing', 'evidence', 'nhs'] as const;
	const paths = [];

	for (const collection of collections) {
		const posts = await getCollection(collection, (p) => !p.data.draft);
		for (const post of posts) {
			paths.push({
				params: { slug: `${collection}/${post.id}` },
				props: { title: post.data.title, section: collection },
			});
		}
	}

	for (const tool of TOOL_PAGES) {
		paths.push({
			params: { slug: tool.slug },
			props: { title: tool.title, section: 'tools' },
		});
	}

	return paths;
}

type Props = InferGetStaticPathsType<typeof getStaticPaths>['props'];

export async function GET({ props }: { props: Props }) {
	const { title, section } = props;
	const color = SECTION_COLORS[section] ?? '#666';
	const label = SECTION_LABELS[section] ?? section.toUpperCase();
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
