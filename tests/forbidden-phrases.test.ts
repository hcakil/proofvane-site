import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { renderBody, renderHead } from '../src/render';
import { LOCALES } from '../src/content';
import { siteConfig } from '../src/site.config';

const root = fileURLToPath(new URL('..', import.meta.url));

/**
 * Sayfada geçmemesi gereken ifadeler: kanıtlanamayan vaatler, uydurma sosyal
 * kanıt ve başka ürünlere atıf. Küçük harfe Türkçe kurallarıyla çevrilerek aranır.
 */
export const FORBIDDEN = [
  'anlık otomatik',
  'her zaman güncel',
  'atanma garantisi',
  'garanti',
  '24 saatte',
  '24 saat içinde',
  '%100',
  'yüzde yüz',
  'müşterilerimiz',
  'referanslarımız',
  'binlerce',
  'loiai',
  'guarantee',
  'always up to date',
  'real-time',
  '100%',
  'our clients',
  'thousands of',
  'world-class',
];

function normalize(text: string): string {
  return text.toLocaleLowerCase('tr-TR').replace(/\s+/g, ' ');
}

function findForbidden(text: string): string[] {
  const n = normalize(text);
  return FORBIDDEN.filter((p) => n.includes(normalize(p)));
}

describe('yasaklı ifadeler', () => {
  it('tarayıcı kendisi çalışıyor', () => {
    expect(findForbidden('Her Zaman GÜNCEL veri')).toEqual(['her zaman güncel']);
    expect(findForbidden('ATANMA  GARANTİSİ')).toContain('atanma garantisi');
  });

  it.each(LOCALES)('üretilen %s sayfası yasaklı ifade içermez', (l) => {
    const html = renderHead(siteConfig, l) + renderBody(siteConfig, l);
    expect(findForbidden(html)).toEqual([]);
  });

  it.each(['src/content/tr.ts', 'src/content/en.ts', 'src/site.config.ts', 'index.html'])(
    '%s yasaklı ifade içermez',
    (file) => {
      expect(findForbidden(readFileSync(`${root}${file}`, 'utf8'))).toEqual([]);
    },
  );

  it('kaynak metinlerde gerçek dışı sosyal kanıt alanı yok', () => {
    for (const f of ['tr', 'en']) {
      const content = readFileSync(`${root}src/content/${f}.ts`, 'utf8');
      expect(content).not.toMatch(/testimonial|logos?\b|clients?\b|trusted by|happy customers/i);
    }
  });

  for (const page of ['index.html', 'tr/index.html', 'en/index.html']) {
    const built = `${root}dist/${page}`;
    it.skipIf(!existsSync(built))(`derlenmiş dist/${page} yasaklı ifade içermez`, () => {
      expect(findForbidden(readFileSync(built, 'utf8'))).toEqual([]);
    });
  }
});

describe('yayınlanan dosyalar', () => {
  it('public/ornekler yalnız tek sayfalık özetleri içerir', async () => {
    const { readdirSync } = await import('node:fs');
    const files = readdirSync(`${root}public/ornekler`);
    expect(files.sort()).toEqual([
      'proofvane-ornek-ilan-veri-dogruluk.pdf',
      'proofvane-ornek-tercih-on-kontrol.pdf',
      'proofvane-sample-listing-accuracy-en.pdf',
      'proofvane-sample-placement-precheck-en.pdf',
    ]);
    for (const f of files) {
      const pdf = readFileSync(`${root}public/ornekler/${f}`).toString('latin1');
      // Sayfa ağacının kökü tek sayfa bildirmeli (ayrıntılı raporlar çok sayfalıdır).
      const counts = [...pdf.matchAll(/<<[^<>]*\/Type\s*\/Pages\b[^<>]*>>/g)].map((m) =>
        Number(/\/Count\s+(\d+)/.exec(m[0])?.[1] ?? NaN),
      );
      expect(Math.max(...counts), f).toBe(1);
      expect(pdf).not.toContain('[iletişim bilgisi]');
    }
  });
});
