import type { Locale } from './types';

/**
 * Tercih ön kontrolü "nasıl çalışır" sayfası (satış görüşmesinde gösterilen
 * dört sahneli anlatım). Bütün değerler Demo 1'in doğrulanmış çıktısından
 * gelir: research/demos/demo1 (region_classified.csv, NOTES.md). Aday
 * kurgusaldır; sayfa otomatik ya da canlı bir hizmet iddiası taşımaz.
 */

export type SortGroup = 'yes' | 'check' | 'no';

export interface Walkthrough {
  slug: string;
  meta: { title: string; description: string };
  notice: string;
  kicker: string;
  title: string;
  lede: string;
  controls: {
    label: string;
    play: string;
    pause: string;
    prev: string;
    next: string;
    step: string;
  };
  profile: {
    step: string;
    title: string;
    body: string;
    badge: string;
    fields: { label: string; value: string }[];
  };
  guide: {
    step: string;
    title: string;
    body: string;
    row: { code: string; text: string; codes: string; ref: string };
    def: { code: string; text: string; ref: string };
    rules: { text: string; ref: string }[];
  };
  sort: {
    step: string;
    title: string;
    body: string;
    groups: Record<SortGroup, string>;
    rows: { group: SortGroup; code: string; text: string; reason: string; ref: string }[];
    totalsLabel: string;
  };
  report: {
    step: string;
    title: string;
    body: string;
    lines: string[];
    check: string;
    caveat: string;
    pdf: string;
  };
  sources: { title: string; items: { label: string; href: string }[] };
  cta: { title: string; body: string; label: string; subject: string; alt: string };
}

const OSYM = 'https://dokuman.osym.gov.tr/pdfdokuman/2025/KPSS/TERCIH2/';

export const WALKTHROUGH: Record<Locale, Walkthrough> = {
  tr: {
    slug: 'nasil-calisir',
    meta: {
      title: 'Tercih ön kontrolü nasıl çalışır',
      description:
        'Kurgusal bir aday üzerinden dört adımda tercih ön kontrolü: profil, ÖSYM kılavuzundaki şartlar, gerekçeli ayrım ve insan kontrollü tek sayfalık rapor.',
    },
    notice:
      'Kurgusal aday, örnek analiz. Otomatik ya da canlı bir atama hizmeti değildir; nitelik uygunluğu atanma ihtimali anlamına gelmez.',
    kicker: 'Tercih ön kontrolü · nasıl çalışır',
    title: 'Tercih ön kontrolü dört adımda.',
    lede: 'Koç, öğrencilerin şartlarını kılavuzda tek tek aramak yerine kaynaklı bir ön inceleme alır. Anlatım 22 saniye sürer; istediğiniz yerde durdurabilirsiniz.',
    controls: {
      label: 'Anlatım kontrolleri',
      play: 'Oynat',
      pause: 'Durdur',
      prev: 'Önceki adım',
      next: 'Sonraki adım',
      step: 'Adım',
    },
    profile: {
      step: 'Profil',
      title: 'Danışanın bilgisi tek bir profil kartına girilir.',
      body: 'Örnekte kullanılan aday kurgusaldır. Kişisel veri yalnızca rıza ile ve rapor için gereken ölçüde işlenir.',
      badge: 'Kurgusal aday',
      fields: [
        { label: 'Öğrenim', value: 'Lisans' },
        { label: 'Bölüm', value: 'İşletme (örgün)' },
        { label: 'Puan', value: '2024-KPSS P3: 78,00' },
        { label: 'İstediği iller', value: '13 il' },
      ],
    },
    guide: {
      step: 'Kılavuz',
      title: 'Her kadronun şartı resmî kılavuzdan okunur.',
      body: 'ÖSYM her kadro için kabul ettiği bölümleri kodla yazar. Örnek kadro İşletme’yi 4431 koduyla kabul ediyor.',
      row: {
        code: 'ÖSYM 302010486',
        text: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı · Büro Personeli (sözleşmeli) · Ankara · 17 kadro',
        codes: 'Kabul edilen bölüm kodlarından biri: 4431',
        ref: 'Tablo 3, PDF s. 2',
      },
      def: {
        code: '4431',
        text: '4431 = İşletme bölümü mezunları',
        ref: 'Lisans nitelik kodları, PDF s. 6',
      },
      rules: [
        {
          text: 'Bölüm kodlarından biri yeter; varsa ek şartların hepsi aranır.',
          ref: 'Kılavuz, PDF s. 2 ve s. 12',
        },
      ],
    },
    sort: {
      step: 'Ayrım',
      title: 'Her kadro, gerekçesiyle üç gruptan birine ayrılır.',
      body: 'Kurgusal aday için 13 ildeki 513 kadro ÖSYM Tablo 3 ile karşılaştırıldı.',
      groups: { yes: 'Uygun', check: 'Kontrol gerekir', no: 'Uygun değil' },
      rows: [
        {
          group: 'yes',
          code: '302010486',
          text: 'Çevre, Şehircilik ve İklim Değişikliği Bak. · Büro Personeli · Ankara · 17',
          reason: 'Bölüm kabul ediliyor, ek şart yok.',
          ref: 'Tablo 3, PDF s. 2',
        },
        {
          group: 'check',
          code: '302012509',
          text: 'TCDD Taşımacılık A.Ş. · Memur · Ankara · 1',
          reason: 'Bölüm kabul ediliyor; ek bir şart (7368) kılavuzdan teyit edilmeli.',
          ref: 'Tablo 3, PDF s. 12 · Özel koşullar, PDF s. 5',
        },
        {
          group: 'no',
          code: '302010948',
          text: 'Çevre, Şehircilik ve İklim Değişikliği Bak. · Mühendis · Aksaray · 2',
          reason: 'Kadro İşletme bölümünü kabul etmiyor.',
          ref: 'Tablo 3, PDF s. 5',
        },
      ],
      totalsLabel: '13 ildeki 513 kadro',
    },
    report: {
      step: 'Rapor',
      title: 'Danışman, kaynaklı ve kontrol edilmiş tek sayfalık raporu alır.',
      body: 'Rapor danışmana gitmeden önce bir kişi tarafından kontrol edilir. Son kararı danışman ve aday verir.',
      lines: [
        'Kadro bazında grup ve gerekçe',
        'Her karar için kılavuz sayfası',
        'Kontrol gerektiren kadrolarda bakılacak şart',
      ],
      check:
        'İnsan kontrolü: örnek satırlar kılavuzla tek tek karşılaştırıldı; 39 kontrol, 0 uyumsuzluk.',
      caveat:
        'Uygun çıkmak atanmak demek değil: bu kadroya geçen dönem (2025/2) en düşük 80,71 puanla yerleşildi; örnek adayın puanı 78,00.',
      pdf: 'Örnek raporun tek sayfalık özeti',
    },
    sources: {
      title: 'Verinin kaynağı (ÖSYM, yayım 18.12.2025)',
      items: [
        { label: 'KPSS-2025/2 Tercih Kılavuzu', href: `${OSYM}tercih2_kilavuz_18122025.pdf` },
        { label: 'Tablo 3 (lisans kadroları)', href: `${OSYM}tablo3_lisans18122025.pdf` },
        { label: 'Lisans nitelik kodları', href: `${OSYM}lisansnitelik_18122025.pdf` },
        { label: 'Özel koşullar', href: `${OSYM}ozel_kosullar18122025.pdf` },
      ],
    },
    cta: {
      title: '15 dakika örneği birlikte inceleyelim',
      body: 'Tercih döneminde öğrencilerinizle nasıl çalıştığınızı konuşalım; bu raporun işinize yarayıp yaramadığını birlikte görelim.',
      label: '15 dakika örneği inceleyelim',
      subject: 'Tercih ön kontrolü: 15 dakikalık örnek görüşmesi',
      alt: 'ya da',
    },
  },
  en: {
    slug: 'how-it-works',
    meta: {
      title: 'How the placement pre-check works',
      description:
        'A placement pre-check in four steps, using a fictional candidate: profile, the conditions in ÖSYM’s guide, a reasoned grouping and a human-checked one-page report.',
    },
    notice:
      'Fictional candidate, sample analysis. This is not an automated or live placement service; meeting the qualifications is not the chance of being placed.',
    kicker: 'Placement pre-check · how it works',
    title: 'The placement pre-check in four steps.',
    lede: 'Instead of looking up each student’s conditions in the guide, the adviser gets a sourced pre-review. The walkthrough takes 22 seconds; pause it at any point.',
    controls: {
      label: 'Walkthrough controls',
      play: 'Play',
      pause: 'Pause',
      prev: 'Previous step',
      next: 'Next step',
      step: 'Step',
    },
    profile: {
      step: 'Profile',
      title: 'The candidate’s details go into a single profile card.',
      body: 'The candidate in this sample is fictional. Personal data is processed only with consent and only as far as the report needs.',
      badge: 'Fictional candidate',
      fields: [
        { label: 'Education', value: 'Bachelor’s degree' },
        { label: 'Field', value: 'Business Administration (on-campus)' },
        { label: 'Score', value: '2024-KPSS P3: 78.00' },
        { label: 'Preferred provinces', value: '13 provinces' },
      ],
    },
    guide: {
      step: 'Guide',
      title: 'Each post’s conditions come from the official guide.',
      body: 'ÖSYM lists the degrees each post accepts as codes. The sample post accepts Business Administration through code 4431.',
      row: {
        code: 'ÖSYM 302010486',
        text: 'Ministry of Environment, Urbanisation and Climate Change · Office staff (contract) · Ankara · 17 posts',
        codes: 'One of the accepted degree codes: 4431',
        ref: 'Table 3, PDF p. 2',
      },
      def: {
        code: '4431',
        text: '4431 = Business Administration graduates',
        ref: 'Bachelor’s qualification codes, PDF p. 6',
      },
      rules: [
        {
          text: 'One accepted degree code is enough; any extra conditions must all be met.',
          ref: 'Guide, PDF p. 2 and p. 12',
        },
      ],
    },
    sort: {
      step: 'Grouping',
      title: 'Each post lands in one of three groups, with the reason.',
      body: 'For the fictional candidate, 513 posts in 13 provinces were compared with ÖSYM Table 3.',
      groups: { yes: 'Eligible', check: 'Needs checking', no: 'Not eligible' },
      rows: [
        {
          group: 'yes',
          code: '302010486',
          text: 'Ministry of Environment, Urbanisation and Climate Change · Office staff · Ankara · 17',
          reason: 'The degree is accepted; no extra condition.',
          ref: 'Table 3, PDF p. 2',
        },
        {
          group: 'check',
          code: '302012509',
          text: 'TCDD Taşımacılık A.Ş. · Officer · Ankara · 1',
          reason:
            'The degree is accepted; one extra condition (7368) must be confirmed in the guide.',
          ref: 'Table 3, PDF p. 12 · Special conditions, PDF p. 5',
        },
        {
          group: 'no',
          code: '302010948',
          text: 'Ministry of Environment, Urbanisation and Climate Change · Engineer · Aksaray · 2',
          reason: 'The post does not accept Business Administration.',
          ref: 'Table 3, PDF p. 5',
        },
      ],
      totalsLabel: '513 posts in 13 provinces',
    },
    report: {
      step: 'Report',
      title: 'The adviser receives a sourced, checked one-page report.',
      body: 'A person checks the report before it reaches the adviser. The adviser and the candidate make the final decision.',
      lines: [
        'A group and a reason for each post',
        'The guide page behind each decision',
        'The condition to confirm for posts that need checking',
      ],
      check:
        'Human check: sample rows compared one by one with the guide; 39 checks, 0 mismatches.',
      caveat:
        'Eligible is not the same as placed: last period (2025/2) the lowest placed score for this post was 80.71; the sample candidate has 78.00.',
      pdf: 'One-page summary of the sample report',
    },
    sources: {
      title: 'Where the data comes from (ÖSYM, published 18.12.2025)',
      items: [
        { label: 'KPSS-2025/2 Placement Guide', href: `${OSYM}tercih2_kilavuz_18122025.pdf` },
        { label: 'Table 3 (bachelor’s posts)', href: `${OSYM}tablo3_lisans18122025.pdf` },
        { label: 'Bachelor’s qualification codes', href: `${OSYM}lisansnitelik_18122025.pdf` },
        { label: 'Special conditions', href: `${OSYM}ozel_kosullar18122025.pdf` },
      ],
    },
    cta: {
      title: 'Let’s look at the sample together for 15 minutes',
      body: 'Let’s talk about how you work with candidates during the preference period and see whether this report would help you.',
      label: 'Let’s review the sample for 15 minutes',
      subject: 'Placement pre-check: 15-minute sample review',
      alt: 'or',
    },
  },
};
