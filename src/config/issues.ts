// Per-issue metadata.
//
// The homepage renders the most recent entry's cover (see src/pages/index.astro)
// and the topbar renders the most recent entry's `issue` label (see
// src/layouts/PageLayout.astro). "Most recent" is decided by `date`, not array
// order, but keep this list newest-first for readability.

import { withBase } from "../lib/path";

export interface Issue {
	issue: string;
	date: string;
	cover: string;
	pdf: string;
	coverAuthor: string;
}

const issueData: Issue[] = [
	{
		issue: "Issue II",
		date: "april-2026",
		cover: "covers/issue-april-2026.png",
		pdf: "https://media.dailycal.org/stacks-magazine/issues/Issue_2.pdf",
		coverAuthor: "Milan Rafaelov",
	},
	{
		issue: "Issue II",
		date: "february-2026",
		cover: "covers/issue-feb-2026.png",
		pdf: "",
		coverAuthor: "Chloe Kim",
	},
	{
		issue: "Issue I",
		date: "december-2025",
		cover: "covers/issue-dec-2025.png",
		pdf: "https://media.dailycal.org/stacks-magazine/issues/Issue_1.pdf",
		coverAuthor: "",
	},
];

// Add base path to pdf paths before exporting
export const issues: Issue[] = issueData.map((issue) => ({
	...issue,
	pdf: issue.pdf ? withBase(issue.pdf) : "",
}));
