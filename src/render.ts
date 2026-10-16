/**
 * Sayfayı yapılandırmadan statik HTML olarak üretir. Derleme sırasında
 * (vite.config.ts içindeki eklenti) çalışır; tarayıcıda JavaScript gerekmez.
 */
import type { DemoItem, SiteConfig } from './site.config';
import * as c from './content';
import type { Service } from './content';

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

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

/** İletişim bölümünün içeriği. Adres yoksa ya da geçersizse mailto üretilmez. */
export function renderContact(email: string | null): string {
  if (email === null || !isValidEmail(email)) {
    return `<p class="contact-fallback" data-testid="contact-fallback"><strong>${escapeHtml(
      c.contact.fallback,
    )}</strong> ${escapeHtml(c.contact.fallbackDetail)}</p>`;
  }
  const safe = escapeHtml(email);
  return `<p class="contact-email">${escapeHtml(c.contact.emailLabel)}: <a href="mailto:${safe}">${safe}</a></p>
      <p class="contact-detail">${escapeHtml(c.contact.detail)}</p>`;
}

/** Örnek kartının alt kısmı: yayında değilse yalnızca bekleme notu. */
export function renderDemoActions(item: DemoItem, published: boolean): string {
  if (!published || !item.pdfUrl) {
    return `<p class="demo-pending">${escapeHtml(c.demos.pendingNote)}</p>`;
  }
  return `<a class="button button-quiet" href="${escapeHtml(item.pdfUrl)}" type="application/pdf" download data-testid="demo-download">${escapeHtml(
    c.demos.downloadLabel,
  )}<span class="visually-hidden">: ${escapeHtml(item.title)}</span></a>`;
}

type Tone = 'ok' | 'no' | 'check';

const PREVIEWS: Record<
  DemoItem['preview'],
  { label: string; head: string[]; rows: [string, string, Tone][] }
> = {
  eligibility: {
    label:
      'Temsilî tablo önizlemesi: kurum, nitelik ve uygunluk sütunları; satırlar yer tutucudur.',
    head: ['Kurum', 'Nitelik', 'Durum'],
    rows: [
      ['Kurum A', 'Kod —', 'ok'],
      ['Kurum B', 'Kod —', 'no'],
      ['Kurum C', '—', 'check'],
      ['Kurum D', 'Kod —', 'ok'],
    ],
  },
  quality: {
    label:
      'Temsilî tablo önizlemesi: pozisyon, alan ve kaynakla karşılaştırma sütunları; satırlar yer tutucudur.',
    head: ['Pozisyon', 'Alan', 'Kaynakla'],
    rows: [
      ['Pozisyon 1', '—', 'ok'],
      ['Pozisyon 2', '—', 'no'],
      ['Pozisyon 3', '—', 'ok'],
      ['Pozisyon 4', '—', 'check'],
    ],
  },
};

const TONE_TEXT: Record<DemoItem['preview'], Record<Tone, string>> = {
  eligibility: { ok: 'Uygun', no: 'Uygun değil', check: 'İncelenecek' },
  quality: { ok: 'Eşleşiyor', no: 'Fark, kanıtlı', check: 'Doğrulanamadı' },
};

export function renderPreview(kind: DemoItem['preview']): string {
  const p = PREVIEWS[kind];
  const head = p.head.map((h) => `<span>${escapeHtml(h)}</span>`).join('');
  const rows = p.rows
    .map(
      ([a, b, tone]) =>
        `<div class="thumb-row"><span>${escapeHtml(a)}</span><span>${escapeHtml(
          b,
        )}</span><span class="tone tone-${tone}">${escapeHtml(TONE_TEXT[kind][tone])}</span></div>`,
    )
    .join('');
  return `<div class="thumb" role="img" aria-label="${escapeHtml(p.label)}">
    <div class="thumb-sheet" aria-hidden="true">
      <div class="thumb-title"></div>
      <div class="thumb-row thumb-head">${head}</div>
      ${rows}
      <div class="thumb-foot"><span></span><span></span></div>
      <span class="thumb-stamp">Örnek</span>
    </div>
  </div>`;
}

function renderDemo(item: DemoItem, published: boolean): string {
  const headingId = `demo-${item.id}`;
  return `<article class="demo" aria-labelledby="${headingId}">
    ${renderPreview(item.preview)}
    <div class="demo-body">
      <p class="badge">${escapeHtml(c.demos.badge)}</p>
      <h3 id="${headingId}">${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      ${renderDemoActions(item, published)}
    </div>
  </article>`;
}

function renderHeroFigure(): string {
  const f = c.hero.figure;
  const items = f.items
    .map((item) => {
      const ref = item.ref
        ? ` <a class="ref" href="${item.ref.href}" aria-label="${escapeHtml(item.ref.label)}">[1]</a>`
        : '';
      return `<div class="ledger-row"><dt>${escapeHtml(item.term)}${ref}</dt><dd>${escapeHtml(item.desc)}</dd></div>`;
    })
    .join('');
  return `<figure class="ledger" aria-labelledby="teslim-baslik">
    <p class="ledger-title" id="teslim-baslik">${escapeHtml(f.title)}</p>
    <dl>${items}</dl>
    <figcaption>${escapeHtml(f.caption)}</figcaption>
  </figure>`;
}

function renderService(s: Service): string {
  return `<article class="service" aria-labelledby="${s.id}">
      <h4 id="${s.id}">${escapeHtml(s.title)}</h4>
      <div class="service-body">
        <p>${escapeHtml(s.body)}</p>
        <p class="service-label">${escapeHtml(c.services.deliverablesLabel)}</p>
        <ul>${s.deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul>
      </div>
    </article>`;
}

function renderServices(): string {
  const groups = c.services.groups
    .map(
      (g) => `<div class="service-group" aria-labelledby="grup-${g.id}" role="group">
      <h3 class="group-title" id="grup-${g.id}">${escapeHtml(g.title)}</h3>
      ${g.items.map(renderService).join('')}
    </div>`,
    )
    .join('');
  return `<section id="hizmetler" class="section" aria-labelledby="hizmetler-baslik">
    <div class="section-head">
      <h2 id="hizmetler-baslik">${escapeHtml(c.services.title)}</h2>
      <p>${escapeHtml(c.services.intro)}</p>
    </div>
    <div class="services">${groups}</div>
  </section>`;
}

function renderMethod(): string {
  const steps = c.method.steps
    .map((s) => `<li class="step"><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.body)}</p></li>`)
    .join('');
  const principles = c.method.principles
    .map(
      (p) =>
        `<div id="${p.id}"><dt>${escapeHtml(p.title)}</dt><dd>${escapeHtml(p.body)}</dd></div>`,
    )
    .join('');
  return `<section id="yontem" class="section" aria-labelledby="yontem-baslik">
    <div class="section-head">
      <h2 id="yontem-baslik">${escapeHtml(c.method.title)}</h2>
      <p>${escapeHtml(c.method.intro)}</p>
    </div>
    <ol class="steps">${steps}</ol>
    <dl class="principles">${principles}</dl>
  </section>`;
}

function renderDemos(config: SiteConfig): string {
  const cards = config.demos.items.map((d) => renderDemo(d, config.demos.published)).join('');
  return `<section id="ornekler" class="section" aria-labelledby="ornekler-baslik">
    <div class="section-head">
      <h2 id="ornekler-baslik">${escapeHtml(c.demos.title)}</h2>
      <p>${escapeHtml(c.demos.intro)}</p>
    </div>
    <div class="demos">${cards}</div>
  </section>`;
}

function renderContactSection(config: SiteConfig): string {
  return `<section id="iletisim" class="section section-contact" aria-labelledby="iletisim-baslik">
    <div class="section-head">
      <h2 id="iletisim-baslik">${escapeHtml(c.contact.title)}</h2>
      <p>${escapeHtml(c.contact.intro)}</p>
    </div>
    <div class="contact">${renderContact(config.contactEmail)}</div>
  </section>`;
}

export function renderHead(config: SiteConfig): string {
  const title = `${config.brandName} | ${c.meta.titleSuffix}`;
  const parts = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(c.meta.description)}" />`,
    `<meta name="theme-color" content="#1D4F7A" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(config.brandName)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(c.meta.description)}" />`,
    `<meta property="og:locale" content="tr_TR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (!config.indexable) {
    parts.push('<meta name="robots" content="noindex, nofollow" />');
  }
  if (config.siteUrl) {
    const base = config.siteUrl.replace(/\/$/, '');
    parts.push(`<link rel="canonical" href="${escapeHtml(base)}/" />`);
    parts.push(`<meta property="og:url" content="${escapeHtml(base)}/" />`);
    parts.push(`<meta property="og:image" content="${escapeHtml(base + c.meta.ogImage)}" />`);
    parts.push(`<meta property="og:image:width" content="1200" />`);
    parts.push(`<meta property="og:image:height" content="630" />`);
    parts.push(`<meta property="og:image:alt" content="${escapeHtml(c.meta.ogImageAlt)}" />`);
    const org: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.brandName,
      legalName: config.legalName,
      url: `${base}/`,
      logo: `${base}/apple-touch-icon.png`,
      address: { '@type': 'PostalAddress', addressLocality: config.city, addressCountry: 'TR' },
    };
    if (config.contactEmail && isValidEmail(config.contactEmail)) org.email = config.contactEmail;
    // JSON-LD bir veri bloğudur (çalıştırılmaz); "<" kaçırılarak </script> kırılması önlenir.
    parts.push(
      `<script type="application/ld+json">${JSON.stringify(org).replace(/</g, '\\u003c')}</script>`,
    );
  }
  return parts.join('\n    ');
}

function footerEmail(email: string | null): string {
  if (email === null || !isValidEmail(email)) return '';
  const safe = escapeHtml(email);
  return `<p><a href="mailto:${safe}">${safe}</a></p>`;
}

export function renderBody(config: SiteConfig, year = new Date().getFullYear()): string {
  const brand = escapeHtml(config.brandName);
  const navLinks = c.nav
    .map((n) => `<li><a href="${n.href}">${escapeHtml(n.label)}</a></li>`)
    .join('');
  return `<a class="skip-link" href="#icerik">İçeriğe geç</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="#top"><svg class="brand-mark" viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="7" fill="#1D4F7A"/><path d="M11.5 24.5V8h6.2a5.4 5.4 0 0 1 0 10.8h-6.2" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="23.6" cy="23.2" r="2.6" fill="#E3B25A"/></svg><span>${brand}</span></a>
      <nav aria-label="Ana menü"><ul class="nav">${navLinks}</ul></nav>
    </div>
  </header>
  <main id="icerik" tabindex="-1">
    <div class="wrap">
      <section class="hero" aria-labelledby="top">
        <div class="hero-text">
          <h1 id="top">${escapeHtml(c.hero.title)}</h1>
          <p class="lede">${escapeHtml(c.hero.lede(config.brandName, config.city))}</p>
          <p class="actions">
            <a class="button" href="${c.hero.primaryCta.href}">${escapeHtml(c.hero.primaryCta.label)}</a>
            <a class="button button-quiet" href="${c.hero.secondaryCta.href}">${escapeHtml(c.hero.secondaryCta.label)}</a>
          </p>
        </div>
        ${renderHeroFigure()}
      </section>
      ${renderServices()}
      ${renderMethod()}
      ${renderDemos(config)}
      ${renderContactSection(config)}
    </div>
  </main>
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <p class="footer-name">${brand}</p>
        <p>${escapeHtml(c.footer.legal(config.brandName, config.legalName))} ${escapeHtml(config.city)}, Türkiye.</p>
        ${footerEmail(config.contactEmail)}
      </div>
      <nav aria-label="${escapeHtml(c.footer.navLabel)}"><ul class="footer-nav">${navLinks}</ul></nav>
      <p class="footer-en" lang="en">${escapeHtml(c.footer.english(config.brandName))}</p>
      <p class="footer-copy">© ${year} ${brand}</p>
    </div>
  </footer>`;
}
