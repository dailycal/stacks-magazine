/**
 * Prefix a root-absolute site path with the configured `base`
 * (`import.meta.env.BASE_URL`, e.g. "/stacks-magazine/").
 *
 * Astro rewrites bundled asset URLs automatically, but not `<a href>` targets
 * or `public/` references written as absolute paths, so every internal link
 * must go through this helper to keep working under the Pages subpath.
 *
 * A full external URL (e.g. "https://media.dailycal.org/...") is returned
 * unchanged — prefixing it with the base would nest it under the site path
 * instead of leaving it pointing off-site.
 *
 * Page paths (no file extension) get a trailing slash, since pages are built
 * as <path>/index.html and GitHub Pages would otherwise answer every link to
 * them with a redirect to the slashed URL first. File paths (e.g. ".jpg") are
 * left alone.
 */
export function withBase(path = "/") {
	if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
	const base = import.meta.env.BASE_URL.replace(/\/$/, "");
	const suffix = path.startsWith("/") ? path : `/${path}`;
	// Split off any ?query or #hash so the slash goes before it
	const split = suffix.search(/[?#]/);
	let pathname = split === -1 ? suffix : suffix.slice(0, split);
	const rest = split === -1 ? "" : suffix.slice(split);
	const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
	if (lastSegment && !lastSegment.includes(".")) pathname += "/";
	return `${base}${pathname}${rest}`;
}
