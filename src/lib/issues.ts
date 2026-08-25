import { getCollection, type CollectionEntry } from "astro:content";

// Valid months
const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

// Articles should live in directories named issue-<full lowercase month>-<4-digit year>, e.g. "issue-april-2026".
const ISSUE_DIR_PATTERN = new RegExp(`^issue-(?:${MONTHS.join("|")})-\\d{4}$`);

/**
 * Strips the "issue-" prefix from a content directory name. Throws if the directory name isn't
 * "issue-<full lowercase month>-<4-digit year>".
 * @param dirName The name of the directory containing the issue's articles.
 * @returns The issue slug.
 */
export function parseIssueDirName(dirName: string): string {
  if (!ISSUE_DIR_PATTERN.test(dirName)) {
    throw new Error(
      `Invalid issue directory name "${dirName}" in src/content: expected ` +
      `"issue-<full lowercase month>-<4-digit year>", e.g. "issue-april-2026".`,
    );
  }
  return dirName.slice("issue-".length);
}

export interface ArticleWithSlugs {
  issue: string;
  slug: string;
  entry: CollectionEntry<"articles">;
}

/**
 * Gets every article in the collection with its issue and article slugs formatted.
 * @returns A promise resolving to an array of article objects with issue and slug properties.
 */
export async function getAllArticles(): Promise<ArticleWithSlugs[]> {
  const entries = await getCollection("articles");
  return entries.map((entry) => {
    const [dirName, slug] = entry.id.split("/");
    return { issue: parseIssueDirName(dirName), slug, entry };
  });
}

/**
 * Parses an issue slug (e.g. "april-2026") into a Date representing the 1st of that month.
 * @param issue The issue slug.
 * @returns A Date for the 1st of that issue's month.
 */
export function issueSlugToDate(issue: string): Date {
  const match = issue.match(/^([a-z]+)-(\d{4})$/);
  if (!match) {
    throw new Error(`Invalid issue slug "${issue}" — expected "<month>-<year>".`);
  }
  const [, month, year] = match;
  const monthIndex = MONTHS.indexOf(month);
  if (monthIndex === -1) {
    throw new Error(`Invalid issue slug "${issue}" — "${month}" isn't a valid month name.`);
  }
  return new Date(Number(year), monthIndex, 1);
}

/**
 * Picks the most recent issue at or before `asOf` (defaults to now).
 * @param issues The issue slugs to choose from.
 * @param asOf The date to compare against (defaults to the current date/time).
 * @returns The most recent qualifying issue slug.
 */
export function getMostRecentIssue(issues: string[], asOf: Date = new Date()): string {
  const uniqueIssues = Array.from(new Set(issues));
  if (uniqueIssues.length === 0) {
    throw new Error("getMostRecentIssue: no issues given.");
  }
  const sortedByDateDesc = uniqueIssues
    .map((issue) => ({ issue, date: issueSlugToDate(issue) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  const mostRecentPastOrPresent = sortedByDateDesc.find(({ date }) => date.getTime() <= asOf.getTime());
  return (mostRecentPastOrPresent ?? sortedByDateDesc[sortedByDateDesc.length - 1]).issue;
}

/**
 * Formats an issue slug (e.g. "april-2026") as a human-readable "Month Year" label.
 * @param issue The issue slug.
 * @returns The formatted label, e.g. "April 2026".
 */
export function formatIssueDate(issue: string): string {
  const date = issueSlugToDate(issue);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

/**
 * The content directory name for an issue slug, e.g. "april-2026" -> "issue-april-2026".
 * @param issue The issue slug.
 * @returns The directory name.
 */
export function issueDirName(issue: string): string {
  return `issue-${issue}`;
}
