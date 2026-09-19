import { getCollection, type CollectionEntry } from "astro:content";
import { issues, type Issue } from "../config/issues";
import { withBase } from "./path";

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

export interface TocArticle {
  href: string;
  title: string;
  subheadline?: string;
}

export interface TocGroup {
  category: string;
  articles: TocArticle[];
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
 * Groups one issue's articles by section for a table-of-contents listing:
 * newest first within each section, sections ordered by article count (most
 * first) then alphabetically to break ties. Shared by the homepage and the
 * per-issue archive page so both render the same "In This Issue" listing.
 * @param issue The issue slug (e.g. "april-2026") to filter articles down to.
 * @param articles Every article across all issues (e.g. from getAllArticles()).
 * @returns The issue's articles grouped into TOC sections.
 */
export function buildTableOfContents(issue: string, articles: ArticleWithSlugs[]): TocGroup[] {
  const issueArticles = articles.filter((article) => article.issue === issue);

  const bySection = new Map<string, ArticleWithSlugs[]>();
  for (const article of issueArticles) {
    const section = article.entry.data.section;
    const group = bySection.get(section) ?? [];
    group.push(article);
    bySection.set(section, group);
  }

  for (const group of bySection.values()) {
    group.sort(
      (a, b) => b.entry.data.publishDate.getTime() - a.entry.data.publishDate.getTime(),
    );
  }

  return Array.from(bySection.entries())
    .sort(([sectionA, articlesA], [sectionB, articlesB]) => {
      if (articlesA.length !== articlesB.length) return articlesB.length - articlesA.length;
      return sectionA.localeCompare(sectionB);
    })
    .map(([category, group]) => ({
      category,
      articles: group.map((article) => ({
        href: withBase(`/issues/${article.issue}/${article.slug}`),
        title: article.entry.data.title,
        subheadline: article.entry.data.subheadline,
      })),
    }));
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

/**
 * The `issues` config entry with the most recent `date`. Used for the topbar
 * issue number, where the content collection isn't needed.
 * @returns The newest issue metadata entry.
 */
export function getMostRecentIssueMeta(): Issue {
  if (issues.length === 0) {
    throw new Error("config/issues.ts: `issues` is empty.");
  }
  return [...issues]
    .sort((a, b) => issueSlugToDate(b.date).getTime() - issueSlugToDate(a.date).getTime())[0];
}

/**
 * The most recent issue slug among the given article folders (plain max by
 * date, e.g. "april-2026").
 * @param articleIssues Issue slugs taken from article folders.
 * @returns The newest issue slug.
 */
export function mostRecentIssueFolder(articleIssues: string[]): string {
  const unique = Array.from(new Set(articleIssues));
  if (unique.length === 0) {
    throw new Error("mostRecentIssueFolder: no article issues given.");
  }
  return unique
    .map((issue) => ({ issue, date: issueSlugToDate(issue) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0].issue;
}

/**
 * The current issue's metadata, validated against the content folders: the
 * newest `issues` config entry must have the same `date` as the newest issue
 * folder in src/content, otherwise this throws. Call this from a page that
 * always builds (e.g. the homepage) so a content folder can't ship without its
 * issues.ts entry.
 * @param articleIssues Issue slugs taken from article folders (e.g. from getAllArticles()).
 * @returns The newest issue metadata entry.
 */
export function getCurrentIssue(articleIssues: string[]): Issue {
  const meta = getMostRecentIssueMeta();
  const folder = mostRecentIssueFolder(articleIssues);
  if (meta.date !== folder) {
    throw new Error(
      `Issue mismatch: the most recent entry in src/config/issues.ts is ` +
      `"${meta.date}", but the most recent issue folder in src/content is ` +
      `"issue-${folder}". Add or correct the issues.ts entry so its \`date\` ` +
      `matches the newest content folder.`,
    );
  }
  return meta;
}
