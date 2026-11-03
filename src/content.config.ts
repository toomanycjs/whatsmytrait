import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Articles: guides answer a question people ask before or after a test;
// compare pieces are the only place trademarked test names appear. The H1
// is the question or the search phrase; the first two sentences answer it.
const articleSchema = z.object({
	title: z.string(),
	description: z.string(),
	/** The H1, when it differs from the title tag. */
	question: z.string().optional(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional().default(false),
	/** The test this article sends the reader to. */
	test: z.object({ href: z.string(), label: z.string() }),
	/** Three hand-picked internal links, chosen for the reader's next question. */
	related: z.array(z.object({ href: z.string(), title: z.string(), note: z.string().optional() })).length(3),
	/** References cited in the text, shown in the sources box. */
	sources: z.array(z.object({ reference: z.string(), doi: z.string().optional(), url: z.string().optional() })).default([]),
	/** A population strip to show, with the reader's marker if a result is saved. */
	strip: z.object({ instrument: z.string(), scale: z.string(), label: z.string(), testHref: z.string() }).optional(),
});

const guides = defineCollection({
	loader: glob({ base: './src/content/guides', pattern: '**/*.{md,mdx}' }),
	schema: articleSchema,
});

const compare = defineCollection({
	loader: glob({ base: './src/content/compare', pattern: '**/*.{md,mdx}' }),
	schema: articleSchema,
});

export const collections = { guides, compare };
