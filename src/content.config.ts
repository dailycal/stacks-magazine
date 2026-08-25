import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from 'astro/zod'

/**
 * Content collection type definitions of all articles in ./src/content.
 */
const articles = defineCollection({
	loader: glob({ pattern: "*/*.{md,mdx}", base: "./src/content" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subheadline: z.string().optional(),
			authors: z.array(z.string()),
			publishDate: z.coerce.date(),
			section: z.string(),
			issue: z.string(),
			staffAttribution: z.boolean().default(false),
			featuredImage: z.union([image(), z.url()]).optional(),
			featuredImageAlt: z.string().optional(),
			featuredImageCaption: z.string().optional(),
		}),
});

export const collections = { articles };
