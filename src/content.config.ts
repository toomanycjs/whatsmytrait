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
	// Translations live in a locale subfolder (e.g. src/content/testing/de/foo.md
	// → /de/testing/foo/) and pair with the English post at the same slug
	// automatically. Set the same translationKey on both when the slugs differ.
	lang: z.string().optional(),
	translationKey: z.string().optional(),
	// Low Spoon Cooking recipes: the 1 to 5 spoon rating shown with the title.
	spoons: z.number().int().min(1).max(5).optional(),
});

const testing = defineCollection({
	loader: glob({ base: './src/content/testing', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const evidence = defineCollection({
	loader: glob({ base: './src/content/evidence', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const lowSpoonCooking = defineCollection({
	loader: glob({ base: './src/content/low-spoon-cooking', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

export const collections = { testing, evidence, 'low-spoon-cooking': lowSpoonCooking };
