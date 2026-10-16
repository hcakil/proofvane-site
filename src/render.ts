/**
 * Sayfaları yapılandırma ve dil metinlerinden statik HTML olarak üretir.
 * Derleme sırasında (vite.config.ts) çalışır; içerik JavaScript olmadan görünür.
 *
 * Sayfalar:
 *   /       dil yönlendirme sayfası (renderRootHead / renderRootBody)
 *   /tr/    Türkçe (renderHead / renderBody, locale "tr")
 *   /en/    İngilizce (locale "en")
 * İç bağlantılar göreli üretilir; böylece dist/ klasörü hangi kök altında
 * sunulursa sunulsun çalışır. canonical, hreflang ve og:url mutlak adrestir.
 */
import type { SiteConfig } from './site.config';
import { LOCALES, TEXT, type Locale } from './content';
import type { Demo, Segment, Service, SiteText } from './content/types';

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

/** Bir dil sayfasının mutlak adresi (canonical/hreflang için). */
export function pageUrl(config: SiteConfig, locale: Locale | 'root'): string | null {
  const b = base(config);
  if (!b) return null;
  return locale === 'root' ? `${b}/` : `${b}/${locale}/`;
}

const MARK = `<svg class="mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="7" class="mark-bg"/><path d="M11.5 24.5V8h6.2a5.4 5.4 0 0 1 0 10.8h-6.2" class="mark-p"/><circle cx="23.6" cy="23.2" r="2.6" class="mark-dot"/></svg>`;

/* ------------------------------------------------------------------ head */

function alternates(config: SiteConfig): string[] {
  const out: string[] = [];
  for (const l of LOCALES) {
    const u = pageUrl(config, l);
    if (u) out.push(`<link rel="alternate" hreflang="${l}" href="${escapeHtml(u)}" />`);
  }
  const root = pageUrl(config, 'root');
  if (root) out.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(root)}" />`);
  return out;
}

export function renderHead(config: SiteConfig, locale: Locale): string {
  const t = TEXT[locale];
  const title = `${config.brandName} | ${t.meta.titleSuffix}`;
  const other = LOCALES.filter((l) => l !== locale).map((l) => TEXT[l].ogLocale);
  const parts = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(t.meta.description)}" />`,
    `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#eef1f1" />`,
    `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f1b24" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(config.brandName)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(t.meta.description)}" />`,
    `<meta property="og:locale" content="${t.ogLocale}" />`,
    ...other.map((o) => `<meta property="og:locale:alternate" content="${o}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (!config.indexable) parts.push('<meta name="robots" content="noindex, nofollow" />');
  const self = pageUrl(config, locale);
  const b = base(config);
  if (self && b) {
    parts.push(`<link rel="canonical" href="${escapeHtml(self)}" />`);
    parts.push(...alternates(config));
    parts.push(`<meta property="og:url" content="${escapeHtml(self)}" />`);
    parts.push(`<meta property="og:image" content="${escapeHtml(`${b}/og-image.png`)}" />`);
    parts.push(`<meta property="og:image:width" content="1200" />`);
    parts.push(`<meta property="og:image:height" content="630" />`);
    parts.push(`<meta property="og:image:alt" content="${escapeHtml(t.meta.ogImageAlt)}" />`);
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

export function renderRootHead(config: SiteConfig): string {
  const t = TEXT.en;
  const parts = [
    `<title>${escapeHtml(config.brandName)}</title>`,
    `<meta name="description" content="${escapeHtml(t.meta.description)}" />`,
    `<meta name="theme-color" content="#eef1f1" />`,
  ];
  if (!config.indexable) parts.push('<meta name="robots" content="noindex, nofollow" />');
  parts.push(...alternates(config));
  return parts.join('\n    ');
}

/* ------------------------------------------------------------- pieces */

function langSwitch(t: SiteText, prefix: string, extraClass = ''): string {
  const items = LOCALES.map((l) => {
    const current = l === t.locale ? ' aria-current="page"' : '';
    return `<li><a href="${prefix}${l}/" hreflang="${l}" lang="${l}" data-locale="${l}"${current}><span aria-hidden="true">${l.toUpperCase()}</span><span class="visually-hidden">${escapeHtml(t.a11y.langNames[l])}</span></a></li>`;
  }).join('');
  return `<nav class="lang${extraClass ? ` ${extraClass}` : ''}" aria-label="${escapeHtml(t.a11y.langNav)}"><ul>${items}</ul></nav>`;
}

function mailto(email: string): string {
  return `mailto:${escapeHtml(email)}`;
}

function renderHeroVisual(t: SiteText): string {
  const v = t.hero.visual;
  const steps = v.pipeline.steps
    .map(
      (s) =>
        `<li class="flow-step flow-${s.state}"><span class="flow-dot"></span><span class="flow-label">${escapeHtml(s.label)}</span><span class="flow-value">${escapeHtml(s.value)}</span></li>`,
    )
    .join('');
  const lines = v.console.lines
    .map(
      (l, i) =>
        `<li class="log-line${l.state ? ` log-${l.state}` : ''}"><span class="log-n">${String(i + 1).padStart(2, '0')}</span><code>${escapeHtml(l.text)}</code></li>`,
    )
    .join('');
  const alertRows = v.app.alertRows
    .map(
      (r) =>
        `<div class="alert-row"><dt>${escapeHtml(r.source)}</dt><dd>${escapeHtml(r.value)}</dd></div>`,
    )
    .join('');
  return `<figure class="stage" aria-labelledby="stage-caption">
        <p class="visually-hidden">${escapeHtml(v.label)}</p>
        <div class="stage-scene" aria-hidden="true">
          <div class="glow glow-a"></div>
          <div class="glow glow-b"></div>
          <div class="win win-flow">
            <div class="win-bar"><span></span><span></span><span></span><p>${escapeHtml(v.pipeline.title)}</p></div>
            <ol class="flow">${steps}</ol>
          </div>
          <div class="win win-log">
            <div class="win-bar"><span></span><span></span><span></span><p>${escapeHtml(v.console.title)}</p></div>
            <ol class="log">${lines}</ol>
          </div>
          <svg class="wire" viewBox="0 0 400 200" preserveAspectRatio="none" focusable="false"><path d="M396 10 C 250 10, 150 190, 4 190"/></svg>
          <div class="phone">
            <div class="phone-screen">
              <div class="app-bar"><span class="app-title">${escapeHtml(v.app.title)}</span><span class="app-avatar"></span></div>
              <div class="app-card app-card-focus">
                <p class="app-card-title">${escapeHtml(v.app.listingTitle)}</p>
                <p class="app-card-meta">${escapeHtml(v.app.listingMeta)}</p>
                <div class="app-alert">
                  <p class="app-alert-title"><span class="pulse"></span>${escapeHtml(v.app.alertTitle)}</p>
                  <dl>${alertRows}</dl>
                  <p class="app-alert-action">${escapeHtml(v.app.action)}</p>
                </div>
              </div>
              <div class="app-card app-card-ghost"><span></span><span></span></div>
              <div class="app-card app-card-ghost"><span></span><span></span></div>
              <div class="app-tabs"><span></span><span></span><span></span><span></span></div>
            </div>
          </div>
        </div>
        <figcaption id="stage-caption" class="stage-caption">${escapeHtml(v.caption)}</figcaption>
      </figure>`;
}

function renderHero(config: SiteConfig, t: SiteText): string {
  const primary = isValidEmail(config.contactEmail)
    ? `<a class="button button-primary" href="${mailto(config.contactEmail)}">${escapeHtml(t.hero.primaryCta)}</a>`
    : `<a class="button button-primary" href="#contact">${escapeHtml(t.hero.primaryCta)}</a>`;
  const caps = t.hero.capabilities.map((c) => `<li>${escapeHtml(c)}</li>`).join('');
  return `<section class="hero" aria-labelledby="hero-title">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <h1 id="hero-title" class="hero-title">${escapeHtml(t.hero.title)}</h1>
          <p class="lede">${escapeHtml(t.hero.lede(config.brandName, config.city))}</p>
          <p class="actions">${primary}<a class="button button-ghost" href="${t.hero.secondaryCta.href}">${escapeHtml(t.hero.secondaryCta.label)}</a></p>
          <ul class="caps">${caps}</ul>
        </div>
        ${renderHeroVisual(t)}
      </div>
    </section>`;
}

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
): string {
  if (!published || !demo.pdf)
    return `<p class="demo-pending">${escapeHtml(t.work.pendingNote)}</p>`;
  return `<a class="case-link demo-download" href="${prefix}ornekler/${escapeHtml(demo.pdf)}" type="application/pdf" download data-testid="demo-download">${escapeHtml(demo.pdfLabel)}<span class="visually-hidden">: ${escapeHtml(demo.title)}</span> <span class="download-note">(${escapeHtml(t.work.downloadNote)})</span></a>`;
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
            ${renderChart(demo)}
          </div>
        </div>`;
}

function renderDemo(demo: Demo, t: SiteText, published: boolean, prefix: string): string {
  const tags = demo.tags.map((x) => `<li>${escapeHtml(x)}</li>`).join('');
  return `<article class="case" aria-labelledby="case-${demo.id}">
        <div class="case-copy">
          <ul class="tags">${tags}</ul>
          <h3 id="case-${demo.id}">${escapeHtml(demo.title)}</h3>
          <dl class="case-story">
            <div><dt>${escapeHtml(t.work.problemLabel)}</dt><dd>${escapeHtml(demo.problem)}</dd></div>
            <div><dt>${escapeHtml(t.work.approachLabel)}</dt><dd>${escapeHtml(demo.approach)}</dd></div>
            <div><dt>${escapeHtml(t.work.outcomeLabel)}</dt><dd>${escapeHtml(demo.outcome)}</dd></div>
          </dl>
          <p class="demo-source">${escapeHtml(demo.source)}</p>
          ${renderDemoActions(demo, t, published, prefix)}
        </div>
        <figure class="case-visual">
          ${renderCaseUi(demo)}
          <figcaption>${escapeHtml(t.work.representative)}</figcaption>
        </figure>
      </article>`;
}

function renderWork(config: SiteConfig, t: SiteText, prefix: string): string {
  return `<section id="work" class="work" aria-labelledby="work-title">
      <div class="wrap">
        <div class="work-head">
          <h2 id="work-title">${escapeHtml(t.work.title)}</h2>
          <p>${escapeHtml(t.work.intro)}</p>
        </div>
        <div class="cases">${t.work.items.map((d) => renderDemo(d, t, config.demosPublished, prefix)).join('')}</div>
      </div>
    </section>`;
}

export function renderContact(config: SiteConfig, t: SiteText): string {
  if (!isValidEmail(config.contactEmail)) {
    return `<p class="contact-fallback" data-testid="contact-fallback">${escapeHtml(t.contact.fallback)}</p>`;
  }
  const rows = [
    `<div><dt>${escapeHtml(t.contact.emailLabel)}</dt><dd><a href="${mailto(config.contactEmail)}">${escapeHtml(config.contactEmail)}</a></dd></div>`,
  ];
  if (isValidEmail(config.partnershipsEmail)) {
    rows.push(
      `<div><dt>${escapeHtml(t.contact.partnershipsLabel)}</dt><dd><a href="${mailto(config.partnershipsEmail)}">${escapeHtml(config.partnershipsEmail)}</a></dd></div>`,
    );
  }
  return `<a class="button button-primary button-large" href="${mailto(config.contactEmail)}">${escapeHtml(t.contact.cta)}</a>
        <dl class="contact-list">${rows.join('')}</dl>`;
}

function renderContactSection(config: SiteConfig, t: SiteText): string {
  return `<section id="contact" class="contact" aria-labelledby="contact-title">
      <div class="wrap contact-inner">
        <h2 id="contact-title">${escapeHtml(t.contact.title)}</h2>
        <p class="contact-body">${escapeHtml(t.contact.body)}</p>
        <div class="contact-actions">${renderContact(config, t)}</div>
      </div>
    </section>`;
}

/* ---------------------------------------------------------------- pages */

export function renderBody(
  config: SiteConfig,
  locale: Locale,
  year = new Date().getFullYear(),
): string {
  const t = TEXT[locale];
  const prefix = '../';
  const brand = escapeHtml(config.brandName);
  const navLinks = t.nav
    .map((n) => `<li><a href="${n.href}">${escapeHtml(n.label)}</a></li>`)
    .join('');
  const email = isValidEmail(config.contactEmail)
    ? `<p><a href="${mailto(config.contactEmail)}">${escapeHtml(config.contactEmail)}</a></p>`
    : '';
  return `<a class="skip-link" href="#content">${escapeHtml(t.a11y.skip)}</a>
  <header class="masthead dark-zone">
    <div class="wrap masthead-inner">
      <a class="brand" href="#hero-title">${MARK}<span>${brand}</span></a>
      <nav class="primary-nav" aria-label="${escapeHtml(t.a11y.mainNav)}"><ul>${navLinks}</ul></nav>
      ${langSwitch(t, prefix)}
    </div>
  </header>
  <main id="content" tabindex="-1">
    <div class="dark-zone">
      ${renderHero(config, t)}
      ${renderWork(config, t, prefix)}
    </div>
    <div class="wrap">
      ${renderServices(t)}
      ${renderMethod(t)}
    </div>
    ${renderContactSection(config, t)}
  </main>
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <p class="footer-name">${MARK}<span>${brand}</span></p>
        <p>${escapeHtml(t.footer.legal(config.brandName, config.legalName))} ${escapeHtml(t.footer.place)}.</p>
        ${email}
      </div>
      <div class="footer-links">
        <nav class="footer-nav" aria-label="${escapeHtml(t.a11y.footerNav)}"><ul>${navLinks}</ul></nav>
        ${langSwitch(t, prefix, 'lang-footer')}
      </div>
      <p class="footer-copy">© ${year} ${brand}</p>
    </div>
  </footer>`;
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
