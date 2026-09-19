import type { APIRoute } from "astro";

// Generates public/robots.txt at build time so the Sitemap line always
// matches the `site`/`base` configured in astro.config.mjs.
export const GET: APIRoute = ({ site }) => {
	const base = import.meta.env.BASE_URL.endsWith("/")
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`;
	const sitemapURL = new URL(`${base}sitemap-index.xml`, site);

	const body = `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain" },
	});
};
