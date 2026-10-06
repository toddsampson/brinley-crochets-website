import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://brinleycrochets.com',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  vite: {
    plugins: [
      {
        // In `astro dev`, serve public/admin/index.html at /admin/ (GitHub Pages does this itself).
        // A src/pages/admin route would overwrite the CMS page in the build, so rewrite instead.
        name: 'admin-index',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url === '/admin' || req.url === '/admin/') req.url = '/admin/index.html';
            next();
          });
        },
      },
    ],
  },
});
