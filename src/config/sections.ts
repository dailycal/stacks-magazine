// The magazine's sections. Source of truth for the section nav, the section
// index/landing pages, and the `section` enum that article frontmatter is
// validated against (see src/content.config.ts).
export const sections = [
	{
		name: "Headlines",
		slug: "headlines",
		description: "Longform commentary and news analysis.",
	},
	{
		name: "Essays",
		slug: "essays",
		description: "Personal narratives and essays.",
	},
	{
		name: "Features",
		slug: "features",
		description: "Local arts and culture.",
	},
	{
		name: "From the Stacks",
		slug: "from-the-stacks",
		description:
			"Metaphorically dig through archived issues of the Daily Cal to get a glimpse of life in Berkeley, from noteworthy headlines to everyday reporting that has been otherwise lost in the stacks.",
	},
	{
		name: "Photo Essays",
		slug: "photo-essays",
		description: "Visual storytelling from around Berkeley.",
	},
	{
		name: "Editorial Cartoons",
		slug: "editorial-cartoons",
		description: "Illustrated commentary on campus and city life.",
	},
];
