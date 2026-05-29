import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	lastModified: z.coerce.date().optional(),
	series: z.string().optional(),
	draft: z.boolean().optional().default(false),
	ogImage: z.string().optional(),
});

const testing = defineCollection({
	loader: glob({ base: './src/content/testing', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const evidence = defineCollection({
	loader: glob({ base: './src/content/evidence', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const nhs = defineCollection({
	loader: glob({ base: './src/content/nhs', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

export const collections = { testing, evidence, nhs };
