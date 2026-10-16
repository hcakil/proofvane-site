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
    notesLabel: 'Margin notes',
    noteRef: (n) => `Note ${n}`,
  },
  nav: [
    { href: '#services', label: 'Services' },
    { href: '#method', label: 'Method' },
    { href: '#work', label: 'Sample work' },
    { href: '#contact', label: 'Contact' },
  ],
  hero: {
    title: [
      { text: 'Working software,', note: 1 },
      { text: ' traceable data,', note: 2 },
      { text: ' written handover.', note: 3 },
    ],
    notes: [
      'Flutter for iOS, Android and the web, including the API and backend behind it. Maintenance continues after launch.',
      'Every data row links to the source it relies on. Anything the source cannot show is marked “could not be verified”.',
      'Source code lives in your repository, with tests and CI. What was delivered is written down every time.',
    ],
    lede: (brand, city) =>
      `${brand} is a software engineering studio in ${city}, Türkiye. We build mobile and web products, take responsibility for production, and verify your data against its sources.`,
    primaryCta: 'Tell us about your project',
    secondaryCta: { href: '#work', label: 'See sample work' },
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
    title: 'Sample work',
    intro:
      'Two examples of data-quality work, prepared on Turkish public-sector data. The figures in the charts are the verified results from the downloadable one-page summaries. The full report is shared in a call.',
    downloadNote: 'PDF, 1 page',
    pendingNote: 'Summary coming soon.',
    items: [
      {
        id: 'placement',
        title: 'Placement eligibility pre-check: ÖSYM KPSS-2025/2',
        body: 'For a fictional candidate profile, every post row in 13 provinces was matched one by one against the qualification codes in the official guide. Each row cites the official document and page number.',
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
        pdf: 'proofvane-sample-placement-precheck-en.pdf',
        pdfLabel: 'Download summary',
        source:
          'Source: ÖSYM Placement Guide and Table 3 (18.12.2025). Fictional profile; not a forecast.',
      },
      {
        id: 'listing',
        title: 'Job-listing data accuracy audit: Kariyer Kapısı',
        body: 'Eleven fields of one position from each of five open listings were compared across three official sources. A difference was reported only when it could be shown with a verbatim quote from the source.',
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
        pdf: 'proofvane-sample-listing-accuracy-en.pdf',
        pdfLabel: 'Download summary',
        source:
          'Sources read on 13.10.2026; the difference was re-checked on 14.10.2026. Contains no personal data.',
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
