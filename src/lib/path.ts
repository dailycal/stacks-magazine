/**
 * Prefix a root-absolute site path with the configured `base`
 * (`import.meta.env.BASE_URL`, e.g. "/stacks-magazine/").
 *
 * Astro rewrites bundled asset URLs automatically, but not `<a href>` targets
 * or `public/` references written as absolute paths, so every internal link
 * must go through this helper to keep working under the Pages subpath.
 */
export function withBase(path = "/") {
	const base = import.meta.env.BASE_URL.replace(/\/$/, "");
	const suffix = path.startsWith("/") ? path : `/${path}`;
	return `${base}${suffix}`;
}
