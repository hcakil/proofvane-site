import { describe, expect, it } from 'vitest';
import { LOCALES, TEXT } from '../src/content';

/** Örnek çalışmaların doğrulanmış sonuçları (tek sayfalık özetlerden). Çeviri bu sayıları değiştiremez. */
const VERIFIED = {
  placement: { segments: [78, 74, 361], total: 513 },
  listing: { segments: [46, 2, 6, 1], total: 55 },
} as const;

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

describe('içerik', () => {
  it('TR ve EN aynı yapıdadır (eksik çeviri yok)', () => {
    expect(shape(TEXT.en)).toEqual(shape(TEXT.tr));
  });

  it.each(LOCALES)('%s: örnek çalışma sayıları doğrulanmış değerlerle aynı', (l) => {
    for (const demo of TEXT[l].work.items) {
      const expected = VERIFIED[demo.id as keyof typeof VERIFIED];
      expect(expected, demo.id).toBeDefined();
      const values = demo.segments.map((s) => s.value);
      expect(values).toEqual([...expected.segments]);
      expect(values.reduce((a, b) => a + b, 0)).toBe(expected.total);
      expect(demo.chartTitle).toContain(String(expected.total));
    }
  });

  it('kilit sayılar iki dilde aynıdır', () => {
    const nums = (l: (typeof LOCALES)[number]) =>
      TEXT[l].work.items.flatMap((d) => d.facts.map((f) => f.value.replace(/\D+/g, ' ').trim()));
    expect(nums('en')).toEqual(['22', '12 20', '990', '39']);
    expect(nums('tr')).toEqual(['22 10', '12 20', '990', '39']);
  });

  it('İngilizce sayfa İngilizce özetlere, Türkçe sayfa Türkçe özetlere bağlanır', () => {
    for (const d of TEXT.en.work.items) expect(d.pdf).toMatch(/-en\.pdf$/);
    for (const d of TEXT.tr.work.items) expect(d.pdf).not.toMatch(/-en\.pdf$/);
  });

  it.each(LOCALES)('%s: veri hattı vitrinindeki sayılar doğrulanmış özetlerle aynı', (l) => {
    const facts = TEXT[l].showcases.systems.facts.map((f) => f.value);
    // 990 Tablo 3 satırı (tercih özeti), 3 kaynak ve 55 karşılaştırma (ilan özeti).
    expect(facts).toEqual(['990', '3', '55']);
    expect(VERIFIED.listing.total).toBe(55);
  });
  it.each(LOCALES)('%s: kaynak karşılaştırma arayüzü doğrulanmış farkı gösterir', (l) => {
    const listing = TEXT[l].work.items.find((d) => d.id === 'listing')!;
    expect(listing.ui.kind).toBe('sources');
    if (listing.ui.kind === 'sources') {
      expect(listing.ui.rows.map((r) => r.state)).toEqual(['same', 'same', 'diff']);
      expect(listing.ui.rows[0]!.value).toBe('2026-10-22T23:59:00');
    }
  });
  it.each(LOCALES)('%s: senkron demosu ve sürüm hattı tutarlı', (l) => {
    const d = TEXT[l].showcases.mobile.demo;
    expect(d.nodes.map((n) => n.id)).toEqual(['api', 'queue', 'db', 'push']);
    expect(d.app.tasks.length).toBeGreaterThan(0);
    const p = TEXT[l].showcases.mobile.pipeline;
    expect(p.stages.map((s) => s.id)).toContain(p.failAt);
    for (const key of ['request', 'optimistic', 'reconnect'] as const) {
      expect(d.log[key]).toMatch(/\{\w+\}/);
    }
  });
  it.each(LOCALES)('%s: hero süreci dört adım, teknik ayrıntı içermez', (l) => {
    const p = TEXT[l].hero.process;
    expect(p.steps.map((s) => s.id)).toEqual(['design', 'build', 'test', 'ship']);
    expect(JSON.stringify(p)).not.toMatch(/POST|\/v1\/|Idempotency|queue|kuyruk|API 202/i);
  });
  it.each(LOCALES)('%s: çözüm sayfaları doğrulanmış örneğe dayanır', (l) => {
    const t = TEXT[l];
    expect(t.pages.precheck.demoId).toBe('placement');
    expect(t.pages.listing.demoId).toBe('listing');
    expect(t.pages.listing.checks.items).toHaveLength(11);
    // Nitelik uygunluğu atanma ihtimaliyle karıştırılmaz; canlı ürün iddiası yok.
    expect(t.pages.precheck.notice).toMatch(
      l === 'tr' ? /atanma ihtimali/ : /chance of being placed/,
    );
    // Resmî kaynakların okunma/kontrol tarihi açıkça yazılır.
    expect(t.pages.precheck.demo.note).toMatch(/18\.12\.2025.*14\.10\.2026/);
    expect(t.pages.listing.demo.note).toMatch(/13\.10\.2026.*14\.10\.2026/);
    for (const page of Object.values(t.pages)) {
      expect(page.notice).toMatch(l === 'tr' ? /değerlendir/ : /considering/);
    }
  });
  it('vaka sonuç metinleri grafik sayılarını içerir', () => {
    for (const l of LOCALES) {
      for (const d of TEXT[l].work.items) {
        for (const s of d.segments) expect(d.outcome, `${l}/${d.id}`).toContain(String(s.value));
      }
    }
  });
});
