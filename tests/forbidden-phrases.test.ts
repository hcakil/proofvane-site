import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { renderBody, renderHead } from '../src/render';
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

  it('üretilen sayfa yasaklı ifade içermez', () => {
    const html = renderHead(siteConfig) + renderBody(siteConfig);
    expect(findForbidden(html)).toEqual([]);
  });

  it.each(['src/content.ts', 'src/site.config.ts', 'index.html'])(
    '%s yasaklı ifade içermez',
    (file) => {
      expect(findForbidden(readFileSync(`${root}${file}`, 'utf8'))).toEqual([]);
    },
  );

  it('kaynak metinlerde gerçek dışı sosyal kanıt alanı yok', () => {
    const content = readFileSync(`${root}src/content.ts`, 'utf8');
    expect(content).not.toMatch(/testimonial|logos?\b|clients?\b/i);
  });

  const built = `${root}dist/index.html`;
  it.skipIf(!existsSync(built))('derlenmiş dist/index.html yasaklı ifade içermez', () => {
    expect(findForbidden(readFileSync(built, 'utf8'))).toEqual([]);
  });
});

describe('yayınlanan dosyalar', () => {
  it('public/ornekler yalnız tek sayfalık özetleri içerir', async () => {
    const { readdirSync } = await import('node:fs');
    const files = readdirSync(`${root}public/ornekler`);
    expect(files.sort()).toEqual([
      'proofvane-ornek-ilan-veri-dogruluk.pdf',
      'proofvane-ornek-tercih-on-kontrol.pdf',
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
