/**
 * Dil seçimi. Tarayıcıda çalışan küçük betikler ve birim testleri aynı
 * fonksiyonu kullanır.
 *
 * Kural:
 *   1. Ziyaretçi daha önce dil seçtiyse (localStorage) o dil.
 *   2. Yoksa tarayıcının dil tercihi listesindeki ilk dil (`navigator.languages`;
 *      işletim sistemi dili değil, tarayıcıda ayarlanan sıralı liste).
 *      Türkçe ise TR, başka her dilde EN.
 */
export type SiteLocale = 'tr' | 'en';

export const STORAGE_KEY = 'proofvane.lang';

export function isLocale(value: unknown): value is SiteLocale {
  return value === 'tr' || value === 'en';
}

export function pickLocale(stored: string | null, languages: readonly string[]): SiteLocale {
  if (isLocale(stored)) return stored;
  const first = languages.find((l) => typeof l === 'string' && l.trim() !== '');
  if (!first) return 'en';
  return first.trim().toLowerCase().split(/[-_]/)[0] === 'tr' ? 'tr' : 'en';
}

export function readStored(storage: Pick<Storage, 'getItem'> | undefined): string | null {
  try {
    return storage?.getItem(STORAGE_KEY) ?? null;
  } catch {
    return null;
  }
}

export function writeStored(
  storage: Pick<Storage, 'setItem'> | undefined,
  locale: SiteLocale,
): void {
  try {
    storage?.setItem(STORAGE_KEY, locale);
  } catch {
    // Gizli mod ya da engellenmiş depolama: tercih kalıcı olmaz, sayfa yine çalışır.
  }
}
