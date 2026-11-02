import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { homeMetadata, graphMetadata, mapMetadata, easterEggMetadata } from './src/data/siteMetadata.js';

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-pages',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const index = bundle['index.html'];
        if (index?.type === 'asset') {
          for (const [page, metadata] of [['graph', graphMetadata], ['map', mapMetadata], ['easter-egg', easterEggMetadata]]) {
            const source = String(index.source)
              .replaceAll(`<title>${homeMetadata.title}</title>`, `<title>${metadata.title}</title>`)
              .replaceAll(`property="og:title" content="${homeMetadata.title}"`, `property="og:title" content="${metadata.title}"`)
              .replaceAll(`name="twitter:title" content="${homeMetadata.title}"`, `name="twitter:title" content="${metadata.title}"`)
              .replaceAll(homeMetadata.description, metadata.description)
              .replaceAll(`content="${homeMetadata.url}"`, `content="${metadata.url}"`)
              .replaceAll(`href="${homeMetadata.url}"`, `href="${metadata.url}"`);
            this.emitFile({ type: 'asset', fileName: `${page}/index.html`, source });
          }
        }
      },
    },
  }],
  base: '/',
});
