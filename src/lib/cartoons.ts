import type { ImageMetadata } from "astro";
import { getCollection } from "astro:content";
import { withBase } from "./path";

// Cartoons live at /sections/editorial-cartoons/<slug>.
const CARTOONS_PATH = "/sections/editorial-cartoons";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Every cartoon image, glob-imported eagerly so Vite bundles them.
const cartoonImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/cartoons/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

export interface Cartoon {
  slug: string;
  title: string;
  author: string;
  date: Date;
  image: ImageMetadata;
}

/** A path's file name without its directory or extension. */
function baseName(path: string): string {
  return path.split("/").pop()!.replace(/\.[^.]+$/, "");
}

/**
 * The site URL for a cartoon page.
 * @param slug The cartoon's slug.
 * @returns The base-prefixed path.
 */
export function cartoonHref(slug: string): string {
  return withBase(`${CARTOONS_PATH}/${slug}`);
}

/**
 * The cartoons in publication order (oldest first, ties broken by slug). Throws
 * a single error listing every inconsistency, so a bad cartoon fails the build:
 * a slug that isn't URL-safe or doesn't match its JSON file name, a cartoon
 * with no image named after its slug, or an image with no JSON file.
 * @returns The validated cartoons with their images.
 */
export async function getAllCartoons(): Promise<Cartoon[]> {
  const entries = await getCollection("cartoons");
  const problems: string[] = [];

  const imagesBySlug = new Map<string, ImageMetadata>();
  for (const [path, module] of Object.entries(cartoonImages)) {
    const name = baseName(path);
    if (imagesBySlug.has(name)) {
      problems.push(`Two images share the name "${name}" (${path}).`);
    }
    imagesBySlug.set(name, module.default);
  }

  const cartoons: Cartoon[] = [];
  for (const entry of entries) {
    const { slug, title, author, date } = entry.data;
    const fileName = baseName(entry.filePath ?? entry.id);
    const where = `src/content/cartoons/${fileName}.json`;

    if (!SLUG_PATTERN.test(slug)) {
      problems.push(`${where}: slug "${slug}" must be lowercase words joined by hyphens.`);
    }
    if (slug !== fileName) {
      problems.push(`${where}: slug "${slug}" doesn't match the file name "${fileName}".`);
    }
    const image = imagesBySlug.get(slug);
    if (!image) {
      problems.push(
        `${where}: no image named "${slug}" in src/assets/images/cartoons (png, jpg, jpeg or webp).`,
      );
      continue;
    }
    cartoons.push({ slug, title, author, date, image });
  }

  const slugs = new Set(entries.map((entry) => entry.data.slug));
  for (const name of imagesBySlug.keys()) {
    if (!slugs.has(name)) {
      problems.push(`src/assets/images/cartoons/${name}.*: no matching src/content/cartoons/${name}.json.`);
    }
  }

  if (problems.length > 0) {
    throw new Error(`Cartoon content is inconsistent:\n - ${problems.join("\n - ")}`);
  }

  return cartoons.sort(
    (a, b) => a.date.getTime() - b.date.getTime() || a.slug.localeCompare(b.slug),
  );
}
