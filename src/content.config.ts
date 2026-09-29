import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from 'astro/zod'
import { sections } from "./config/sections";

// Every section's name (pretty names, not slugs)
const sectionNames = sections.map((section) => section.name) as [string, ...string[]];

// Sections with their own content type (e.g. Editorial Cartoons, which lives
// in the cartoons collection) that articles can't be filed under.
const nonArticleSections = new Set(
	sections.filter((section) => section.customPage).map((section) => section.name),
);

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
			section: z.enum(sectionNames).refine((name) => !nonArticleSections.has(name), {
				message:
					'This section is only for its own content type (Editorial Cartoons are cartoons in src/content/cartoons), not articles.',
			}),
			issue: z.string().optional(),
			staffAttribution: z.boolean().default(false),
			featuredImage: z
				.union([
					// A public/ file, referenced by its site-root path (e.g.
					// "/some-image.jpg"); base-prefixed via withBase() wherever it's
					// rendered (see SmartImage.astro and SEO.astro). This has to come
					// before image() below: image() accepts *any* string at this
					// point (it only fails later, at build, once Astro tries and
					// fails to resolve it as a src/-relative asset), so a root path
					// would otherwise never reach this branch.
					z.string().regex(/^\/(?!\/)/),
					z.url(),
					image(),
				])
				.optional(),
			featuredImageAlt: z.string().optional(),
			featuredImageCaption: z.string().optional(),
			// Hide the featured image on the article page itself (it still appears on
			// cards and social previews) when the body already opens with that image.
			skipFeaturedImage: z.boolean().default(false),
			// Populates <meta name="keywords">; omitted entirely when not set.
			keywords: z.array(z.string()).optional(),
		}),
});

/**
 * Editorial cartoons: one JSON file per cartoon in ./src/content/cartoons,
 * with its image at src/assets/images/cartoons/<slug>.<ext>. The slug, the
 * JSON file name and the image name must all match; that's verified at build
 * time in src/lib/cartoons.ts.
 */
const cartoons = defineCollection({
	loader: glob({ pattern: "*.json", base: "./src/content/cartoons" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		author: z.string(),
		date: z.coerce.date(),
	}),
});

export const collections = { articles, cartoons };
