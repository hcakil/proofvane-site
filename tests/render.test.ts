import { describe, expect, it } from 'vitest';
import {
  escapeHtml,
  renderNotFoundBody,
  renderSolutionBody,
  renderSolutionHead,
  SOLUTION_KEYS,
  solutionPath,
  isValidEmail,
  renderBody,
  renderChart,
  renderContact,
  renderDemoActions,
  renderHead,
  renderRootBody,
  renderRootHead,
} from '../src/render';
import { siteConfig, type SiteConfig } from '../src/site.config';
import { LOCALES, TEXT } from '../src/content';

function withConfig(patch: Partial<SiteConfig>): SiteConfig {
  return { ...siteConfig, ...patch };
}

describe('escapeHtml', () => {
  it('HTML özel karakterlerini kaçırır', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;',
    );
  });
});

describe('örnek çalışmalar', () => {
  const demo = TEXT.tr.work.items[0]!;

  it('yayın kapalıyken indirme bağlantısı üretmez', () => {
    const html = renderDemoActions(demo, TEXT.tr, false, '../');
    expect(html).not.toContain('<a');
    expect(html).toContain('Özet yakında');
  });

  it('yayın açıkken göreli PDF bağlantısı üretir', () => {
    const html = renderDemoActions(demo, TEXT.tr, true, '../');
    expect(html).toContain(`href="../ornekler/${demo.pdf}"`);
    expect(html).toContain('download');
  });

  it('yayın kapatılırsa sayfada hiç PDF bağlantısı kalmaz', () => {
    const body = renderBody(withConfig({ demosPublished: false }), 'en');
    expect(body).not.toMatch(/\.pdf/i);
  });

  it.each(LOCALES)('%s: her örnek kendi dilindeki tek sayfalık özete bağlanır', (l) => {
    const links = [...renderBody(siteConfig, l).matchAll(/href="([^"]+\.pdf)"/g)].map((m) => m[1]);
    expect([...links].sort()).toEqual(TEXT[l].work.items.map((d) => `../ornekler/${d.pdf}`).sort());
  });

  it('grafik her segmenti erişilebilir metin ve görünür lejantla verir', () => {
    for (const d of TEXT.en.work.items) {
      const html = renderChart(d);
      expect(html).toContain('role="img"');
      for (const s of d.segments) {
        expect(html).toContain(`${s.label} ${s.value}`);
        expect(html).toContain(`<span class="legend-value">${s.value}</span>`);
      }
      const rects = (html.match(/<rect class="seg /g) ?? []).length - d.segments.length;
      const total = d.segments.reduce((a, s) => a + s.value, 0);
      // Birim grafiğinde her karşılaştırma bir kare; çubukta her segment bir dikdörtgen.
      expect(rects).toBe(total <= 120 ? total : d.segments.length);
    }
  });
});

describe('iletişim', () => {
  it('e-posta yoksa yedek metin, mailto yok', () => {
    const html = renderContact(withConfig({ contactEmail: null }), TEXT.en);
    expect(html).toContain('coming soon');
    expect(html).not.toContain('mailto:');
  });

  it('geçersiz adres için mailto üretmez', () => {
    expect(renderContact(withConfig({ contactEmail: '"><script>' }), TEXT.tr)).not.toContain(
      'mailto:',
    );
  });

  it('hello@ ve partnerships@ adreslerini gösterir, form yok', () => {
    const body = renderBody(siteConfig, 'tr');
    expect(body).toContain('href="mailto:hello@proofvane.com"');
    expect(body).toContain('href="mailto:partnerships@proofvane.com"');
    expect(body).not.toContain('<form');
  });

  it('isValidEmail temel biçimi denetler', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidEmail(null)).toBe(false);
  });
});

describe.each(LOCALES)('%s sayfası', (l) => {
  const t = TEXT[l];
  const head = renderHead(siteConfig, l);
  const body = renderBody(siteConfig, l, 2026);

  it('başlık, açıklama ve og:locale dile göredir', () => {
    expect(head).toContain(`<title>Proofvane | ${escapeHtml(t.meta.titleSuffix)}</title>`);
    expect(head).toContain(
      `<meta name="description" content="${escapeHtml(t.meta.description)}" />`,
    );
    expect(head).toContain(`<meta property="og:locale" content="${t.ogLocale}" />`);
    const other = LOCALES.find((x) => x !== l)!;
    expect(head).toContain(
      `<meta property="og:locale:alternate" content="${TEXT[other].ogLocale}" />`,
    );
  });

  it('canonical kendi dil adresi; hreflang tr, en ve x-default', () => {
    expect(head).toContain(`<link rel="canonical" href="https://proofvane.com/${l}/" />`);
    expect(head).toContain(`<meta property="og:url" content="https://proofvane.com/${l}/" />`);
    expect(head).toContain(
      '<link rel="alternate" hreflang="tr" href="https://proofvane.com/tr/" />',
    );
    expect(head).toContain(
      '<link rel="alternate" hreflang="en" href="https://proofvane.com/en/" />',
    );
    expect(head).toContain(
      '<link rel="alternate" hreflang="x-default" href="https://proofvane.com/" />',
    );
  });

  it('JSON-LD geçerli ve uydurma alan içermez', () => {
    const m = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    const data = JSON.parse(m![1]!) as Record<string, unknown>;
    expect(data).toMatchObject({ '@type': 'Organization', name: 'Proofvane', legalName: 'HCSoft' });
    for (const key of [
      'aggregateRating',
      'review',
      'numberOfEmployees',
      'foundingDate',
      'telephone',
    ]) {
      expect(data).not.toHaveProperty(key);
    }
  });

  it('indexable false iken noindex', () => {
    expect(head).not.toContain('noindex');
    expect(renderHead(withConfig({ indexable: false }), l)).toContain('noindex');
  });

  it('tam bir h1, tüm sayfa içi bağlantı hedefleri mevcut', () => {
    expect(body.match(/<h1[\s>]/g)).toHaveLength(1);
    for (const [, id] of body.matchAll(/href="#([^"]+)"/g)) expect(body).toContain(`id="${id}"`);
  });

  it('dil seçici: iki dil, göreli bağlantı, geçerli dil aria-current', () => {
    expect(body).toContain(
      `href="../${l}/" hreflang="${l}" lang="${l}" data-locale="${l}" aria-current="page"`,
    );
    const other = LOCALES.find((x) => x !== l)!;
    expect(body).toMatch(
      new RegExp(
        `href="\\.\\./${other}/" hreflang="${other}" lang="${other}" data-locale="${other}">`,
      ),
    );
    expect(body).toContain(`aria-label="${t.a11y.langNav}"`);
  });

  it('erişilebilirlik etiketleri dile göredir', () => {
    expect(body).toContain(`>${t.a11y.skip}</a>`);
    expect(body).toContain(`aria-label="${t.a11y.mainNav}"`);
    expect(body).toContain(
      `<figcaption id="process-caption" class="process-caption">${escapeHtml(t.hero.process.caption)}</figcaption>`,
    );
    expect(body).toContain(`<p class="visually-hidden">${escapeHtml(t.hero.process.label)}</p>`);
    expect(body).toContain(`aria-label="${t.a11y.theme.label}"`);
    expect(body).toContain('aria-controls="site-menu"');
  });

  it('iletişim: e-posta ve tıklanabilir telefon', () => {
    expect(body).toContain('href="tel:+905421546037"');
    expect(body).toContain('+90 542 154 60 37');
  });

  it('alt bilgide ticari unvan ve yıl', () => {
    expect(body).toContain(escapeHtml(t.footer.legal('Proofvane', 'HCSoft')));
    expect(body).toContain('© 2026 Proofvane');
  });

  it('hizmetler Flutter ile başlar ve beş hizmeti kapsar', () => {
    const titles = [...body.matchAll(/<h3 id="svc-([^"]+)">/g)].map((m) => m[1]);
    expect(titles).toEqual(['flutter', 'web', 'api', 'automation', 'verification']);
  });

  it('ilk ekranda (hero) teknik ayrıntı ve sınav/ilan ifadesi yok', () => {
    const hero = body.slice(body.indexOf('<section class="hero"'), body.indexOf('</section>'));
    expect(hero).not.toMatch(/POST |\/v1\/|Idempotency|<code/);
    expect(hero).not.toMatch(/kpss|ösym|ilan|placement|listing/i);
  });

  it('sınav/kamu ilanı ifadeleri yalnızca sektör çözümleri bölümünde geçer', () => {
    const exam =
      /kpss|ösym|atanma|kamu ilan|tercih|placement|public-sector|kariyer kapısı|millî saraylar|national palaces|ilan/i;
    const i = body.indexOf('<section id="solutions"');
    expect(i).toBeGreaterThan(-1);
    const j = body.indexOf('</section>', i) + '</section>'.length;
    expect(body.slice(0, i) + body.slice(j)).not.toMatch(exam);
    expect(head.replace(/<script[\s\S]*?<\/script>/, '')).not.toMatch(exam);
  });

  it('bölüm sırası: hero, mobil, sistemler, çözümler, hizmetler', () => {
    const order = ['class="hero"', 'id="work"', 'id="systems"', 'id="solutions"', 'id="services"'];
    const pos = order.map((m) => body.indexOf(m));
    expect(pos.every((p) => p > -1)).toBe(true);
    expect([...pos].sort((a, b) => a - b)).toEqual(pos);
  });

  it('etkileşimli demo isteğe bağlı ve kapalı gelir', () => {
    expect(body).toMatch(/<details class="tech" data-tech>\s*<summary>/);
    expect(body).not.toMatch(/<details class="tech"[^>]*open/);
    const m = body.match(/<script type="application\/json" id="demo-text">([\s\S]*?)<\/script>/);
    const data = JSON.parse(m![1]!) as { log: { idle: string } };
    expect(data.log.idle).toBe(t.showcases.mobile.demo.log.idle);
  });

  it('çözüm kartları çözüm sayfalarına göreli bağlanır', () => {
    for (const key of SOLUTION_KEYS) expect(body).toContain(`href="${solutionPath(l, key)}"`);
  });

  it('konsept ve gerçek çalışma ayrı etiketlenir', () => {
    expect(body).toContain(
      `<p class="status status-concept">${escapeHtml(t.showcases.mobile.status)}</p>`,
    );
    expect(body).toContain(
      `<p class="status status-real">${escapeHtml(t.showcases.systems.status)}</p>`,
    );
    expect(t.showcases.mobile.demo.caption).toMatch(
      l === 'tr' ? /müşteri projesi değildir/ : /not a customer project/,
    );
  });

  describe.each(SOLUTION_KEYS)('çözüm sayfası: %s', (key) => {
    const page = t.pages[key];
    const sHead = renderSolutionHead(siteConfig, l, key);
    const sBody = renderSolutionBody(siteConfig, l, key, 2026);
    const other = LOCALES.find((x) => x !== l)!;
    it('canonical ve hreflang iki dildeki karşılığı gösterir', () => {
      expect(sHead).toContain(
        `<link rel="canonical" href="https://proofvane.com/${l}/${solutionPath(l, key)}" />`,
      );
      expect(sHead).toContain(
        `hreflang="${other}" href="https://proofvane.com/${other}/${solutionPath(other, key)}"`,
      );
      expect(sHead).toContain(`<title>${escapeHtml(page.meta.title)} | Proofvane</title>`);
    });
    it('tek h1, CTA konulu mailto, PDF ve sınır notu', () => {
      expect(sBody.match(/<h1[\s>]/g)).toHaveLength(1);
      expect(sBody).toContain(
        `mailto:hello@proofvane.com${escapeHtml(`?subject=${encodeURIComponent(page.cta.subject)}`)}`,
      );
      expect(sBody).toContain(`>${escapeHtml(page.cta.label)}</a>`);
      expect(sBody).toMatch(/href="\.\.\/\.\.\/\.\.\/ornekler\/[^"]+\.pdf"/);
      expect(sBody).toContain(escapeHtml(page.notice));
      expect(sBody).toContain('href="tel:+905421546037"');
    });
    it('dil seçici karşı dildeki aynı çözüm sayfasına gider', () => {
      expect(sBody).toContain(
        `href="../../../${other}/${solutionPath(other, key)}" hreflang="${other}"`,
      );
    });
    it('teknik ayrıntı (endpoint, kod) içermez', () => {
      expect(sBody).not.toMatch(/POST |\/v1\/|Idempotency|<code|<details/);
    });
  });
});

describe('404', () => {
  it('iki dilli, köke göre mutlak bağlantılar', () => {
    const body = renderNotFoundBody(siteConfig);
    expect(body).toContain('href="/tr/"');
    expect(body).toContain('href="/en/"');
    expect(body).toContain('lang="tr"');
    expect(body).toContain('lang="en"');
  });
});

describe('kök sayfa', () => {
  it('hreflang alternatifleri ve iki dile bağlantı var, canonical yok', () => {
    const head = renderRootHead(siteConfig);
    expect(head).toContain('hreflang="x-default"');
    expect(head).toContain('hreflang="tr"');
    expect(head).not.toContain('canonical');
    const body = renderRootBody(siteConfig);
    expect(body).toContain('href="./tr/"');
    expect(body).toContain('href="./en/"');
  });
});
