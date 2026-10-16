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
    expect(nums('en')).toEqual(['990', '39', '22', '12 20']);
    expect(nums('tr')).toEqual(['990', '39', '22 10', '12 20']);
  });

  it('İngilizce sayfa İngilizce özetlere, Türkçe sayfa Türkçe özetlere bağlanır', () => {
    for (const d of TEXT.en.work.items) expect(d.pdf).toMatch(/-en\.pdf$/);
    for (const d of TEXT.tr.work.items) expect(d.pdf).not.toMatch(/-en\.pdf$/);
  });

  it('hero kenar notu sayısı iddia işaretleriyle eşleşir', () => {
    for (const l of LOCALES) {
      const marks = TEXT[l].hero.title.filter((p) => p.note).map((p) => p.note);
      expect(marks).toEqual(TEXT[l].hero.notes.map((_, i) => i + 1));
    }
  });
});
