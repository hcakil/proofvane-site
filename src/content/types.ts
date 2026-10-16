/**
 * Sayfa metinlerinin dil bağımsız biçimi. Her dil (`tr.ts`, `en.ts`) bu tipi
 * eksiksiz doldurur; derleyici eksik çeviriyi hata olarak gösterir.
 *
 * Kural: müşteri logosu, referans yorumu, uydurma sayı ya da süre/sonuç vaadi
 * yok. Örnek çalışmalardaki sayılar yalnızca doğrulanmış tek sayfalık
 * özetlerden alınır (bkz. `tests/content.test.ts`).
 */

export type Locale = 'tr' | 'en';

export interface Link {
  href: string;
  label: string;
}

export interface HeroPart {
  text: string;
  /** Varsa bu ifadenin sonuna, aynı numaralı kenar notuna giden işaret eklenir. */
  note?: number;
}

export interface Service {
  id: string;
  title: string;
  body: string;
  deliverables: string[];
  stack: string;
}

export interface Fact {
  value: string;
  label: string;
}

export interface Segment {
  key: 'yes' | 'check' | 'no' | 'same' | 'interp' | 'missing' | 'diff';
  label: string;
  value: number;
}

export interface Demo {
  id: string;
  title: string;
  body: string;
  /** Görsel kartın konusu: grafiğin üstündeki tek cümlelik açıklama. */
  chartTitle: string;
  chartUnit: string;
  segments: Segment[];
  facts: Fact[];
  /** `public/ornekler/` altındaki tek sayfalık özetin dosya adı. */
  pdf: string;
  pdfLabel: string;
  source: string;
}

export interface SiteText {
  locale: Locale;
  htmlLang: string;
  ogLocale: string;
  meta: { titleSuffix: string; description: string; ogImageAlt: string };
  a11y: {
    skip: string;
    mainNav: string;
    footerNav: string;
    langNav: string;
    langNames: Record<Locale, string>;
    notesLabel: string;
    noteRef: (n: number) => string;
  };
  nav: Link[];
  hero: {
    title: HeroPart[];
    notes: string[];
    lede: (brand: string, city: string) => string;
    primaryCta: string;
    secondaryCta: Link;
  };
  services: {
    title: string;
    intro: string;
    deliverablesLabel: string;
    stackLabel: string;
    items: Service[];
  };
  method: {
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
    principles: { id: string; title: string; body: string }[];
  };
  work: {
    title: string;
    intro: string;
    downloadNote: string;
    pendingNote: string;
    items: Demo[];
  };
  contact: {
    title: string;
    body: string;
    cta: string;
    emailLabel: string;
    partnershipsLabel: string;
    fallback: string;
  };
  footer: {
    legal: (brand: string, legalName: string) => string;
    place: string;
  };
}
