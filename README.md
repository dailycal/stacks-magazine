# Stacks Magazine

Source for [Stacks](https://stacksmagazine.org/), The Daily Californian's magazine.

## Install, build, deploy

**Requirements:** Node >=22.12.0.

```bash
npm install     # install dependencies
npm run dev     # start the dev server at http://localhost:4321/stacks-magazine/
npm run build   # build the static site to dist/
npm run preview # serve the built dist/ locally, to check the real production output
```

Always `npm run build` before pushing, because the build will fail on content formatting issues (e.g. a bad issue date).

**Deploying** is automatic: every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages.

Previously, this site was served from `https://dailycal.github.io/stacks-magazine/`. Because of that, `astro.config.mjs`'s `site`/`base` were configured to point to this domain and this subpath. They are changed to the real address/path now that this is in production, but if you need to test in a fork, change it back to deploy it to github pages properly. Every internal link and asset reference should be built from `withBase()`.

## Adding an article

Every article is one `.mdx` file (frontmatter + body) in `src/content/`, in a folder that decides which issue it belongs to:

- **Part of an issue:** `src/content/issue-<month>-<year>/<slug>.mdx`, e.g. `src/content/issue-april-2026/my-article.mdx`. The folder name must be `issue-` followed by a full lowercase month name and a 4-digit year (e.g. `issue-april-2026`). This also has to be a folder that already has an entry in `src/content/issues.json` (see [Adding an issue](#adding-an-issue) below). The article is served at `/issues/<month>-<year>/<slug>`. If the above conditions are not met, the build will fail.
- **Not part of an issue:** `src/content/no-issue/<yyyy-mm-dd>-<slug>.mdx`, e.g. `src/content/no-issue/2026-10-04-catholic.mdx`. The file name must start with the article's `publishDate` in `yyyy-mm-dd` format, or the build will fail. Its images go in `public/assets/images/no-issue/<yyyy-mm-dd>-<slug>/`. Served at `/articles/<yyyy-mm-dd>-<slug>` instead.

The article's `<slug>` becomes its URL segment, so keep it URL-safe (lowercase, hyphens).

### Frontmatter

| Field | Description | Required |
|---|---|---|
| `title` | The headline. | Yes |
| `subheadline` | The dek, shown under the title. | No |
| `excerpt` | Short description used in section/homepage listing cards and as the meta description fallback. | No |
| `authors` | Byline names, e.g. `["Jane Doe", "John Smith"]`. Use `[]` for no byline. | Yes |
| `publishDate` | `YYYY-MM-DD`. Determines sort order everywhere (homepage, section pages, issue tables of contents). | Yes |
| `section` | Must exactly match a `name` in `src/config/sections.ts`. A section with `customPage: true` (currently just Editorial Cartoons) can't be used here, the build throws. | Yes |
| `issue` | The issue slug it belongs to, should match the folder it lives in. | No |
| `staffAttribution` | `true` adds "\| Staff" after the byline. Default `false`. | No |
| `featuredImage` | The header/card image: either a site-root path to a file in `public/` (e.g. `"/assets/images/issue-april-2026/my-article/cover.avif"`) or a full external URL. | No |
| `featuredImageAlt` | Alt text for `featuredImage`. | No |
| `featuredImageCaption` | Caption/credit shown under `featuredImage` on the article page. | No |
| `skipFeaturedImage` | `true` hides `featuredImage` on the article page itself (it still shows on cards and in social previews). Use this when the article body already opens with that same image, so it doesn't show twice. Default `false`. | No |
| `keywords` | `["keyword one", "keyword two"]`. Populates `<meta name="keywords">`. Default empty. | No |

### Example

```mdx
---
title: "My Headline"
subheadline: "A short dek explaining the piece"
excerpt: "One or two sentences for cards and search results."
authors: ["Jane Doe"]
publishDate: 2026-05-01
section: "Essays"
featuredImage: "/assets/images/issue-april-2026/my-article/cover.avif"
featuredImageAlt: "Description of the photo"
featuredImageCaption: "Photo by Jane Doe"
issue: "issue-april-2026" # optional
staffAttribution: false # optional
skipFeaturedImage: false # optional
keywords: [] # optional
---

import ArticleImage from "../../components/ArticleImage.astro";
export const inlinePhoto = "/assets/images/issue-april-2026/my-article/inline.avif";

The body is regular Markdown/MDX. Paragraphs, **bold**, *italics*, [links](https://dailycal.org), and `<ArticleImage>` for a photo inline in the text all work:

<ArticleImage src={inlinePhoto} alt="Description of this photo" caption="Photo by Jane Doe" />

More body text continues here.
```

A few important components:
- **`<ArticleImage>`** (`src/components/ArticleImage.astro`) — a single photo with a caption, or a **group** of photos side by side sharing one caption: `<ArticleImage images={[{ src: a, alt: "..." }, { src: b, alt: "..." }]} columns={2} caption="Photo by Jane Doe" />`.
- **`<ArchiveClip>`** (`src/components/ArchiveClip.astro`) — for "From the Stacks" pieces: a dated archival clipping with a lightbox. See any existing `from-the-stacks-*.mdx` for the pattern.

### Adding images

Put an article's images in `public/assets/images/<same folder as the article>/<article-slug>/`, e.g. `public/assets/images/issue-april-2026/my-article/`, and reference them by their site-root path (without `public`):
- `featuredImage` as a plain string in frontmatter: `featuredImage: "/assets/images/issue-april-2026/my-article/cover.avif"`, and
- inline images as a constant at the top of the `.mdx` file (`export const inlinePhoto = "/assets/images/issue-april-2026/my-article/inline.avif";`), passed to `<ArticleImage src={inlinePhoto} ... />`.

An external URL works too, as a plain string.

Run these through the [image optimization pipeline](#optimizing-images) before committing them. Source photos straight off a camera or phone are typically 10-25MB, which is a lot to ship over the wire for something that renders at a few hundred pixels wide.

## Optimizing images

`npm run optimize` converts an image to a web-optimized AVIF, in place: it replaces `<image>` with `<image-without-its-old-extension>.avif` in the same folder, deleting the original (unless `--keep-original` is given), and prints how much smaller it got.

```bash
npm run optimize -- public/assets/images/issue-april-2026/my-article/cover.jpg
npm run optimize -- path/to/one.jpg path/to/two.png --keep-original   # multiple files, keep originals
```

**The `--` is required.** Without it, flags and arguments get ingested by npm and not passed on to the script.

Almost all image formats are supported, except for raw camera photo formats (export these to JPEG or PNG first). Do not optimize svg images, they are already optimized.

## Adding an issue

1. Add the issue's cover image to `public/assets/covers/` (and [optimize](#optimizing-images) it).
2. Add an entry to `src/content/issues.json` (it's validated at build time, so a typo or missing field fails the build):
   ```json
   {
     "issue": "Issue III",
     "date": "may-2026",
     "cover": "/assets/covers/issue-may-2026.avif",
     "pdf": "https://media.dailycal.org/.../Issue_3.pdf",
     "coverAuthor": "Cover Artist Name"
   }
   ```
   - `issue`: display label, e.g. "Issue III"
   - `date`: must match a `src/content/issue-may-2026` folder
   - `cover`: site-root path to a file in `public/`
   - `pdf`: print PDF URL, or `""` if digital issue
   - `coverAuthor`: or `""` if unknown
3. Add the `src/content/issue-may-2026/` folder and its articles (see [Adding an article](#adding-an-article)).

For the `media.dailycal.org/...` hosting for PDFs, access the R2 bucket from the Cloudflare dashboard.

The **newest** entry in `issues.json` (by `date`) must correspond to the newest `issue-*` folder that actually has articles in it, the homepage build throws a clear error if they don't match, so a new issue can't accidentally ship without its `issues.json` entry (or vice versa).

## Adding a cartoon

Editorial cartoons aren't articles — they're their own content type, one JSON file plus one image per cartoon:

1. Add the image to `public/assets/images/cartoons/<slug>.<avif|png|jpg|jpeg|webp>` (and [optimize](#optimizing-images) it).
2. Add `src/content/cartoons/<slug>.json`:
   ```json
   {
     "slug": "my-cartoon-slug",
     "title": "The Cartoon's Title",
     "author": "Cartoonist Name",
     "date": "2026-05-01"
   }
   ```

`<slug>` must match exactly across the JSON file's name, the `"slug"` field inside it, and the image's file name (extension aside), and must be lowercase words joined by hyphens. The build fails with a full list of every mismatch if any of that's off, so it's hard to get wrong silently.

Cartoons are ordered by `date`; the newest one is what `/sections/editorial-cartoons` redirects to, and what shows on the homepage/section listings.

## Site configuration (`src/config/`)

- **`sections.ts`** — the magazine's sections (Headlines, Essays, etc.). Each has a `name` (must match article frontmatter exactly), `slug` (its URL, `/sections/<slug>`), `description`, and `homepageOrder` (position in the homepage's "Latest" list; `-1` leaves it off the homepage entirely). Add `customPage: true` for a section that isn't a plain article listing (like Editorial Cartoons) — this excludes it from the generic section-listing page and from being usable as an article's `section`.
- **`issues.json`** — see [Adding an issue](#adding-an-issue) above.
- **`about.ts`** — the About page's masthead (Staff / Editors / Creative / Credits). Each section is a list of `{ role, people: [{ name, url? }] }` entries; `url` is optional and links the person's name.

## Other configurations

- **Top nav links** are hardcoded as `navLinksLeft`/`navLinksRight` arrays directly in `src/layouts/PageLayout.astro`, along with the Visuals and About dropdowns just below them in the same file. Change them there.
- **Site-wide SEO defaults** (site name, default description/social image, JSON-LD) live in `src/components/SEO.astro`. Per-page overrides are passed as props from `PageLayout.astro`.
- **`robots.txt`** (`src/pages/robots.txt.ts`) and the sitemap (via the `@astrojs/sitemap` integration in `astro.config.mjs`) are generated at build time from `site`/`base`, not static files — don't add a `public/robots.txt`.
- **Fonts and favicon** are static files in `public/fonts/` and `public/favicon.{ico,png}`.
- **How many articles per section show on the homepage** (currently 3) is `HOMEPAGE_ARTICLES_PER_SECTION` in `src/lib/issues.ts`.
