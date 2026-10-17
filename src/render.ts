/**
 * Sayfaları yapılandırma ve dil metinlerinden statik HTML olarak üretir.
 * Derleme sırasında (vite.config.ts) çalışır; içerik JavaScript olmadan görünür.
 *
 * Sayfalar:
 *   /                          dil yönlendirme sayfası
 *   /tr/, /en/                 ana sayfa
 *   /tr/cozumler/<slug>/       çözüm sayfaları (en: /en/solutions/<slug>/)
 *   /404.html                  bulunamadı sayfası (iki dilli, mutlak yollar)
 * İç bağlantılar göreli üretilir; böylece dist/ klasörü hangi kök altında
 * sunulursa sunulsun çalışır (404 hariç). canonical, hreflang ve og:url
 * mutlak adrestir.
 */
import type { SiteConfig } from './site.config';
import { LOCALES, TEXT, type Locale } from './content';
import type { Demo, Segment, Service, SiteText, SolutionPage } from './content/types';
import { WALKTHROUGH } from './content/walkthrough';

export type SolutionKey = SolutionPage['key'];
export const SOLUTION_KEYS: readonly SolutionKey[] = ['precheck', 'listing'];

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ESCAPES[ch] ?? ch);
}

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

export function isValidEmail(value: string | null): value is string {
  return value !== null && EMAIL_RE.test(value);
}

function base(config: SiteConfig): string | null {
  return config.siteUrl ? config.siteUrl.replace(/\/$/, '') : null;
}

/** Bir çözüm sayfasının dil köküne göre yolu, ör. "cozumler/tercih-on-kontrol/". */
export function solutionPath(locale: Locale, key: SolutionKey): string {
  const t = TEXT[locale];
  return `${t.solutionsPath}/${t.pages[key].slug}/`;
}

/** Bir dil sayfasının mutlak adresi (canonical/hreflang için). */
export function pageUrl(
  config: SiteConfig,
  locale: Locale | 'root',
  key?: SolutionKey,
  sub?: boolean,
): string | null {
  const b = base(config);
  if (!b) return null;
  if (locale === 'root') return `${b}/`;
  if (!key) return `${b}/${locale}/`;
  return `${b}/${locale}/${solutionPath(locale, key)}${sub ? walkthroughPath(locale) : ''}`;
}

/** Tercih ön kontrolü "nasıl çalışır" alt sayfasının çözüm sayfasına göre yolu. */
export function walkthroughPath(locale: Locale): string {
  return `${WALKTHROUGH[locale].slug}/`;
}

const MARK = `<svg class="mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="7" class="mark-bg"/><path d="M11.5 24.5V8h6.2a5.4 5.4 0 0 1 0 10.8h-6.2" class="mark-p"/><circle cx="23.6" cy="23.2" r="2.6" class="mark-dot"/></svg>`;

/* ------------------------------------------------------------------ head */

function alternates(config: SiteConfig, key?: SolutionKey, sub?: boolean): string[] {
  const out: string[] = [];
  for (const l of LOCALES) {
    const u = pageUrl(config, l, key, sub);
    if (u) out.push(`<link rel="alternate" hreflang="${l}" href="${escapeHtml(u)}" />`);
  }
  const root = key ? pageUrl(config, 'en', key, sub) : pageUrl(config, 'root');
  if (root) out.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(root)}" />`);
  return out;
}

const THEME_COLORS = [
  `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f2f0eb" />`,
  `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111214" />`,
];

function headParts(
  config: SiteConfig,
  locale: Locale,
  title: string,
  description: string,
  key?: SolutionKey,
  sub?: boolean,
): string[] {
  const t = TEXT[locale];
  const other = LOCALES.filter((l) => l !== locale).map((l) => TEXT[l].ogLocale);
  const parts = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    ...THEME_COLORS,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(config.brandName)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:locale" content="${t.ogLocale}" />`,
    ...other.map((o) => `<meta property="og:locale:alternate" content="${o}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (!config.indexable) parts.push('<meta name="robots" content="noindex, nofollow" />');
  const self = pageUrl(config, locale, key, sub);
  const b = base(config);
  if (self && b) {
    parts.push(`<link rel="canonical" href="${escapeHtml(self)}" />`);
    parts.push(...alternates(config, key, sub));
    parts.push(`<meta property="og:url" content="${escapeHtml(self)}" />`);
    parts.push(`<meta property="og:image" content="${escapeHtml(`${b}/og-image.png`)}" />`);
    parts.push(`<meta property="og:image:width" content="1200" />`);
    parts.push(`<meta property="og:image:height" content="630" />`);
    parts.push(`<meta property="og:image:alt" content="${escapeHtml(t.meta.ogImageAlt)}" />`);
  }
  return parts;
}

export function renderHead(config: SiteConfig, locale: Locale): string {
  const t = TEXT[locale];
  const parts = headParts(
    config,
    locale,
    `${config.brandName} | ${t.meta.titleSuffix}`,
    t.meta.description,
  );
  const b = base(config);
  if (b) {
    const org: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.brandName,
      legalName: config.legalName,
      url: `${b}/`,
      logo: `${b}/apple-touch-icon.png`,
      description: t.meta.description,
      address: { '@type': 'PostalAddress', addressLocality: config.city, addressCountry: 'TR' },
    };
    if (isValidEmail(config.contactEmail)) org.email = config.contactEmail;
    // JSON-LD bir veri bloğudur (çalıştırılmaz); "<" kaçırılarak </script> kırılması önlenir.
    parts.push(
      `<script type="application/ld+json">${JSON.stringify(org).replace(/</g, '\\u003c')}</script>`,
    );
  }
  return parts.join('\n    ');
}

export function renderSolutionHead(config: SiteConfig, locale: Locale, key: SolutionKey): string {
  const page = TEXT[locale].pages[key];
  return headParts(
    config,
    locale,
    `${page.meta.title} | ${config.brandName}`,
    page.meta.description,
    key,
  ).join('\n    ');
}

export function renderRootHead(config: SiteConfig): string {
  const t = TEXT.en;
  const parts = [
    `<title>${escapeHtml(config.brandName)}</title>`,
    `<meta name="description" content="${escapeHtml(t.meta.description)}" />`,
    ...THEME_COLORS,
  ];
  if (!config.indexable) parts.push('<meta name="robots" content="noindex, nofollow" />');
  parts.push(...alternates(config));
  return parts.join('\n    ');
}

export function renderNotFoundHead(config: SiteConfig): string {
  return [
    `<title>404 | ${escapeHtml(config.brandName)}</title>`,
    '<meta name="robots" content="noindex" />',
    ...THEME_COLORS,
  ].join('\n    ');
}

/* ------------------------------------------------------------- pieces */

function langSwitch(t: SiteText, hrefs: Record<Locale, string>, extraClass = ''): string {
  const items = LOCALES.map((l) => {
    const current = l === t.locale ? ' aria-current="page"' : '';
    return `<li><a href="${hrefs[l]}" hreflang="${l}" lang="${l}" data-locale="${l}"${current}><span aria-hidden="true">${l.toUpperCase()}</span><span class="visually-hidden">${escapeHtml(t.a11y.langNames[l])}</span></a></li>`;
  }).join('');
  return `<nav class="lang${extraClass ? ` ${extraClass}` : ''}" aria-label="${escapeHtml(t.a11y.langNav)}"><ul>${items}</ul></nav>`;
}

const THEME_ICONS = {
  system: `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false"><rect x="2.5" y="3.5" width="15" height="10" rx="1.5"/><path d="M7 16.5h6M10 13.5v3"/></svg>`,
  light: `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="3.5"/><path d="M10 1.8v2.4M10 15.8v2.4M1.8 10h2.4M15.8 10h2.4M4.2 4.2l1.7 1.7M14.1 14.1l1.7 1.7M4.2 15.8l1.7-1.7M14.1 5.9l1.7-1.7"/></svg>`,
  dark: `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false"><path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z"/></svg>`,
} as const;

/** Sistem / Açık / Koyu. Betik yoksa gizli; seçim src/theme.ts ile saklanır. */
function themeSwitch(t: SiteText): string {
  const items = (['system', 'light', 'dark'] as const)
    .map(
      (k) =>
        `<button type="button" class="theme-btn" data-theme-choice="${k}" aria-pressed="${k === 'system'}" title="${escapeHtml(t.a11y.theme[k])}">${THEME_ICONS[k]}<span class="visually-hidden">${escapeHtml(t.a11y.theme[k])}</span></button>`,
    )
    .join('');
  return `<div class="theme" role="group" aria-label="${escapeHtml(t.a11y.theme.label)}">${items}</div>`;
}

function mailto(email: string, subject?: string): string {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${escapeHtml(email)}${escapeHtml(q)}`;
}

function kicker(index: string, label: string): string {
  return `<p class="kicker"><span class="kicker-n">${escapeHtml(index)}</span>${escapeHtml(label)}</p>`;
}

interface Chrome {
  /** Dil köküne göre göreli önek: ana sayfada "../", çözüm sayfasında "../../../". */
  prefix: string;
  /** Menü bağlantılarının öneki: ana sayfada "", diğer sayfalarda ana sayfa yolu. */
  navBase: string;
  langHrefs: Record<Locale, string>;
}

function renderChrome(
  config: SiteConfig,
  t: SiteText,
  c: Chrome,
  main: string,
  year: number,
): string {
  const brand = escapeHtml(config.brandName);
  const navLinks = t.nav
    .map((n) => `<li><a href="${c.navBase}${n.href}">${escapeHtml(n.label)}</a></li>`)
    .join('');
  const contactBits: string[] = [];
  if (isValidEmail(config.contactEmail))
    contactBits.push(
      `<a href="${mailto(config.contactEmail)}">${escapeHtml(config.contactEmail)}</a>`,
    );
  if (config.phone)
    contactBits.push(
      `<a href="tel:${escapeHtml(config.phone.e164)}">${escapeHtml(config.phone.display)}</a>`,
    );
  const home = c.navBase || '#content';
  return `<a class="skip-link" href="#content">${escapeHtml(t.a11y.skip)}</a>
  <header class="masthead">
    <div class="wrap masthead-inner">
      <a class="brand" href="${home}">${MARK}<span>${brand}</span></a>
      <div class="site-menu" id="site-menu" data-menu>
        <nav class="primary-nav" aria-label="${escapeHtml(t.a11y.mainNav)}"><ul>${navLinks}</ul></nav>
        ${themeSwitch(t)}
      </div>
      ${langSwitch(t, c.langHrefs)}
      <button type="button" class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="site-menu"><span class="menu-icon" aria-hidden="true"></span><span>${escapeHtml(t.a11y.menu)}</span></button>
    </div>
  </header>
  <main id="content" tabindex="-1">
    ${main}
  </main>
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <p class="footer-name">${MARK}<span>${brand}</span></p>
        <p>${escapeHtml(t.footer.legal(config.brandName, config.legalName))} ${escapeHtml(t.footer.place)}.</p>
        ${contactBits.length ? `<p class="footer-contact">${contactBits.join(' · ')}</p>` : ''}
      </div>
      <div class="footer-links">
        <nav class="footer-nav" aria-label="${escapeHtml(t.a11y.footerNav)}"><ul>${navLinks}</ul></nav>
        ${langSwitch(t, c.langHrefs, 'lang-footer')}
      </div>
      <p class="footer-copy">© ${year} ${brand}</p>
    </div>
  </footer>`;
}

/* -------------------------------------------------------------------- hero */

/** Otomatik süreç görseli: tasarla, geliştir, test et, yayınla. Betik gerekmez. */
function renderProcess(t: SiteText): string {
  const p = t.hero.process;
  const steps = p.steps
    .map(
      (s, i) =>
        `<li class="pstep pstep-${s.id}"><span class="pstep-n">${String(i + 1).padStart(2, '0')}</span><span class="pstep-label">${escapeHtml(s.label)}</span><span class="pstep-detail">${escapeHtml(s.detail)}</span><span class="pstep-bar" aria-hidden="true"></span></li>`,
    )
    .join('');
  const checks = p.scene.checks.map((c) => `<span class="chk">${escapeHtml(c)}</span>`).join('');
  const rows = (n: number, cls: string) =>
    Array.from({ length: n }, () => `<span class="${cls}"></span>`).join('');
  return `<figure class="process" aria-labelledby="process-caption">
        <p class="visually-hidden">${escapeHtml(p.label)}</p>
        <ol class="psteps">${steps}</ol>
        <div class="scene" aria-hidden="true">
          <svg class="scene-wires" viewBox="0 0 600 400" preserveAspectRatio="none" focusable="false"><path class="sw sw-a" d="M330 268 C 330 320, 420 330, 505 318"/><path class="sw sw-b" d="M458 210 C 500 210, 530 228, 540 256"/></svg>
          <div class="browser">
            <div class="browser-bar"><span></span><span></span><span></span><em>${escapeHtml(p.scene.web)}</em></div>
            <div class="browser-body">
              <div class="b-side">${rows(5, 'b-nav')}</div>
              <div class="b-main">
                <div class="b-chart">${rows(7, 'b-col')}</div>
                <div class="b-table">${rows(4, 'b-row')}</div>
              </div>
            </div>
            <span class="chk-pin chk-pin-web">✓</span>
          </div>
          <div class="handset">
            <div class="handset-screen">
              <div class="h-top"></div>
              <div class="h-card"><span></span><span></span></div>
              ${rows(3, 'h-row')}
              <div class="h-btn"></div>
            </div>
            <span class="scene-label">${escapeHtml(p.scene.mobile)}</span>
            <span class="chk-pin chk-pin-mobile">✓</span>
          </div>
          <div class="server">
            ${rows(3, 'rack')}
            <span class="scene-label">${escapeHtml(p.scene.backend)}</span>
          </div>
          <div class="checks">${checks}</div>
          <span class="live"><span class="live-dot"></span>${escapeHtml(p.scene.live)}</span>
          <span class="grid-guide g1"></span><span class="grid-guide g2"></span>
        </div>
        <figcaption id="process-caption" class="process-caption">${escapeHtml(p.caption)}</figcaption>
      </figure>`;
}

function renderHero(config: SiteConfig, t: SiteText): string {
  const primary = isValidEmail(config.contactEmail)
    ? `<a class="button button-primary" href="${mailto(config.contactEmail)}">${escapeHtml(t.hero.primaryCta)}</a>`
    : `<a class="button button-primary" href="#contact">${escapeHtml(t.hero.primaryCta)}</a>`;
  const caps = t.hero.capabilities
    .map(
      (c, i) =>
        `<li class="cap cap-${escapeHtml(c.id)}"><span class="cap-n">${String(i + 1).padStart(2, '0')}</span><span class="cap-label">${escapeHtml(c.label)}</span><span class="cap-detail">${escapeHtml(c.detail)}</span></li>`,
    )
    .join('');
  return `<section class="hero" aria-labelledby="hero-title">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(t.hero.eyebrow)}</p>
          <h1 id="hero-title" class="hero-title">${escapeHtml(t.hero.title)}</h1>
          <p class="lede">${escapeHtml(t.hero.lede(config.brandName, config.city))}</p>
          <p class="actions">${primary}<a class="button button-ghost" href="${t.hero.secondaryCta.href}">${escapeHtml(t.hero.secondaryCta.label)}</a></p>
        </div>
        <ul class="caps">${caps}</ul>
        ${renderProcess(t)}
      </div>
    </section>`;
}

/* -------------------------------------------------------- 01 / 02 vitrin */

/** Tarayıcıdaki demo betiğinin (src/demo.ts) kullandığı dil metinleri; JSON veri bloğu, çalıştırılmaz. */
function demoText(t: SiteText): string {
  const d = t.showcases.mobile.demo;
  const p = t.showcases.mobile.pipeline;
  const data = {
    app: d.app,
    controls: d.controls,
    log: d.log,
    pipeline: { idle: p.idle, running: p.running, passed: p.passed, blocked: p.blocked },
  };
  return `<script type="application/json" id="demo-text">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function renderSyncDemo(t: SiteText): string {
  const d = t.showcases.mobile.demo;
  const tasks = d.app.tasks
    .map(
      (task) =>
        `<li class="task" data-task="${escapeHtml(task.id)}" data-title="${escapeHtml(task.title)}"><span class="task-check" aria-hidden="true"></span><span class="task-text"><span class="task-title">${escapeHtml(task.title)}</span><span class="task-meta">${escapeHtml(task.meta)}</span><span class="task-state" data-state></span></span><button type="button" class="task-btn" data-complete>${escapeHtml(d.app.action)}<span class="visually-hidden">: ${escapeHtml(task.title)}</span></button></li>`,
    )
    .join('');
  const nodes = d.nodes
    .map(
      (n) =>
        `<li class="node node-${n.id}" data-node="${n.id}"><span class="node-label">${escapeHtml(n.label)}</span><code class="node-detail">${escapeHtml(n.detail)}</code></li>`,
    )
    .join('');
  return `<details class="tech" data-tech>
        <summary>${escapeHtml(t.showcases.mobile.demoToggle)}</summary>
        <figure class="sync" data-demo="sync" aria-labelledby="sync-caption">
        <p class="visually-hidden">${escapeHtml(d.label)}</p>
        <div class="sync-panel">
          <p class="sync-hint">${escapeHtml(d.controls.hint)}</p>
          <button type="button" class="chip" data-network aria-pressed="false">${escapeHtml(d.controls.networkOff)}</button>
          <button type="button" class="chip chip-quiet" data-reset>${escapeHtml(d.controls.reset)}</button>
        </div>
        <div class="sync-stage" data-stage>
          <svg class="sync-wires" data-wires aria-hidden="true" focusable="false"></svg>
          <div class="device" data-node="app">
            <div class="device-screen">
              <div class="app-status"><span class="app-time" aria-hidden="true">9:41</span><span class="app-net" data-net>${escapeHtml(d.app.online)}</span></div>
              <div class="app-head">
                <p class="app-title">${escapeHtml(d.app.title)}</p>
                <p class="app-sub">${escapeHtml(d.app.subtitle)}</p>
              </div>
              <ul class="tasks">${tasks}</ul>
              <p class="app-badge" data-badge>${escapeHtml(d.app.synced)}</p>
              <div class="app-tabbar" aria-hidden="true"><span></span><span></span><span></span></div>
            </div>
          </div>
          <div class="sync-side">
            <ol class="nodes">${nodes}</ol>
            <div class="sync-log">
              <p class="sync-log-title">${escapeHtml(d.log.title)}</p>
              <ol class="log" data-log aria-live="polite"><li class="log-idle">${escapeHtml(d.log.idle)}</li></ol>
            </div>
          </div>
        </div>
        <figcaption id="sync-caption" class="sync-caption">${escapeHtml(d.caption)}</figcaption>
      </figure>
      </details>`;
}

function renderMobileShowcase(t: SiteText): string {
  const m = t.showcases.mobile;
  const p = m.pipeline;
  const stages = p.stages
    .map(
      (s) =>
        `<li class="pstage" data-pstage="${escapeHtml(s.id)}"><span class="pstage-dot" aria-hidden="true"></span><span class="pstage-label">${escapeHtml(s.label)}</span><span class="pstage-detail">${escapeHtml(s.detail)}</span></li>`,
    )
    .join('');
  const roll = p.rollout.map((r) => `<li data-roll>${escapeHtml(r)}</li>`).join('');
  const points = m.points.map((x) => `<li>${escapeHtml(x)}</li>`).join('');
  return `<section id="work" class="showcase showcase-mobile" aria-labelledby="sc-mobile-title">
      <div class="wrap showcase-grid">
        <div class="showcase-head">
          ${kicker(m.index, m.kicker)}
          <h2 id="sc-mobile-title">${escapeHtml(m.title)}</h2>
          <p class="showcase-body">${escapeHtml(m.body)}</p>
          <ul class="points">${points}</ul>
          <p class="stack"><span class="meta-label">${escapeHtml(t.services.stackLabel)}</span> ${escapeHtml(m.stack)}</p>
          <p class="status status-concept">${escapeHtml(m.status)}</p>
        </div>
        <figure class="pipe" data-demo="pipeline" data-fail-at="${escapeHtml(p.failAt)}" aria-labelledby="pipe-window">
          <div class="pipe-bar"><span class="pipe-window" id="pipe-window">${escapeHtml(p.window)}</span><span class="pipe-status" data-pipe-status aria-live="polite">${escapeHtml(p.idle)}</span></div>
          <ol class="pstages">${stages}</ol>
          <p class="pipe-failure" data-pipe-failure hidden><code>${escapeHtml(p.failure)}</code></p>
          <div class="rollout">
            <p class="rollout-label">${escapeHtml(p.rolloutLabel)}</p>
            <ol class="rollout-steps">${roll}</ol>
            <p class="rollout-gate" data-gate hidden>${escapeHtml(p.gate)}</p>
          </div>
          <p class="pipe-controls"><button type="button" class="button button-primary" data-run>${escapeHtml(p.run)}</button><button type="button" class="button button-ghost" data-regress>${escapeHtml(p.regress)}</button></p>
        </figure>
      </div>
      <div class="wrap">${renderSyncDemo(t)}</div>
    </section>`;
}

function renderSystemsShowcase(t: SiteText): string {
  const s = t.showcases.systems;
  const flow = s.flow
    .map(
      (f, i) =>
        `<li><span class="flow-n">${String(i + 1).padStart(2, '0')}</span><span class="flow-label">${escapeHtml(f.label)}</span><span class="flow-detail">${escapeHtml(f.detail)}</span></li>`,
    )
    .join('');
  const facts = s.facts
    .map(
      (f) =>
        `<li><span class="fact-value">${escapeHtml(f.value)}</span><span class="fact-label">${escapeHtml(f.label)}</span></li>`,
    )
    .join('');
  return `<section id="systems" class="showcase showcase-systems" aria-labelledby="sc-systems-title">
      <div class="wrap">
        <div class="showcase-head showcase-head-wide">
          ${kicker(s.index, s.kicker)}
          <h2 id="sc-systems-title">${escapeHtml(s.title)}</h2>
          <p class="showcase-body">${escapeHtml(s.body)}</p>
          <p class="status status-real">${escapeHtml(s.status)}</p>
        </div>
        <ol class="flow-rail">${flow}</ol>
        <ul class="facts">${facts}</ul>
        <p class="stack"><span class="meta-label">${escapeHtml(t.services.stackLabel)}</span> ${escapeHtml(s.stack)}</p>
      </div>
    </section>`;
}

/* --------------------------------------------------- veri örnekleri */

function total(segments: Segment[]): number {
  return segments.reduce((n, s) => n + s.value, 0);
}

/** Toplamı küçük olan veri birim kareleriyle, büyük olan oransal çubukla çizilir. */
export function renderChart(demo: Demo): string {
  const sum = total(demo.segments);
  const summary = `${demo.chartTitle}: ${demo.segments.map((s) => `${s.label} ${s.value}`).join(', ')}`;
  const units = sum <= 120;
  let shapes = '';
  let viewBox: string;
  if (units) {
    const cols = 11;
    const size = 18;
    const gap = 4;
    let i = 0;
    for (const s of demo.segments) {
      for (let k = 0; k < s.value; k++, i++) {
        const x = (i % cols) * (size + gap);
        const y = Math.floor(i / cols) * (size + gap);
        shapes += `<rect class="seg seg-${s.key}" x="${x}" y="${y}" width="${size}" height="${size}" rx="3"/>`;
      }
    }
    const rows = Math.ceil(sum / cols);
    viewBox = `0 0 ${cols * (size + gap) - gap} ${rows * (size + gap) - gap}`;
  } else {
    const width = 600;
    const height = 44;
    let x = 0;
    for (const s of demo.segments) {
      const w = (s.value / sum) * width;
      shapes += `<rect class="seg seg-${s.key}" x="${x.toFixed(2)}" y="0" width="${Math.max(w - 3, 1).toFixed(2)}" height="${height}" rx="3"/>`;
      x += w;
    }
    viewBox = `0 0 ${width} ${height}`;
  }
  const legend = demo.segments
    .map(
      (s) =>
        `<li><svg class="swatch" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false"><rect class="seg seg-${s.key}" width="12" height="12" rx="2"/></svg><span class="legend-value">${s.value}</span> <span class="legend-label">${escapeHtml(s.label)}</span></li>`,
    )
    .join('');
  return `<figure class="chart chart-${units ? 'units' : 'bar'}">
          <figcaption>${escapeHtml(demo.chartTitle)}</figcaption>
          <svg class="chart-svg" viewBox="${viewBox}" role="img" aria-label="${escapeHtml(summary)}">${shapes}</svg>
          <ul class="legend">${legend}</ul>
        </figure>`;
}

export function renderDemoActions(
  demo: Demo,
  t: SiteText,
  published: boolean,
  prefix: string,
  label = demo.pdfLabel,
): string {
  if (!published || !demo.pdf)
    return `<p class="demo-pending">${escapeHtml(t.work.pendingNote)}</p>`;
  return `<a class="case-link demo-download" href="${prefix}ornekler/${escapeHtml(demo.pdf)}" type="application/pdf" download data-testid="demo-download">${escapeHtml(label)}<span class="visually-hidden">: ${escapeHtml(demo.title)}</span> <span class="download-note">(${escapeHtml(t.work.downloadNote)})</span></a>`;
}

function renderCaseUi(demo: Demo): string {
  const ui = demo.ui;
  let body: string;
  if (ui.kind === 'sources') {
    const rows = ui.rows
      .map(
        (r) =>
          `<li class="src src-${r.state}"><span class="src-id">${escapeHtml(r.id)}</span><span class="src-label">${escapeHtml(r.label)}</span><span class="src-value">${escapeHtml(r.value)}</span></li>`,
      )
      .join('');
    body = `<ol class="src-list">${rows}</ol>`;
  } else {
    const rows = ui.detail
      .map((d) => `<div><dt>${escapeHtml(d.label)}</dt><dd>${escapeHtml(d.value)}</dd></div>`)
      .join('');
    body = `<dl class="detail">${rows}</dl>`;
  }
  return `<div class="ui">
          <div class="win-bar"><span></span><span></span><span></span><p>${escapeHtml(ui.window)}</p></div>
          <div class="ui-body">
            <p class="ui-heading">${escapeHtml(ui.heading)}</p>
            ${body}
            <p class="ui-verdict ui-verdict-${ui.kind}">${escapeHtml(ui.verdict)}</p>
          </div>
        </div>`;
}

function demoById(t: SiteText, id: string): Demo {
  const d = t.work.items.find((x) => x.id === id);
  if (!d) throw new Error(`Örnek bulunamadı: ${id}`);
  return d;
}

/** Ana sayfa vitrin 3: iki çözüm sayfasına giden kartlar. */
function renderSolutions(config: SiteConfig, t: SiteText, prefix: string): string {
  const cards = SOLUTION_KEYS.map((key) => {
    const page = t.pages[key];
    const demo = demoById(t, page.demoId);
    return `<article class="sol-card" aria-labelledby="sol-${key}">
          <p class="sol-audience">${escapeHtml(page.audience)}</p>
          <h3 id="sol-${key}"><a href="${solutionPath(t.locale, key)}">${escapeHtml(page.title)}</a></h3>
          <p class="sol-body">${escapeHtml(page.problem.body)}</p>
          ${renderChart(demo)}
          <p class="demo-source">${escapeHtml(page.demo.note)}</p>
          <p class="sol-actions"><a class="button button-primary" href="${solutionPath(t.locale, key)}">${escapeHtml(t.solutions.more)}<span class="visually-hidden">: ${escapeHtml(page.meta.title)}</span></a></p>
          ${renderDemoActions(demo, t, config.demosPublished, prefix, page.pdfCta)}
        </article>`;
  }).join('');
  return `<section id="solutions" class="showcase showcase-solutions" aria-labelledby="solutions-title">
      <div class="wrap">
        <div class="showcase-head showcase-head-wide">
          ${kicker(t.solutions.index, t.solutions.kicker)}
          <h2 id="solutions-title">${escapeHtml(t.solutions.title)}</h2>
          <p class="showcase-body">${escapeHtml(t.solutions.intro)}</p>
        </div>
        <div class="sol-cards">${cards}</div>
      </div>
    </section>`;
}

/* ------------------------------------------------- hizmetler, yöntem */

function renderService(s: Service, t: SiteText, featured: boolean): string {
  return `<article class="service${featured ? ' service-featured' : ''}" aria-labelledby="svc-${s.id}">
        <h3 id="svc-${s.id}">${escapeHtml(s.title)}</h3>
        <p class="service-body">${escapeHtml(s.body)}</p>
        <div class="service-meta">
          <p class="meta-label">${escapeHtml(t.services.deliverablesLabel)}</p>
          <ul>${s.deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul>
          <p class="meta-label">${escapeHtml(t.services.stackLabel)}</p>
          <p class="stack">${escapeHtml(s.stack)}</p>
        </div>
      </article>`;
}

function renderServices(t: SiteText): string {
  const items = t.services.items.map((s, i) => renderService(s, t, i === 0)).join('');
  return `<section id="services" class="section" aria-labelledby="services-title">
      <div class="section-head">
        <h2 id="services-title">${escapeHtml(t.services.title)}</h2>
        <p>${escapeHtml(t.services.intro)}</p>
      </div>
      <div class="services">${items}</div>
    </section>`;
}

function renderMethod(t: SiteText): string {
  const steps = t.method.steps
    .map((s) => `<li class="step"><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.body)}</p></li>`)
    .join('');
  const principles = t.method.principles
    .map(
      (p) =>
        `<div id="${p.id}"><dt>${escapeHtml(p.title)}</dt><dd>${escapeHtml(p.body)}</dd></div>`,
    )
    .join('');
  return `<section id="method" class="section" aria-labelledby="method-title">
      <div class="section-head">
        <h2 id="method-title">${escapeHtml(t.method.title)}</h2>
        <p>${escapeHtml(t.method.intro)}</p>
      </div>
      <div class="method-body">
        <ol class="steps">${steps}</ol>
        <dl class="principles">${principles}</dl>
      </div>
    </section>`;
}

/* ---------------------------------------------------------------- iletişim */

export function renderContact(
  config: SiteConfig,
  t: SiteText,
  cta: { label: string; subject?: string } = { label: t.contact.cta },
): string {
  if (!isValidEmail(config.contactEmail)) {
    return `<p class="contact-fallback" data-testid="contact-fallback">${escapeHtml(t.contact.fallback)}</p>`;
  }
  const rows = [
    `<div><dt>${escapeHtml(t.contact.emailLabel)}</dt><dd><a href="${mailto(config.contactEmail)}">${escapeHtml(config.contactEmail)}</a></dd></div>`,
  ];
  if (config.phone) {
    rows.push(
      `<div><dt>${escapeHtml(t.contact.phoneLabel)}</dt><dd><a href="tel:${escapeHtml(config.phone.e164)}">${escapeHtml(config.phone.display)}</a></dd></div>`,
    );
  }
  if (isValidEmail(config.partnershipsEmail)) {
    rows.push(
      `<div><dt>${escapeHtml(t.contact.partnershipsLabel)}</dt><dd><a href="${mailto(config.partnershipsEmail)}">${escapeHtml(config.partnershipsEmail)}</a></dd></div>`,
    );
  }
  return `<a class="button button-primary button-large" href="${mailto(config.contactEmail, cta.subject)}">${escapeHtml(cta.label)}</a>
        <dl class="contact-list">${rows.join('')}</dl>`;
}

function renderContactSection(
  config: SiteConfig,
  t: SiteText,
  title = t.contact.title,
  body = t.contact.body,
  cta?: { label: string; subject?: string },
): string {
  return `<section id="contact" class="contact" aria-labelledby="contact-title">
      <div class="wrap contact-inner">
        <h2 id="contact-title">${escapeHtml(title)}</h2>
        <p class="contact-body">${escapeHtml(body)}</p>
        <div class="contact-actions">${renderContact(config, t, cta)}</div>
      </div>
    </section>`;
}

/* ---------------------------------------------------------------- pages */

function homeHrefs(prefix: string): Record<Locale, string> {
  return { tr: `${prefix}tr/`, en: `${prefix}en/` };
}

export function renderBody(
  config: SiteConfig,
  locale: Locale,
  year = new Date().getFullYear(),
): string {
  const t = TEXT[locale];
  const prefix = '../';
  const main = `${renderHero(config, t)}
    ${renderMobileShowcase(t)}
    ${renderSystemsShowcase(t)}
    ${renderSolutions(config, t, prefix)}
    <div class="wrap">
      ${renderServices(t)}
      ${renderMethod(t)}
    </div>
    ${renderContactSection(config, t)}`;
  return `${renderChrome(config, t, { prefix, navBase: '', langHrefs: homeHrefs(prefix) }, main, year)}
  ${demoText(t)}`;
}

/** Çözüm sayfasının ilk ekranındaki sade görsel; değerler doğrulanmış örnekten gelir. */
function renderSolutionVisual(page: SolutionPage, demo: Demo): string {
  if (demo.ui.kind === 'sources') {
    const rows = demo.ui.rows
      .map(
        (r) =>
          `<li class="sv-src sv-${r.state}"><span class="sv-id">${escapeHtml(r.id)}</span><span class="sv-label">${escapeHtml(r.label)}</span><span class="sv-value">${escapeHtml(r.value)}</span></li>`,
      )
      .join('');
    return `<figure class="sv sv-sources">
          <p class="sv-title">${escapeHtml(demo.ui.heading)}</p>
          <ol class="sv-list">${rows}</ol>
          <p class="sv-verdict">${escapeHtml(demo.ui.verdict)}</p>
          <figcaption>${escapeHtml(page.demo.note)}</figcaption>
        </figure>`;
  }
  const sum = total(demo.segments);
  const groups = demo.segments
    .map((s) => {
      const w = Math.max((s.value / sum) * 100, 2).toFixed(2);
      return `<li class="sv-group sv-${s.key}"><span class="sv-gval">${s.value}</span><span class="sv-glabel">${escapeHtml(s.label)}</span><svg class="sv-bar" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true" focusable="false"><rect class="sv-track" width="100" height="8" rx="4"/><rect class="seg seg-${s.key} sv-fill" width="${w}" height="8" rx="4"/></svg></li>`;
    })
    .join('');
  const flow = page.steps.items
    .map((s, i) => `<li><span>${i + 1}</span>${escapeHtml(s.title)}</li>`)
    .join('');
  return `<figure class="sv sv-groups">
        <ol class="sv-flow">${flow}</ol>
        <p class="sv-title">${escapeHtml(demo.chartTitle)}</p>
        <ul class="sv-glist">${groups}</ul>
        <figcaption>${escapeHtml(page.demo.note)}</figcaption>
      </figure>`;
}

export function renderSolutionBody(
  config: SiteConfig,
  locale: Locale,
  key: SolutionKey,
  year = new Date().getFullYear(),
): string {
  const t = TEXT[locale];
  const page = t.pages[key];
  const demo = demoById(t, page.demoId);
  const prefix = '../../../';
  const home = `${prefix}${locale}/`;
  const langHrefs = Object.fromEntries(
    LOCALES.map((l) => [l, `${prefix}${l}/${solutionPath(l, key)}`]),
  ) as Record<Locale, string>;
  const cta = isValidEmail(config.contactEmail)
    ? `<a class="button button-primary" href="${mailto(config.contactEmail, page.cta.subject)}" data-testid="solution-cta">${escapeHtml(page.cta.label)}</a>`
    : '';
  const steps = page.steps.items
    .map(
      (s, i) =>
        `<li class="how-step"><span class="how-n">${i + 1}</span><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.body)}</p></li>`,
    )
    .join('');
  const checks = page.checks.items.map((c) => `<li>${escapeHtml(c)}</li>`).join('');
  const limits = page.limits.items.map((c) => `<li>${escapeHtml(c)}</li>`).join('');
  const facts = demo.facts
    .map(
      (f) =>
        `<li><span class="fact-value">${escapeHtml(f.value)}</span><span class="fact-label">${escapeHtml(f.label)}</span></li>`,
    )
    .join('');
  const main = `<section class="sol-hero" aria-labelledby="sol-title">
      <div class="wrap sol-hero-grid">
        <div class="sol-copy">
          <p class="eyebrow">${escapeHtml(page.audience)}</p>
          <h1 id="sol-title" class="sol-title">${escapeHtml(page.title)}</h1>
          <p class="lede">${escapeHtml(page.lede)}</p>
          <p class="actions">${cta}${renderDemoActions(demo, t, config.demosPublished, prefix, page.pdfCta)}</p>
          ${key === 'precheck' ? `<p class="wt-link"><a href="${walkthroughPath(locale)}" data-testid="walkthrough-link">${escapeHtml(WALKTHROUGH[locale].meta.title)} →</a></p>` : ''}
          <p class="status status-concept">${escapeHtml(page.notice)}</p>
        </div>
        ${renderSolutionVisual(page, demo)}
      </div>
    </section>
    <section class="sol-section" aria-labelledby="sol-problem">
      <div class="wrap sol-split">
        <h2 id="sol-problem">${escapeHtml(page.problem.title)}</h2>
        <p class="sol-text">${escapeHtml(page.problem.body)}</p>
      </div>
    </section>
    <section class="sol-section" aria-labelledby="sol-how">
      <div class="wrap">
        <h2 id="sol-how">${escapeHtml(page.steps.title)}</h2>
        <ol class="how">${steps}</ol>
      </div>
    </section>
    <section class="sol-section sol-demo" aria-labelledby="sol-demo">
      <div class="wrap">
        <div class="sol-split">
          <h2 id="sol-demo">${escapeHtml(page.demo.title)}</h2>
          <p class="sol-text">${escapeHtml(page.demo.body)}</p>
        </div>
        <div class="sol-demo-grid">
          <figure class="case-visual">
            ${renderCaseUi(demo)}
            <figcaption>${escapeHtml(t.work.representative)}</figcaption>
          </figure>
          <div class="sol-demo-side">
            ${renderChart(demo)}
            <ul class="facts facts-compact">${facts}</ul>
            <p class="demo-source">${escapeHtml(demo.source)}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="sol-section" aria-labelledby="sol-checks">
      <div class="wrap sol-lists">
        <div>
          <h2 id="sol-checks">${escapeHtml(page.checks.title)}</h2>
          <p class="sol-text">${escapeHtml(page.checks.intro)}</p>
          <ul class="checklist">${checks}</ul>
        </div>
        <div>
          <h2>${escapeHtml(page.limits.title)}</h2>
          <ul class="limitlist">${limits}</ul>
        </div>
      </div>
    </section>
    ${renderContactSection(config, t, page.closing.title, page.closing.body, page.cta)}`;
  return renderChrome(config, t, { prefix, navBase: home, langHrefs }, main, year);
}

export function renderRootBody(config: SiteConfig): string {
  const brand = escapeHtml(config.brandName);
  const links = LOCALES.map((l) => {
    const t = TEXT[l];
    return `<li><a class="root-choice" href="./${l}/" hreflang="${l}" lang="${l}" data-locale="${l}">${escapeHtml(t.a11y.langNames[l])}</a></li>`;
  }).join('');
  return `<main class="root" id="content">
    <p class="root-brand">${MARK}<span>${brand}</span></p>
    <p class="root-text"><span lang="tr">Dilinizi seçin.</span> <span lang="en">Choose your language.</span></p>
    <ul class="root-list">${links}</ul>
  </main>`;
}

/** İki dilli 404. Herhangi bir derinlikte sunulduğu için bağlantılar köke göredir. */
export function renderNotFoundBody(config: SiteConfig): string {
  const brand = escapeHtml(config.brandName);
  const blocks = LOCALES.map((l) => {
    const n = TEXT[l].notFound;
    return `<div class="nf-block" lang="${l}"><h2>${escapeHtml(n.title)}</h2><p>${escapeHtml(n.body)}</p><p><a class="button button-primary" href="/${l}/">${escapeHtml(n.home)}</a></p></div>`;
  }).join('');
  return `<main class="root nf" id="content">
    <p class="root-brand"><a href="/">${MARK}<span>${brand}</span></a></p>
    <h1 class="nf-code">404</h1>
    <div class="nf-blocks">${blocks}</div>
  </main>`;
}

/* --------------------------------------------- tercih ön kontrolü: nasıl çalışır */

export function renderWalkthroughHead(config: SiteConfig, locale: Locale): string {
  const w = WALKTHROUGH[locale];
  return headParts(
    config,
    locale,
    `${w.meta.title} | ${config.brandName}`,
    w.meta.description,
    'precheck',
    true,
  ).join('\n    ');
}

function wtScene(
  index: number,
  total: number,
  id: string,
  step: string,
  title: string,
  body: string,
  visual: string,
): string {
  return `<article class="wt-scene wt-scene-${id}" data-scene="${index}" id="wt-${id}" aria-labelledby="wt-${id}-title">
          <div class="wt-copy">
            <p class="wt-step"><span>${index + 1}/${total}</span> ${escapeHtml(step)}</p>
            <h2 id="wt-${id}-title">${escapeHtml(title)}</h2>
            <p>${escapeHtml(body)}</p>
          </div>
          <div class="wt-visual">${visual}</div>
        </article>`;
}

export function renderWalkthroughBody(
  config: SiteConfig,
  locale: Locale,
  year = new Date().getFullYear(),
): string {
  const t = TEXT[locale];
  const w = WALKTHROUGH[locale];
  const demo = demoById(t, 'placement');
  const prefix = '../../../../';
  const home = `${prefix}${locale}/`;
  const langHrefs = Object.fromEntries(
    LOCALES.map((l) => [l, `${prefix}${l}/${solutionPath(l, 'precheck')}${walkthroughPath(l)}`]),
  ) as Record<Locale, string>;
  const counts = Object.fromEntries(demo.segments.map((s) => [s.key, s.value]));

  const profile = `<div class="wt-card wt-profile">
            <p class="wt-badge">${escapeHtml(w.profile.badge)}</p>
            <dl>${w.profile.fields.map((f) => `<div><dt>${escapeHtml(f.label)}</dt><dd>${escapeHtml(f.value)}</dd></div>`).join('')}</dl>
          </div>`;
  const codes = escapeHtml(w.guide.row.codes).replace(
    w.guide.def.code,
    `<mark>${w.guide.def.code}</mark>`,
  );
  const guide = `<div class="wt-doc">
            <p class="wt-doc-head"><span class="wt-chip">${escapeHtml(w.guide.row.code)}</span><span class="wt-ref">${escapeHtml(w.guide.row.ref)}</span></p>
            <p class="wt-doc-text">${escapeHtml(w.guide.row.text)}</p>
            <p class="wt-doc-codes">${codes}</p>
          </div>
          <div class="wt-doc wt-doc-def">
            <p class="wt-doc-head"><span class="wt-chip wt-chip-mark">${escapeHtml(w.guide.def.code)}</span><span class="wt-ref">${escapeHtml(w.guide.def.ref)}</span></p>
            <p class="wt-doc-text">${escapeHtml(w.guide.def.text)}</p>
          </div>
          <ul class="wt-rules">${w.guide.rules.map((r) => `<li>${escapeHtml(r.text)} <span class="wt-ref">${escapeHtml(r.ref)}</span></li>`).join('')}</ul>`;
  const groups = (['yes', 'check', 'no'] as const)
    .map((g) => {
      const row = w.sort.rows.find((r) => r.group === g)!;
      return `<li class="wt-group wt-group-${g}">
              <p class="wt-group-head"><span class="wt-count" data-count="${counts[g] ?? 0}">${counts[g] ?? 0}</span><span>${escapeHtml(w.sort.groups[g])}</span></p>
              <div class="wt-row">
                <p class="wt-row-code">ÖSYM ${escapeHtml(row.code)}</p>
                <p class="wt-row-text">${escapeHtml(row.text)}</p>
                <p class="wt-row-reason">${escapeHtml(row.reason)}</p>
                <p class="wt-ref">${escapeHtml(row.ref)}</p>
              </div>
            </li>`;
    })
    .join('');
  const sort = `<p class="wt-total">${escapeHtml(w.sort.totalsLabel)}</p><ol class="wt-groups">${groups}</ol>`;
  const report = `<div class="wt-card wt-page">
            <p class="wt-page-title">${escapeHtml(t.pages.precheck.meta.title)}</p>
            <ul class="wt-page-lines">${w.report.lines.map((l) => `<li>${escapeHtml(l)}</li>`).join('')}</ul>
            <p class="wt-check">✓ ${escapeHtml(w.report.check)}</p>
            <p class="wt-caveat">${escapeHtml(w.report.caveat)}</p>
          </div>`;
  const scenes = [
    wtScene(0, 4, 'profile', w.profile.step, w.profile.title, w.profile.body, profile),
    wtScene(1, 4, 'guide', w.guide.step, w.guide.title, w.guide.body, guide),
    wtScene(2, 4, 'sort', w.sort.step, w.sort.title, w.sort.body, sort),
    wtScene(3, 4, 'report', w.report.step, w.report.title, w.report.body, report),
  ].join('');
  const dots = [w.profile.step, w.guide.step, w.sort.step, w.report.step]
    .map(
      (s, i) =>
        `<li><button type="button" class="wt-dot" data-wt-go="${i}" aria-controls="wt-stage"><span class="wt-dot-n">${i + 1}</span>${escapeHtml(s)}</button></li>`,
    )
    .join('');
  const sources = w.sources.items
    .map(
      (s) => `<li><a href="${escapeHtml(s.href)}" rel="noopener">${escapeHtml(s.label)}</a></li>`,
    )
    .join('');
  const partner = config.partnershipsEmail ?? config.contactEmail ?? '';
  const ctaHref = isValidEmail(partner) ? mailto(partner, w.cta.subject) : '#contact';
  const alt: string[] = [];
  if (isValidEmail(config.contactEmail))
    alt.push(
      `<a href="${mailto(config.contactEmail, w.cta.subject)}">${escapeHtml(config.contactEmail)}</a>`,
    );
  if (config.phone)
    alt.push(
      `<a href="tel:${escapeHtml(config.phone.e164)}">${escapeHtml(config.phone.display)}</a>`,
    );

  const main = `<section class="sol-hero wt-hero" aria-labelledby="wt-title">
      <div class="wrap">
        <p class="eyebrow">${escapeHtml(w.kicker)}</p>
        <h1 id="wt-title" class="sol-title">${escapeHtml(w.title)}</h1>
        <p class="lede">${escapeHtml(w.lede)}</p>
        <p class="status status-concept">${escapeHtml(w.notice)}</p>
      </div>
    </section>
    <section class="wt" data-walkthrough aria-label="${escapeHtml(w.meta.title)}">
      <div class="wrap">
        <div class="wt-controls" role="group" aria-label="${escapeHtml(w.controls.label)}">
          <button type="button" class="chip" data-wt-prev aria-controls="wt-stage">← <span class="visually-hidden">${escapeHtml(w.controls.prev)}</span></button>
          <button type="button" class="chip wt-toggle" data-wt-toggle aria-controls="wt-stage" data-play="${escapeHtml(w.controls.play)}" data-pause="${escapeHtml(w.controls.pause)}">${escapeHtml(w.controls.pause)}</button>
          <button type="button" class="chip" data-wt-next aria-controls="wt-stage"><span class="visually-hidden">${escapeHtml(w.controls.next)}</span> →</button>
          <ol class="wt-dots">${dots}</ol>
        </div>
        <div class="wt-progress" aria-hidden="true"><span data-wt-bar></span></div>
        <div class="wt-stage" id="wt-stage" aria-live="polite">${scenes}</div>
        <div class="wt-foot">
          <div>
            <p class="meta-label">${escapeHtml(w.sources.title)}</p>
            <ul class="wt-sources">${sources}</ul>
          </div>
          ${renderDemoActions(demo, t, config.demosPublished, prefix, w.report.pdf)}
        </div>
      </div>
    </section>
    <section id="contact" class="contact" aria-labelledby="contact-title">
      <div class="wrap contact-inner">
        <h2 id="contact-title">${escapeHtml(w.cta.title)}</h2>
        <p class="contact-body">${escapeHtml(w.cta.body)}</p>
        <div class="contact-actions">
          <a class="button button-primary button-large" href="${ctaHref}" data-testid="walkthrough-cta">${escapeHtml(w.cta.label)}</a>
          ${alt.length ? `<p class="wt-alt">${escapeHtml(w.cta.alt)} ${alt.join(' · ')}</p>` : ''}
        </div>
      </div>
    </section>`;
  return renderChrome(config, t, { prefix, navBase: home, langHrefs }, main, year);
}
