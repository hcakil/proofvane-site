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

/**
 * Hero'daki etkileşimli konsept: bir mobil uygulamada tamamlanan görev API,
 * iş kuyruğu ve veritabanından geçer. Müşteri projesi değildir; sayfada
 * öyle olduğu yazılır. `{task}`, `{id}`, `{key}` ve `{n}` yer tutucularını
 * tarayıcıdaki betik doldurur.
 */
export interface HeroDemo {
  /** Ekran okuyucu için görselin özeti. */
  label: string;
  /** Görünür not: konsept olduğu ve tarayıcıda çalıştığı. */
  caption: string;
  app: {
    title: string;
    subtitle: string;
    tasks: { id: string; title: string; meta: string }[];
    action: string;
    synced: string;
    queued: string;
    online: string;
    offline: string;
  };
  nodes: { id: 'api' | 'queue' | 'db' | 'push'; label: string; detail: string }[];
  controls: { networkOff: string; networkOn: string; reset: string; hint: string };
  log: {
    title: string;
    idle: string;
    optimistic: string;
    request: string;
    accepted: string;
    stored: string;
    notified: string;
    offline: string;
    reconnect: string;
  };
}

/**
 * Hero'daki otomatik süreç görseli: bir projenin dört aşaması (tasarla,
 * geliştir, test et, yayınla). Tıklama gerektirmez; 10 saniyelik döngü.
 */
export interface ProcessVisual {
  label: string;
  caption: string;
  steps: { id: 'design' | 'build' | 'test' | 'ship'; label: string; detail: string }[];
  scene: {
    web: string;
    mobile: string;
    backend: string;
    checks: string[];
    live: string;
  };
}

/** Sektöre özel çözüm sayfası (ör. /tr/cozumler/tercih-on-kontrol/). */
export interface SolutionPage {
  key: 'precheck' | 'listing';
  slug: string;
  /** Sayfanın dayandığı doğrulanmış örnek (`work.items` içindeki kimlik). */
  demoId: 'placement' | 'listing';
  meta: { title: string; description: string };
  audience: string;
  title: string;
  lede: string;
  /** Hizmetin durumu ve sınırı: canlı ürün değil, kontrollü insan incelemesi. */
  notice: string;
  cta: { label: string; subject: string };
  pdfCta: string;
  problem: { title: string; body: string };
  steps: { title: string; items: { title: string; body: string }[] };
  demo: { title: string; body: string; note: string };
  checks: { title: string; intro: string; items: string[] };
  limits: { title: string; items: string[] };
  closing: { title: string; body: string };
}

export interface Capability {
  id: string;
  label: string;
  detail: string;
}

interface ShowcaseBase {
  /** Bölüm sırası, ör. "01". */
  index: string;
  kicker: string;
  title: string;
  body: string;
  /** Kanıt durumu: gerçek proje mi, yetenek gösterimi mi. */
  status: string;
  stack: string;
}

/** Vitrin 1: mobil mühendislik ve uygulama güvenilirliği (tarayıcıda simülasyon). */
export interface MobileShowcase extends ShowcaseBase {
  points: string[];
  /** İsteğe bağlı teknik ayrıntı: etkileşimli senkron demosu (kapalı gelir). */
  demoToggle: string;
  demo: HeroDemo;
  pipeline: {
    window: string;
    stages: { id: string; label: string; detail: string }[];
    /** Hata eklenince düşen aşamanın kimliği. */
    failAt: string;
    run: string;
    regress: string;
    idle: string;
    running: string;
    passed: string;
    blocked: string;
    failure: string;
    rolloutLabel: string;
    rollout: string[];
    gate: string;
  };
}

/** Vitrin 2: backend, entegrasyon ve otomasyon (gerçek veri hattı). */
export interface SystemsShowcase extends ShowcaseBase {
  flow: { label: string; detail: string }[];
  facts: Fact[];
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
    menu: string;
    theme: { label: string; system: string; light: string; dark: string };
  };
  nav: Link[];
  hero: {
    title: string;
    lede: (brand: string, city: string) => string;
    primaryCta: string;
    secondaryCta: Link;
    eyebrow: string;
    capabilities: Capability[];
    process: ProcessVisual;
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
  showcases: { mobile: MobileShowcase; systems: SystemsShowcase };
  /** Vitrin 3: veri doğrulama örnekleri. */
  work: {
    index: string;
    kicker: string;
    status: string;
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
  /** Ana sayfadaki sektör çözümleri bölümü (vitrin 3). */
  solutions: {
    index: string;
    kicker: string;
    title: string;
    intro: string;
    more: string;
  };
  /** Çözüm sayfalarının dil klasörü altındaki yolu: "cozumler" / "solutions". */
  solutionsPath: string;
  pages: Record<SolutionPage['key'], SolutionPage>;
  notFound: { title: string; body: string; home: string };
  contact: {
    title: string;
    body: string;
    cta: string;
    phoneLabel: string;
    emailLabel: string;
    partnershipsLabel: string;
    fallback: string;
  };
  footer: {
    legal: (brand: string, legalName: string) => string;
    place: string;
  };
}
