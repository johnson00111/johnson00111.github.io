import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://johnson00111.github.io',
  // If using a repo name other than username.github.io, uncomment:
  // base: '/repo-name',
});