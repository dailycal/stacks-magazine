// The magazine's sections. Source of truth for the section nav, the section
// index/landing pages, the homepage's article list, and the `section` enum
// that article frontmatter is validated against (see src/content.config.ts).

export interface Section {
	name: string;
	slug: string;
	description: string;
	// Position of this section in the homepage's "Latest" article list
	// (ascending). Use -1 to leave the section off the homepage.
	homepageOrder: number;
}

export const sections: Section[] = [
	{
		name: "Headlines",
		slug: "headlines",
		description: "Longform commentary and news analysis.",
		homepageOrder: 1,
	},
	{
		name: "Essays",
		slug: "essays",
		description: "Personal narratives and essays.",
		homepageOrder: 2,
	},
	{
		name: "Features",
		slug: "features",
		description: "Local arts and culture.",
		homepageOrder: 3,
	},
	{
		name: "From the Stacks",
		slug: "from-the-stacks",
		description:
			"Metaphorically dig through archived issues of the Daily Cal to get a glimpse of life in Berkeley, from noteworthy headlines to everyday reporting that has been otherwise lost in the stacks.",
		homepageOrder: 4,
	},
	{
		name: "Photo Essays",
		slug: "photo-essays",
		description: "Visual storytelling from around Berkeley.",
		homepageOrder: 5,
	},
	{
		name: "Editorial Cartoons",
		slug: "editorial-cartoons",
		description: "Illustrated commentary on campus and city life.",
		homepageOrder: -1,
	},
];
