import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Articles: guides answer a question people ask before or after a test;
// compare pieces are the only place trademarked test names appear.
const articleSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional().default(false),
	/** Three hand-picked internal links, chosen for the reader's next question. */
	related: z.array(z.string()).length(3).optional(),
	/** The test this article sends the reader to. */
	test: z.string().optional(),
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
