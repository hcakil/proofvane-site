import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { siteConfig } from './src/site.config';
import {
  renderBody,
  renderHead,
  renderNotFoundBody,
  renderNotFoundHead,
  renderRootBody,
  renderRootHead,
  renderSolutionBody,
  renderSolutionHead,
  renderWalkthroughBody,
  renderWalkthroughHead,
  SOLUTION_KEYS,
  solutionPath,
  walkthroughPath,
  type SolutionKey,
} from './src/render';
import { LOCALES, type Locale } from './src/content';

export type PageId =
  | { kind: 'root' }
  | { kind: 'notFound' }
  | { kind: 'home'; locale: Locale }
  | { kind: 'solution'; locale: Locale; key: SolutionKey }
  | { kind: 'walkthrough'; locale: Locale };

/** "Nasıl çalışır" alt sayfalarının şablon yolları. */
export const WALKTHROUGH_TEMPLATES: { path: string; locale: Locale }[] = LOCALES.map((locale) => ({
  path: `${locale}/${solutionPath(locale, 'precheck')}${walkthroughPath(locale)}index.html`,
  locale,
}));

/** Çözüm sayfalarının şablon yolları (kökten), ör. "tr/cozumler/tercih-on-kontrol/index.html". */
export const SOLUTION_TEMPLATES: { path: string; locale: Locale; key: SolutionKey }[] =
  LOCALES.flatMap((locale) =>
    SOLUTION_KEYS.map((key) => ({
      path: `${locale}/${solutionPath(locale, key)}index.html`,
      locale,
      key,
    })),
  );

/** Hangi şablonun hangi sayfaya ait olduğunu dosya yolundan çıkarır. */
export function pageOf(path: string): PageId {
  const p = path.replace(/\\/g, '/');
  if (/\/404\.html$/.test(p)) return { kind: 'notFound' };
  for (const w of WALKTHROUGH_TEMPLATES) {
    if (p.endsWith(`/${w.path}`)) return { kind: 'walkthrough', locale: w.locale };
  }
  for (const s of SOLUTION_TEMPLATES) {
    if (p.endsWith(`/${s.path}`)) return { kind: 'solution', locale: s.locale, key: s.key };
  }
  if (/\/tr\/index\.html$/.test(p)) return { kind: 'home', locale: 'tr' };
  if (/\/en\/index\.html$/.test(p)) return { kind: 'home', locale: 'en' };
  return { kind: 'root' };
}

function render(page: PageId): { head: string; body: string } {
  switch (page.kind) {
    case 'root':
      return { head: renderRootHead(siteConfig), body: renderRootBody(siteConfig) };
    case 'notFound':
      return { head: renderNotFoundHead(siteConfig), body: renderNotFoundBody(siteConfig) };
    case 'home':
      return {
        head: renderHead(siteConfig, page.locale),
        body: renderBody(siteConfig, page.locale),
      };
    case 'walkthrough':
      return {
        head: renderWalkthroughHead(siteConfig, page.locale),
        body: renderWalkthroughBody(siteConfig, page.locale),
      };
    case 'solution':
      return {
        head: renderSolutionHead(siteConfig, page.locale, page.key),
        body: renderSolutionBody(siteConfig, page.locale, page.key),
      };
  }
}

/** HTML şablonlarındaki yer tutucuları yapılandırmadan üretilen HTML ile doldurur. */
function staticPages(): Plugin {
  return {
    name: 'proofvane-static-pages',
    transformIndexHtml(html, ctx) {
      const { head, body } = render(pageOf(ctx.filename ?? ctx.path));
      return html.replace('<!--app-head-->', head).replace('<!--app-body-->', body);
    },
  };
}

/**
 * 404 sayfası her derinlikteki adreste sunulur; varlık yolları göreli kalırsa
 * kırılır. Derlemenin sonunda bu sayfadaki "./" önekleri köke ("/") çevrilir.
 */
function absoluteNotFound(): Plugin {
  return {
    name: 'proofvane-404-absolute',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (pageOf(ctx.filename ?? ctx.path).kind !== 'notFound') return html;
        return html.replace(/(href|src)="\.\/(?!\/)/g, '$1="/');
      },
    },
  };
}

export default defineConfig({
  // Göreli varlık yolları: dist/ hangi kök altında sunulursa sunulsun çalışır.
  base: './',
  plugins: [staticPages(), absoluteNotFound()],
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        root: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
        tr: resolve(__dirname, 'tr/index.html'),
        en: resolve(__dirname, 'en/index.html'),
        ...Object.fromEntries(
          SOLUTION_TEMPLATES.map((s) => [`${s.locale}-${s.key}`, resolve(__dirname, s.path)]),
        ),
        ...Object.fromEntries(
          WALKTHROUGH_TEMPLATES.map((w) => [`${w.locale}-walkthrough`, resolve(__dirname, w.path)]),
        ),
      },
    },
  },
});
