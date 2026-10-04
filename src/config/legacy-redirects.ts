/**
 * Old stacks.github.io repo article URLs, mapped to their new articles. Passed to
 * Astro's `redirects` config in astro.config.mjs.
 */

export const legacyRedirects: Record<string, string> = {
	// December 2025 issue (served from the site root as a-<slug>.html)
	"/a-agentic-ai-summit.html": "/issues/december-2025/agentic-ai-summit",
	"/a-aipac.html": "/issues/december-2025/aipac",
	"/a-calpirg.html": "/issues/december-2025/calpirg",
	"/a-cults.html": "/issues/december-2025/cults",
	"/a-ditto-ai.html": "/issues/december-2025/ditto-ai",
	"/a-from-the-stacks-09.25.html": "/issues/december-2025/from-the-stacks-0925",
	"/a-from-the-stacks-11.25.html": "/issues/december-2025/from-the-stacks-1125",
	"/a-i-used-chat.html": "/issues/december-2025/i-used-chat",
	"/a-progressive-aesthetics.html": "/issues/december-2025/progressive-aesthetics",
	"/a-sex-huey-newton.html": "/issues/december-2025/sex-huey-newton",
	"/a-stuck-in-stacks.html": "/issues/december-2025/stuck-in-stacks",
	"/a-subhuman.html": "/issues/december-2025/subhuman",
	"/a-the-berkeley-womens.html": "/issues/december-2025/the-berkeley-womens",
	"/a-who-holds-the-cards.html": "/issues/december-2025/who-holds-the-cards",
	"/a-world-of-mouth.html": "/issues/december-2025/world-of-mouth",
	// February 2026 issue
	"/issue-february-2026/dad.html": "/issues/february-2026/dad",
	"/issue-february-2026/dropouts.html": "/issues/february-2026/dropouts",
	"/issue-february-2026/from-the-stacks.html": "/issues/february-2026/from-the-stacks",
	"/issue-february-2026/iran.html": "/issues/february-2026/iran",
	"/issue-february-2026/meryland.html": "/issues/february-2026/meryland",
	"/issue-february-2026/nuclear.html": "/issues/february-2026/nuclear",
	"/issue-february-2026/wiener.html": "/issues/february-2026/wiener",
	// April 2026 issue
	"/issue-april-2026/abundance.html": "/issues/april-2026/abundance",
	"/issue-april-2026/bookstores.html": "/issues/april-2026/bookstores",
	"/issue-april-2026/churches.html": "/issues/april-2026/churches",
	"/issue-april-2026/fsm.html": "/issues/april-2026/fsm",
	"/issue-april-2026/oakland.html": "/issues/april-2026/oakland",
	"/issue-april-2026/republicans.html": "/issues/april-2026/republicans",
	"/issue-april-2026/sound.html": "/issues/april-2026/sound",
	// No-issue articles from before their slugs had to start with the date
	"/articles/paint": "/articles/2026-09-29-paint",
	"/articles/wynd": "/articles/2026-09-29-wynd",
};
