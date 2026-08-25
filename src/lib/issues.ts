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
