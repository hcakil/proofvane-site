import { describe, expect, it } from 'vitest';
import {
  escapeHtml,
  isValidEmail,
  renderBody,
  renderContact,
  renderDemoActions,
  renderHead,
} from '../src/render';
import { siteConfig, type SiteConfig } from '../src/site.config';

function withConfig(patch: Partial<SiteConfig>): SiteConfig {
  return { ...siteConfig, ...patch };
}

const demo = siteConfig.demos.items[0]!;

describe('escapeHtml', () => {
  it('HTML özel karakterlerini kaçırır', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;',
    );
  });
});

describe('örnek raporlar', () => {
  it('yayın kapalıyken indirme düğmesi üretmez', () => {
    const html = renderDemoActions({ ...demo, pdfUrl: '/ornek.pdf' }, false);
    expect(html).not.toContain('download');
    expect(html).not.toContain('<a');
    expect(html).toContain('Özet yakında');
  });

  it('yayın açık ama PDF yolu yoksa yine düğme üretmez', () => {
    const html = renderDemoActions({ ...demo, pdfUrl: null }, true);
    expect(html).not.toContain('<a');
  });

  it('yayın açık ve PDF yolu varsa indirme bağlantısı üretir', () => {
    const html = renderDemoActions({ ...demo, pdfUrl: '/raporlar/ornek.pdf' }, true);
    expect(html).toContain('href="/raporlar/ornek.pdf"');
    expect(html).toContain('download');
  });

  it('yayın kapatılırsa sayfada hiç indirme bağlantısı kalmaz', () => {
    const body = renderBody(withConfig({ demos: { ...siteConfig.demos, published: false } }));
    expect(body).not.toMatch(/\sdownload[\s>]/);
    expect(body).not.toMatch(/\.pdf/i);
  });

  it('varsayılan yapılandırmada yalnız tek sayfalık özetler indirilebilir', () => {
    const body = renderBody(siteConfig);
    const links = [...body.matchAll(/href="([^"]+\.pdf)"/g)].map((m) => m[1]);
    expect(links).toHaveLength(siteConfig.demos.items.length);
    for (const href of links) {
      expect(href).toMatch(/^\/ornekler\/proofvane-ornek-[a-z-]+\.pdf$/);
    }
  });

  it('her örnek kartında özet etiketi bulunur', () => {
    const body = renderBody(siteConfig);
    const count = body.split('Örnek çalışma · tek sayfalık özet').length - 1;
    expect(count).toBe(siteConfig.demos.items.length);
  });
});

describe('iletişim', () => {
  it('e-posta null iken yedek metni gösterir, mailto üretmez', () => {
    const html = renderContact(null);
    expect(html).toContain('İletişim adresi yakında');
    expect(html).not.toContain('mailto:');
  });

  it('geçersiz adres için de mailto üretmez', () => {
    expect(renderContact('"><script>')).not.toContain('mailto:');
  });

  it('geçerli adres verildiğinde mailto bağlantısı üretir', () => {
    const html = renderContact('merhaba@ornek.com.tr');
    expect(html).toContain('href="mailto:merhaba@ornek.com.tr"');
    expect(html).not.toContain('yakında');
  });

  it('varsayılan sayfada kurumsal adres mailto ile var, form yok', () => {
    const body = renderBody(siteConfig);
    expect(body).toContain('href="mailto:hello@proofvane.com"');
    expect(body).not.toContain('<form');
  });

  it('e-posta yoksa footer da mailto üretmez', () => {
    expect(renderBody(withConfig({ contactEmail: null }))).not.toContain('mailto:');
  });

  it('isValidEmail temel biçimi denetler', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('a@b')).toBe(false);
  });
});

describe('marka ve meta', () => {
  it('marka Proofvane ve tek yerden değişir', () => {
    expect(renderHead(siteConfig)).toContain('<title>Proofvane |');
    const body = renderBody(withConfig({ brandName: 'Deneme Veri' }));
    expect(body).toContain('Deneme Veri');
    expect(body).not.toContain('Proofvane');
    expect(body).not.toContain('Stüdyo (çalışma adı)');
    expect(renderHead(withConfig({ brandName: 'Deneme Veri' }))).toContain('<title>Deneme Veri |');
  });

  it('footer ticari unvanı, şehri ve alt menüyü gösterir', () => {
    const body = renderBody(siteConfig, 2026);
    const footer = body.slice(body.indexOf('<footer'));
    expect(footer).toContain('Proofvane, HCSoft işletmesinin markasıdır.');
    expect(footer).toContain('Ankara');
    expect(footer).toContain('aria-label="Alt menü"');
    expect(footer).toContain('© 2026 Proofvane');
  });

  it('indexable false iken noindex ekler, true iken eklemez', () => {
    expect(renderHead(withConfig({ indexable: false }))).toContain('noindex');
    expect(renderHead(siteConfig)).not.toContain('noindex');
  });

  it('siteUrl verildiğinde canonical, og:url ve og:image ekler', () => {
    expect(renderHead(withConfig({ siteUrl: null }))).not.toContain('canonical');
    const head = renderHead(siteConfig);
    expect(head).toContain('<link rel="canonical" href="https://proofvane.com/" />');
    expect(head).toContain('<meta property="og:url" content="https://proofvane.com/" />');
    expect(head).toContain('content="https://proofvane.com/og-image.png"');
  });

  it('JSON-LD geçerli ve uydurma alan içermez', () => {
    const head = renderHead(siteConfig);
    const m = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(m).not.toBeNull();
    const data = JSON.parse(m![1]!) as Record<string, unknown>;
    expect(data['@type']).toBe('Organization');
    expect(data.name).toBe('Proofvane');
    expect(data.legalName).toBe('HCSoft');
    expect(data.email).toBe('hello@proofvane.com');
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

  it('tam olarak bir h1 ve tüm menü hedefleri vardır', () => {
    const body = renderBody(siteConfig);
    expect(body.match(/<h1[\s>]/g)).toHaveLength(1);
    for (const [, id] of body.matchAll(/href="#([^"]+)"/g)) {
      expect(body).toContain(`id="${id}"`);
    }
  });
});

describe('konumlandırma', () => {
  const body = renderBody(siteConfig);
  const head = renderHead(siteConfig);
  const exam = /kpss|ösym|atanma|kamu ilan|tercih/i;

  function section(id: string): string {
    const start = body.indexOf(`<section id="${id}"`);
    expect(start).toBeGreaterThan(-1);
    const end = body.indexOf('</section>', start);
    return body.slice(start, end);
  }

  it('başlık, açıklama ve giriş bölümü genel yazılım stüdyosu olarak konumlanır', () => {
    const hero = body.slice(
      body.indexOf('<section class="hero"'),
      body.indexOf('<section id="hizmetler"'),
    );
    for (const text of [head, hero]) {
      expect(text).not.toMatch(exam);
      expect(text).toMatch(/Flutter/);
      expect(text).toMatch(/web/i);
      expect(text).toMatch(/API/);
    }
  });

  it('sınav/kamu ilanı ifadeleri yalnızca örnek çalışmalar bölümünde geçer', () => {
    const withoutDemos = body.replace(section('ornekler'), '');
    expect(withoutDemos).not.toMatch(exam);
  });

  it('hizmetler uygulama geliştirmeyle başlar ve beş hizmeti kapsar', () => {
    const services = section('hizmetler');
    const titles = [...services.matchAll(/<h4 id="[^"]+">([^<]+)<\/h4>/g)].map((m) => m[1]);
    expect(titles).toEqual([
      'Mobil uygulamalar',
      'Web uygulamaları',
      'API ve backend',
      'Veri doğrulama ve kaynaklı raporlama',
      'Veri otomasyonu',
    ]);
  });

  it('örnek çalışmalar bölümü veri kalitesi örneği olarak çerçevelenir', () => {
    const demos = section('ornekler');
    expect(demos).toContain('Örnek çalışmalar');
    expect(demos).toContain('Veri kalitesi');
  });
});
