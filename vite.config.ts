import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { siteConfig } from './src/site.config';
import { renderBody, renderHead, renderRootBody, renderRootHead } from './src/render';
import type { Locale } from './src/content';

/** Hangi şablonun hangi dile ait olduğunu dosya yolundan çıkarır. */
export function pageLocale(path: string): Locale | 'root' {
  const p = path.replace(/\\/g, '/');
  if (/\/tr\/index\.html$/.test(p)) return 'tr';
  if (/\/en\/index\.html$/.test(p)) return 'en';
  return 'root';
}

/** HTML şablonlarındaki yer tutucuları yapılandırmadan üretilen HTML ile doldurur. */
function staticPages(): Plugin {
  return {
    name: 'proofvane-static-pages',
    transformIndexHtml(html, ctx) {
      const page = pageLocale(ctx.filename ?? ctx.path);
      const head = page === 'root' ? renderRootHead(siteConfig) : renderHead(siteConfig, page);
      const body = page === 'root' ? renderRootBody(siteConfig) : renderBody(siteConfig, page);
      return html.replace('<!--app-head-->', head).replace('<!--app-body-->', body);
    },
  };
}

export default defineConfig({
  // Göreli varlık yolları: dist/ hangi kök altında sunulursa sunulsun çalışır.
  base: './',
  plugins: [staticPages()],
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        root: resolve(__dirname, 'index.html'),
        tr: resolve(__dirname, 'tr/index.html'),
        en: resolve(__dirname, 'en/index.html'),
      },
    },
  },
});
