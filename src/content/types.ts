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

/** Hero'daki temsilî ürün görselleştirmesi. Gösterilen veriler Demo 2'nin doğrulanmış bulgusudur. */
export interface HeroVisual {
  /** Ekran okuyucu için görselin tek cümlelik özeti. */
  label: string;
  /** Görünür not: görselin temsilî olduğu ve verinin kaynağı. */
  caption: string;
  pipeline: { title: string; steps: { label: string; value: string; state: 'ok' | 'diff' }[] };
  console: { title: string; lines: { text: string; state?: 'ok' | 'diff' }[] };
  app: {
    title: string;
    listingTitle: string;
    listingMeta: string;
    alertTitle: string;
    alertRows: { source: string; value: string }[];
    action: string;
  };
}

export interface SourceRow {
  id: string;
  label: string;
  value: string;
  state: 'same' | 'diff';
}

/** Vaka sunumundaki temsilî arayüz; içindeki her değer doğrulanmış özetten gelir. */
export type CaseUi =
  | { kind: 'sources'; window: string; heading: string; rows: SourceRow[]; verdict: string }
  | {
      kind: 'eligibility';
      window: string;
      heading: string;
      detail: { label: string; value: string }[];
      verdict: string;
    };

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
  tags: string[];
  problem: string;
  approach: string;
  outcome: string;
  ui: CaseUi;
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
  };
  nav: Link[];
  hero: {
    title: string;
    lede: (brand: string, city: string) => string;
    primaryCta: string;
    secondaryCta: Link;
    capabilities: string[];
    visual: HeroVisual;
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
    representative: string;
    problemLabel: string;
    approachLabel: string;
    outcomeLabel: string;
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
