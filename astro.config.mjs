// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Deployed to GitHub Pages at https://dailycal.github.io/stacks-magazine/
  site: 'https://dailycal.github.io',
  base: '/stacks-magazine',
  integrations: [mdx(), sitemap()]
});
