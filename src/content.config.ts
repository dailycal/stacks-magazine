import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from 'astro/zod'
import { siteConfig } from "./config/site";

// The section names articles can be filed under (pretty names, not slugs) —
// sourced from config/site.ts, which is the source of truth for sections.
const sectionNames = siteConfig.sections.map((section) => section.name) as [string, ...string[]];

/**
 * Content collection type definitions of all articles in ./src/content.
 */
const articles = defineCollection({
	loader: glob({ pattern: "*/*.{md,mdx}", base: "./src/content" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subheadline: z.string().optional(),
			excerpt: z.string().optional(),
			authors: z.array(z.string()),
			publishDate: z.coerce.date(),
			section: z.enum(sectionNames),
			issue: z.string(),
			staffAttribution: z.boolean().default(false),
			featuredImage: z.union([image(), z.url()]).optional(),
			featuredImageAlt: z.string().optional(),
			featuredImageCaption: z.string().optional(),
		}),
});

export const collections = { articles };
