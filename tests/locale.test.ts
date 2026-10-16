import { describe, expect, it } from 'vitest';
import { STORAGE_KEY, pickLocale, readStored, writeStored } from '../src/locale';

describe('dil seçimi (kök sayfa)', () => {
  it.each([
    [['tr-TR'], 'tr'],
    [['tr'], 'tr'],
    [['TR_tr'], 'tr'],
    [['en-US'], 'en'],
    [['de-DE'], 'en'],
    [['fr-FR', 'tr-TR'], 'en'],
    [['tr-TR', 'en-US'], 'tr'],
    [['en-US', 'tr'], 'en'],
    [[], 'en'],
    [[''], 'en'],
  ] as const)('tarayıcı dil listesi %j → %s', (languages, expected) => {
    expect(pickLocale(null, languages)).toBe(expected);
  });

  it('kayıtlı tercih tarayıcı dilinden önce gelir', () => {
    expect(pickLocale('en', ['tr-TR'])).toBe('en');
    expect(pickLocale('tr', ['de-DE'])).toBe('tr');
  });

  it('geçersiz kayıt yok sayılır', () => {
    expect(pickLocale('de', ['tr-TR'])).toBe('tr');
    expect(pickLocale('', ['en-US'])).toBe('en');
  });

  it('depolama okunur/yazılır; hata verirse sayfa bozulmaz', () => {
    const map = new Map<string, string>();
    const storage = {
      getItem: (k: string) => map.get(k) ?? null,
      setItem: (k: string, v: string) => void map.set(k, v),
    };
    writeStored(storage, 'tr');
    expect(map.get(STORAGE_KEY)).toBe('tr');
    expect(readStored(storage)).toBe('tr');

    const broken = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };
    expect(readStored(broken)).toBeNull();
    expect(() => writeStored(broken, 'en')).not.toThrow();
    expect(readStored(undefined)).toBeNull();
  });
});
