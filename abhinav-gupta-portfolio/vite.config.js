import { defineConfig } from 'vite';

export default defineConfig({
  // Keep the project as a static site; Vite handles asset URLs and production bundling.
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});
