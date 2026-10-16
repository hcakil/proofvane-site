import type { SiteText } from './types';

export const en: SiteText = {
  locale: 'en',
  htmlLang: 'en',
  ogLocale: 'en_GB',
  meta: {
    titleSuffix: 'Software engineering studio, Ankara',
    description:
      'A software engineering studio in Ankara, Türkiye: Flutter apps for iOS, Android and the web, API and backend development, data automation and source-referenced data verification.',
    ogImageAlt: 'Proofvane: software and data studio, Ankara',
  },
  a11y: {
    skip: 'Skip to content',
    mainNav: 'Main menu',
    footerNav: 'Footer menu',
    langNav: 'Language',
    langNames: { tr: 'Türkçe', en: 'English' },
  },
  nav: [
    { href: '#services', label: 'Services' },
    { href: '#method', label: 'Method' },
    { href: '#work', label: 'Sample work' },
    { href: '#contact', label: 'Contact' },
  ],
  hero: {
    title: 'Software that ships. Data that checks out.',
    lede: (brand, city) =>
      `${brand} is a software engineering studio in ${city}, Türkiye. We build Flutter apps for mobile and web, the APIs and data pipelines behind them, and verify every value against the source it comes from.`,
    primaryCta: 'Tell us about your project',
    secondaryCta: { href: '#work', label: 'See the work' },
    capabilities: [
      'Flutter: iOS, Android, web',
      'API and backend',
      'Data automation',
      'Source-referenced verification',
    ],
    visual: {
      label:
        'Representative product visualisation: a data pipeline, an API console and a Flutter app showing the same date discrepancy in a job listing.',
      caption:
        'Representative interface. The listing and the date discrepancy are real: Sample 2, sources compared on 13–14.10.2026.',
      pipeline: {
        title: 'listing-accuracy / pipeline',
        steps: [
          { label: 'Listings selected', value: '5', state: 'ok' },
          { label: 'Official sources', value: '3', state: 'ok' },
          { label: 'Field comparisons', value: '55', state: 'ok' },
          { label: 'Cross-source difference', value: '1', state: 'diff' },
        ],
      },
      console: {
        title: 'api / verify',
        lines: [
          { text: 'fetch  kariyerkapisi  listing/milli-saraylar' },
          { text: 'fetch  millisaraylar.gov.tr  DuyuruDetay/2243' },
          { text: 'match  application_end  S1 = S2', state: 'ok' },
          { text: 'match  application_end  S2 ≠ S3', state: 'diff' },
          { text: 'recheck  14.10.2026 21:14  unchanged' },
        ],
      },
      app: {
        title: 'Listings',
        listingTitle: 'Security and Protection Officer',
        listingMeta: 'National Palaces Administration, Istanbul, 80 posts',
        alertTitle: 'Application deadline differs between sources',
        alertRows: [
          { source: 'Kariyer Kapısı', value: '22.10.2026' },
          { source: 'Institution notice', value: '12–20 Oct 2026' },
        ],
        action: 'Confirm with the institution',
      },
    },
  },
  services: {
    title: 'Services',
    intro:
      'Documented work that small teams and organisations can maintain for years. The scope of every project is agreed in writing up front.',
    deliverablesLabel: 'Deliverables',
    stackLabel: 'Tools',
    items: [
      {
        id: 'flutter',
        title: 'Mobile apps with Flutter',
        body: 'iOS and Android from a single codebase. End-to-end development including offline mode, notifications, payments and store release; taking over an existing app works too.',
        deliverables: [
          'Store-ready iOS and Android builds',
          'Unit, widget and integration tests',
          'Error monitoring and release notes',
        ],
        stack: 'Flutter, Dart, Firebase, Crashlytics',
      },
      {
        id: 'web',
        title: 'Web applications',
        body: 'Admin panels, customer portals and internal tools. Accessible, fast-loading interfaces built with Flutter Web or TypeScript.',
        deliverables: [
          'Panel and portal interfaces',
          'Role-based access',
          'Automated tests and CI/CD',
        ],
        stack: 'TypeScript, Flutter Web, Vite',
      },
      {
        id: 'api',
        title: 'API and backend',
        body: 'APIs, background jobs and integrations. We can own your production environment, including monitoring, incident response and root-cause analysis.',
        deliverables: [
          'REST API and its documentation',
          'Data model and security rules',
          'Monitoring, alerts and an incident process',
        ],
        stack: 'Node.js, TypeScript, Firestore, Cloud Functions',
      },
      {
        id: 'automation',
        title: 'Data automation',
        body: 'We collect open, official or internal sources on a schedule and turn them into one shared structure. When a source changes format or becomes unreachable, it is logged and you are told.',
        deliverables: [
          'Scheduled collection and transformation jobs',
          'A health check for every source',
          'Documented schema; CSV, JSON or a database',
        ],
        stack: 'Python, SQLite, scheduled jobs',
      },
      {
        id: 'verification',
        title: 'Data verification and source-referenced reports',
        body: 'We compare your data with the official or internal source it relies on. A discrepancy is reported only when it can be shown in the source.',
        deliverables: [
          'Row-level report linked to sources',
          'Discrepancy list with evidence',
          'Separate list of records that could not be verified',
        ],
        stack: 'Python, PDF and HTML parsing, manual review',
      },
    ],
  },
  method: {
    title: 'How we work',
    intro: 'We start small and move forward with your approval at each step.',
    steps: [
      {
        title: 'Small scope',
        body: 'We start with one screen, one integration or one data source. What will be delivered is agreed in writing.',
      },
      {
        title: 'A concrete sample',
        body: 'A small working build for software, a source-referenced sample for data work. You can try the result yourself.',
      },
      {
        title: 'Approved pilot',
        body: 'Once you approve the sample, we run a time-boxed pilot. Scope and ways of working settle here.',
      },
      {
        title: 'Regular delivery',
        body: 'Delivery on an agreed rhythm. Each delivery lists what was done, open questions and known gaps.',
      },
    ],
    principles: [
      {
        id: 'principle-source',
        title: 'Show the source',
        body: 'Every claim, including every discrepancy, is delivered together with the source it relies on.',
      },
      {
        id: 'principle-review',
        title: 'Human review',
        body: 'Automation collects and compares; a person reviews the results before delivery.',
      },
      {
        id: 'principle-data',
        title: 'Minimal data',
        body: 'Only the data the work needs is processed; its purpose and retention are agreed up front (GDPR and KVKK).',
      },
      {
        id: 'principle-owner',
        title: 'One owner',
        body: 'The studio is run by a senior software engineer; the same person follows your work from start to finish.',
      },
    ],
  },
  work: {
    title: 'Selected work',
    intro:
      'Two data-verification projects built on official Turkish public-sector data. The interfaces are representative; every value inside them comes from the verified one-page summary.',
    downloadNote: 'PDF, 1 page',
    pendingNote: 'Summary coming soon.',
    representative: 'Representative interface, verified data',
    problemLabel: 'Problem',
    approachLabel: 'Approach',
    outcomeLabel: 'Outcome',
    items: [
      {
        id: 'listing',
        title: 'Job-listing data accuracy audit: Kariyer Kapısı',
        body: 'Eleven fields of one position from each of five open listings were compared across three official sources.',
        tags: ['Data verification', 'HTML and PDF parsing', 'OCR', 'Python'],
        problem:
          'The same listing appears in the structured fields of Kariyer Kapısı (Türkiye’s official job portal), in the listing text and in the institution’s own notice. These sources do not always agree.',
        approach:
          'Every field was recorded with a verbatim quote from each of the three sources, and a script re-checked each quote against the source text on every build. A difference was reported only when it could be shown in the source.',
        outcome:
          'Of 55 comparisons, 46 were consistent, 6 were not in the source, 2 needed interpretation and 1 was a real difference: the application deadline of the National Palaces listing.',
        chartTitle: '55 comparisons (5 positions, 11 fields), by result',
        chartUnit: 'comparisons',
        segments: [
          { key: 'same', label: 'Consistent', value: 46 },
          { key: 'interp', label: 'Needs interpretation', value: 2 },
          { key: 'missing', label: 'Not in source', value: 6 },
          { key: 'diff', label: 'Different', value: 1 },
        ],
        facts: [
          { value: '22 Oct', label: 'application deadline on Kariyer Kapısı' },
          { value: '12–20 Oct', label: 'application window in the institution’s own notice' },
        ],
        ui: {
          kind: 'sources',
          window: 'listing-accuracy / milli-saraylar',
          heading: 'Application end date, three sources',
          rows: [
            {
              id: 'S1',
              label: 'Kariyer Kapısı structured field',
              value: '2026-10-22T23:59:00',
              state: 'same',
            },
            {
              id: 'S2',
              label: 'Kariyer Kapısı listing text',
              value: '“…close on 22.10.2026.”',
              state: 'same',
            },
            {
              id: 'S3',
              label: 'Institution notice',
              value: '“…between 12 and 20 October 2026…”',
              state: 'diff',
            },
          ],
          verdict:
            'Different. Re-checked on 14.10.2026 at 21:14; none of the three sources had changed.',
        },
        pdf: 'proofvane-sample-listing-accuracy-en.pdf',
        pdfLabel: 'Download the one-page summary',
        source:
          'Sources read on 13.10.2026; the difference was re-checked on 14.10.2026. Contains no personal data.',
      },
      {
        id: 'placement',
        title: 'Placement eligibility pre-check: ÖSYM KPSS-2025/2',
        body: 'For a fictional candidate profile, every post row in 13 provinces was matched against the qualification codes.',
        tags: ['Rules engine', 'PDF table parsing', 'Human verification'],
        problem:
          'Which of hundreds of public-sector post rows a candidate may apply for depends on interlocking qualification codes and a combination rule buried in the official placement guide.',
        approach:
          'All 990 rows of Table 3 were parsed; codes were matched with the guide’s OR/AND rule, quoting page numbers. Thirteen rows were checked by hand against page images.',
        outcome:
          'Of 513 posts, 78 were eligible, 74 needed an extra check and 361 were not eligible. 39 visual checks, 0 mismatches; 0 missing rows.',
        chartTitle: '513 posts in 13 provinces, by eligibility',
        chartUnit: 'posts',
        segments: [
          { key: 'yes', label: 'Eligible', value: 78 },
          { key: 'check', label: 'Needs checking', value: 74 },
          { key: 'no', label: 'Not eligible', value: 361 },
        ],
        facts: [
          { value: '990', label: 'Table 3 rows parsed, 0 missing' },
          { value: '39', label: 'visual checks, 0 mismatches' },
        ],
        ui: {
          kind: 'eligibility',
          window: 'placement-precheck / 13 provinces',
          heading: 'Sample row: ÖSYM code 302010486',
          detail: [
            {
              label: 'Institution',
              value: 'Ministry of Environment, Urbanisation and Climate Change',
            },
            { label: 'Post', value: 'Contract staff / Office staff, Ankara, 17 posts' },
            {
              label: 'Qualification',
              value: 'Business Administration is covered by code 4431; no extra condition',
            },
            { label: '2025/2 lowest score', value: '80.71056 (historical; not a forecast)' },
          ],
          verdict: 'Eligible',
        },
        pdf: 'proofvane-sample-placement-precheck-en.pdf',
        pdfLabel: 'Download the one-page summary',
        source:
          'Source: ÖSYM Placement Guide and Table 3 (18.12.2025). Fictional profile; not a forecast.',
      },
    ],
  },
  contact: {
    title: 'Next step',
    body: 'Write a few sentences about the app, integration or data work you have in mind. We agree the scope together in a first call.',
    cta: 'Send an email',
    emailLabel: 'Projects and quotes',
    partnershipsLabel: 'Partnerships',
    fallback: 'Contact address coming soon.',
  },
  footer: {
    legal: (brand, legalName) => `${brand} is a brand of ${legalName}.`,
    place: 'Ankara, Türkiye',
  },
};
