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
 */
export function withBase(path = "/") {
	if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
	const base = import.meta.env.BASE_URL.replace(/\/$/, "");
	const suffix = path.startsWith("/") ? path : `/${path}`;
	return `${base}${suffix}`;
}
