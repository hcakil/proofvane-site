import { defineConfig, type Plugin } from 'vite';
import { siteConfig } from './src/site.config';
import { renderBody, renderHead } from './src/render';

/** index.html içindeki yer tutucuları yapılandırmadan üretilen HTML ile doldurur. */
function staticPage(): Plugin {
  return {
    name: 'studio-static-page',
    transformIndexHtml(html) {
      return html
        .replace('<!--app-head-->', renderHead(siteConfig))
        .replace('<!--app-body-->', renderBody(siteConfig));
    },
  };
}

export default defineConfig({
  plugins: [staticPage()],
  build: {
    target: 'es2022',
  },
});
