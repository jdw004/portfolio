import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { homeMetadata, graphMetadata } from './src/data/siteMetadata.js';

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'graph-page',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const index = bundle['index.html'];
        if (index?.type === 'asset') {
          const source = String(index.source)
            .replaceAll(homeMetadata.title, graphMetadata.title)
            .replaceAll(homeMetadata.description, graphMetadata.description)
            .replaceAll(`content="${homeMetadata.url}"`, `content="${graphMetadata.url}"`)
            .replaceAll(`href="${homeMetadata.url}"`, `href="${graphMetadata.url}"`);
          this.emitFile({ type: 'asset', fileName: 'graph/index.html', source });
        }
      },
    },
  }],
  base: '/',
});
