// Masthead data for the about page's right-hand column (src/pages/about.astro):
// staff, editors, creative, and credits listings.

export interface MastheadPerson {
	name: string;
	url?: string;
}

export interface MastheadEntry {
	role: string;
	people: MastheadPerson[];
}

export interface MastheadSection {
	heading?: string;
	entries: MastheadEntry[];
}

export const about: {
	staff: MastheadSection;
	editors: MastheadSection;
	creative: MastheadSection;
	credits: MastheadSection;
} = {
  // Staff section
	staff: {
		entries: [
			{ role: "Editor-in-Chief", people: [{ name: "Ananya Rupanagunta" }] },
			{ role: "Managing Editor", people: [{ name: "Chrissa Olson" }] },
			{ role: "Creative Director", people: [{ name: "Sally King" }] },
		],
	},
  // Editors section
	editors: {
		heading: "Editors",
		entries: [
			{
				role: "Magazine Managing Editor",
				people: [{ name: "Clara Brownstein" }],
			},
			{
				role: "Editors",
				people: [{ name: "Elise Fisher" }, { name: "Sam Grotenstein" }],
			},
			{
				role: "Contributing Editors",
				people: [{ name: "Elsa Ying" }, { name: "Milo Kofman" }],
			},
			{
				role: "Night Editors",
				people: [
					{ name: "Caroline Hunt" },
					{ name: "Ella Kirshbaum" },
					{ name: "Kelcie Lee" },
					{ name: "Megan Lam" },
					{ name: "Serene Han" },
				],
			},
		],
	},
	// Creative section
	creative: {
		heading: "Creative",
		entries: [
			{ role: "Graphics editor", people: [{ name: "Eleanor Robertson" }] },
			{ role: "Photo editor", people: [{ name: "Ahana Sur" }] },
		],
	},
  // Credits section
	credits: {
		heading: "Credits",
		entries: [
			{
				role: "Website by",
				people: [
					{
						name: "Joever Orillosa",
						url: "https://www.ocf.berkeley.edu/~joever/portfoli0_o",
					},
					{ name: "Siddhartha Chatterjee" },
				],
			},
			{
				role: "Logo by",
				people: [{ name: "Alyssa Nguyen" }],
			},
			{
				role: "Founding Editors",
				people: [
					{ name: "Clara Brownstein" },
					{ name: "Ananya Rupanagunta" },
					{ name: "Aarya Mukherjee" },
					{ name: "Elise Fisher" },
					{ name: "Sam Grotenstein" },
					{ name: "Stella Merims" },
				],
			},
		],
	},
};
