import type { SiteText } from './types';
import { PAGES } from './pages-en';

export const en: SiteText = {
  locale: 'en',
  htmlLang: 'en',
  ogLocale: 'en_GB',
  meta: {
    titleSuffix: 'Independent software engineering studio',
    description:
      'Proofvane is an independent software engineering studio in Ankara, Türkiye. We build Flutter mobile apps for iOS and Android, web applications, backends, APIs and integrations, with automated tests, CI/CD and monitoring.',
    ogImageAlt: 'Proofvane: independent software engineering studio, Ankara',
  },
  a11y: {
    skip: 'Skip to content',
    mainNav: 'Main menu',
    footerNav: 'Footer menu',
    langNav: 'Language',
    langNames: { tr: 'Türkçe', en: 'English' },
    menu: 'Menu',
    theme: { label: 'Theme', system: 'System', light: 'Light', dark: 'Dark' },
  },
  nav: [
    { href: '#work', label: 'Work' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Independent software engineering studio · Ankara',
    title: 'Software that works beyond the demo.',
    lede: (brand) =>
      `${brand} designs and builds mobile apps, web applications, and the APIs and systems behind them: tested, monitored and ready for real users, weak networks and the next release.`,
    primaryCta: 'Start a project',
    secondaryCta: { href: '#work', label: 'See how we build' },
    capabilities: [
      { id: 'mobile', label: 'Mobile', detail: 'Flutter · iOS · Android' },
      { id: 'web', label: 'Web', detail: 'Apps, portals, admin panels' },
      { id: 'api', label: 'Backend & API', detail: 'Services and integrations' },
      { id: 'reliability', label: 'Reliability', detail: 'Tests · CI/CD · monitoring' },
      { id: 'data', label: 'Data', detail: 'Automation and verification' },
    ],
    process: {
      label:
        'Representative process visual: a mobile app, a web panel and the backend behind them are designed, built, tested and released, one step after another.',
      caption: 'Representative visual: the four stages of a project.',
      steps: [
        { id: 'design', label: 'Design', detail: 'Screens and flows' },
        { id: 'build', label: 'Build', detail: 'Mobile, web, backend' },
        { id: 'test', label: 'Test', detail: 'Automated tests' },
        { id: 'ship', label: 'Release', detail: 'Stores and servers' },
      ],
      scene: {
        web: 'Web panel',
        mobile: 'Mobile app',
        backend: 'Backend',
        checks: ['iOS', 'Android', 'Web'],
        live: 'Live',
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
  showcases: {
    mobile: {
      index: '01',
      kicker: 'Mobile engineering · Application reliability',
      title: 'Every release passes the same gate.',
      body: 'We build Flutter apps for iOS and Android together with the pipeline that ships them: analysis and tests on every change, integration tests on both platforms, signed builds, and a staged rollout that stops when crash reports rise.',
      status:
        'Capability demonstration, not a customer project. The pipeline is a simulation that runs in your browser.',
      points: [
        'Unit, widget and integration tests on every pull request',
        'Integration runs on iOS and Android targets',
        'Store builds signed in CI, never on a laptop',
        'Staged rollout with a crash-rate gate and rollback',
        'Offline-first data with a retry queue',
      ],
      stack: 'Flutter, Dart, GitHub Actions, Fastlane, Firebase Crashlytics',
      demoToggle: 'Technical detail: how does an offline-capable app sync? (interactive)',
      demo: {
        label:
          'Interactive concept: in a mobile maintenance app a task is marked done; the request passes through an API, a job queue and a database, and a notification is sent. You can switch the phone offline to see requests wait in an on-device queue.',
        caption:
          'Concept demo, not a customer project. It runs in your browser; no data leaves the page.',
        app: {
          title: 'Today',
          subtitle: 'Maintenance crew · Block B',
          tasks: [
            { id: '118', title: 'Check lift motor room', meta: 'Floor −1 · 09:30' },
            { id: '124', title: 'Replace corridor lighting', meta: 'Floor 4 · 11:00' },
            { id: '131', title: 'Fire door inspection', meta: 'Stairwell · 14:00' },
          ],
          action: 'Done',
          synced: 'Synced',
          queued: 'Waiting for network',
          online: 'Online',
          offline: 'Offline',
        },
        nodes: [
          { id: 'api', label: 'API', detail: 'POST /v1/tasks/:id/complete' },
          { id: 'queue', label: 'Job queue', detail: 'retries with backoff' },
          { id: 'db', label: 'Database', detail: 'idempotent write' },
          { id: 'push', label: 'Notifications', detail: 'APNs · FCM' },
        ],
        controls: {
          networkOff: 'Go offline',
          networkOn: 'Back online',
          reset: 'Reset',
          hint: 'Tap “Done” on a task.',
        },
        log: {
          title: 'Event log',
          idle: 'Waiting for an action.',
          optimistic: '{task}: done on the device first',
          request: 'POST /v1/tasks/{id}/complete · Idempotency-Key {key}',
          accepted: 'API 202 · job queued',
          stored: 'Worker saved it once; repeats are ignored',
          notified: 'Notification sent to the crew lead',
          offline: 'No network: request kept in the on-device queue',
          reconnect: 'Network back: sending {n} queued request(s)',
        },
      },
      pipeline: {
        window: 'release / v2.4.0',
        stages: [
          { id: 'analyze', label: 'Analyze', detail: 'dart analyze · lints' },
          { id: 'unit', label: 'Unit tests', detail: 'domain and sync logic' },
          { id: 'widget', label: 'Widget tests', detail: 'screens and states' },
          { id: 'integration', label: 'Integration', detail: 'iOS · Android' },
          { id: 'build', label: 'Build & sign', detail: 'IPA · AAB' },
          { id: 'rollout', label: 'Staged rollout', detail: 'health gate' },
        ],
        failAt: 'widget',
        run: 'Run a release',
        regress: 'Introduce a regression',
        idle: 'Ready. Choose a run.',
        running: 'Running…',
        passed: 'Released to all users after the health gate.',
        blocked: 'Stopped at widget tests. Nothing reached users.',
        failure: 'SyncBadge shows “Waiting for network”; expected “Synced”.',
        rolloutLabel: 'Rollout',
        rollout: ['Internal', '10%', '50%', 'All users'],
        gate: 'Crash-rate gate passed',
      },
    },
    systems: {
      index: '02',
      kicker: 'Backend · Integrations · Automation',
      title: 'Pipelines that read messy sources and stay honest.',
      body: 'For our data reviews we built collectors for official HTML pages, PDF tables and scanned documents, one shared schema for every source, and a check that re-reads each quoted value against its source on every build. The same approach runs integrations and background jobs behind apps.',
      status: 'Real project. The figures come from the published one-page summaries below.',
      flow: [
        { label: 'Collect', detail: 'HTML · PDF · OCR' },
        { label: 'Parse', detail: 'tables into rows' },
        { label: 'Normalise', detail: 'one shared schema' },
        { label: 'Compare', detail: 'rules with page references' },
        { label: 'Review', detail: 'a person signs off' },
        { label: 'Report', detail: 'source-linked PDF' },
      ],
      facts: [
        { value: '990', label: 'table rows parsed, 0 missing' },
        { value: '3', label: 'official sources compared per record' },
        { value: '55', label: 'field comparisons, each with a verbatim quote' },
      ],
      stack: 'Python, TypeScript, SQLite, scheduled jobs',
    },
  },
  work: {
    index: '03',
    kicker: 'Data validation',
    status: 'Real projects. Each summary is a one-page PDF.',
    title: 'Two data reviews you can download',
    intro:
      'Built on official Turkish public-sector data. The interfaces are representative; every value inside them comes from the verified one-page summary.',
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
  solutions: {
    index: '03',
    kicker: 'Sector solutions',
    title: 'Two services for teams that work with public-sector data.',
    intro:
      'We are exploring two services that apply the same engineering approach for advisers and publishers who work with official guides and job listings in Türkiye. Both are based on a real sample project.',
    more: 'See how it works',
  },
  solutionsPath: 'solutions',
  pages: PAGES,
  notFound: {
    title: 'Page not found',
    body: 'The address may have moved or may never have existed.',
    home: 'Back to the home page',
  },
  contact: {
    title: 'Next step',
    body: 'Write a few sentences about the app, integration or data work you have in mind. We agree the scope together in a first call.',
    cta: 'Send an email',
    phoneLabel: 'Phone',
    emailLabel: 'Projects and quotes',
    partnershipsLabel: 'Partnerships',
    fallback: 'Contact address coming soon.',
  },
  footer: {
    legal: (brand, legalName) => `${brand} is a brand of ${legalName}.`,
    place: 'Ankara, Türkiye',
  },
};
