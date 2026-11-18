import { defineConfig } from 'astro/config';
import fs from 'node:fs';

const hosting = JSON.parse(fs.readFileSync(new URL('./pages.config.json', import.meta.url), 'utf8'));
export default defineConfig({
  site: hosting.siteUrl || 'https://www.commercialeclimaplus.it',
  output: 'static',
  outDir: './dist-github',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
