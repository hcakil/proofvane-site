import type { SolutionPage } from './types';

/**
 * English solution pages. Figures come from the verified samples in `en.ts`.
 * Rules: no claim of a live product, qualification is never presented as a
 * chance of placement, no publisher is said to be wrong.
 */
export const PAGES: Record<SolutionPage['key'], SolutionPage> = {
  precheck: {
    key: 'precheck',
    slug: 'placement-precheck',
    demoId: 'placement',
    meta: {
      title: 'KPSS placement pre-check for advisers',
      description:
        'A reasoned, source-referenced pre-check report that compares a candidate’s education with the qualification conditions in ÖSYM’s placement guide and groups posts as eligible, needs checking or not eligible. Delivered with human review.',
    },
    audience: 'For KPSS placement advisers and exam-prep institutions in Türkiye',
    title: 'Which posts can your candidate apply for? With the reason and the source.',
    lede: 'We compare a candidate’s education with the qualification conditions in ÖSYM’s placement guide and sort posts into three groups: eligible, needs checking and not eligible. Every decision shows its basis in the guide, and a person checks the result before it reaches you.',
    notice:
      'This is not an app or an automated system; it is a service we are considering offering with controlled human review. Meeting the qualifications is not the same as the chance of being placed.',
    cta: {
      label: 'Let’s talk through the sample for 15 minutes',
      subject: 'Placement pre-check: talk through the sample',
    },
    pdfCta: 'One-page summary of the sample report',
    problem: {
      title: 'The problem',
      body: 'The placement guide contains hundreds of post rows and interlocking qualification codes. Working out, row by row, which posts a candidate qualifies for takes time; a single missed code can point a candidate to a post they cannot take, or hide one they can.',
    },
    steps: {
      title: 'How it works',
      items: [
        {
          title: 'Candidate profile',
          body: 'The candidate’s degree, education level, score type and any extra qualifications. The sample used a fictional candidate profile.',
        },
        {
          title: 'Comparison with the guide',
          body: 'The qualification codes on each post row are matched against the profile using the guide’s AND/OR rule, and the guide page is recorded as the basis.',
        },
        {
          title: 'Three groups and a human check',
          body: 'Posts are grouped as eligible, needs checking or not eligible. Sample rows are checked by hand against the guide pages before the report goes to the adviser.',
        },
      ],
    },
    demo: {
      title: 'Real sample: KPSS-2025/2, 13 provinces',
      body: 'For a fictional candidate, 513 posts in 13 provinces were compared with the conditions in ÖSYM Table 3.',
      note: 'Fictional profile; not a forecast. Figures come from the verified one-page summary.',
    },
    checks: {
      title: 'What the report contains',
      intro: 'The adviser pre-check report shows why each post landed in its group:',
      items: [
        'A group for each post: eligible, needs checking, not eligible',
        'The reason for each decision: which qualification code was or was not met',
        'The basis in the guide: table and page reference',
        'For posts that need checking, what has to be confirmed',
        'Where available, the previous period’s lowest score, as information rather than a forecast',
      ],
    },
    limits: {
      title: 'What it does not cover',
      items: [
        'It does not estimate the chance of placement or predict scores.',
        'It does not predict competition for posts or ÖSYM’s placement result.',
        'Candidates submit their preferences to ÖSYM themselves.',
        'Personal data is processed only as far as the report needs, and with your agreement.',
      ],
    },
    closing: {
      title: 'Let’s talk through the sample',
      body: 'In 15 minutes we can look at how you work with candidates during the preference period and whether this report would save you time. Scope and price follow from that conversation.',
    },
  },
  listing: {
    key: 'listing',
    slug: 'listing-verification',
    demoId: 'listing',
    meta: {
      title: 'Public job listing verification for publishers',
      description:
        'A human-reviewed service that compares the Kariyer Kapısı fields, the listing text and the institution’s own notice for the same public-sector job listing, field by field, and flags differences with a quote from each source.',
    },
    audience: 'For job-listing publishers, career sites and apps in Türkiye',
    title: 'Do a listing’s official sources say the same thing?',
    lede: 'The same public-sector listing can appear with different details in the structured fields of Kariyer Kapısı, in the listing text and in the institution’s own notice. We compare the sources field by field, flag differences with a quote from each source and put them to human review before you publish.',
    notice:
      'We are considering offering this as a service; early work is checked by hand. A difference does not mean one source is wrong; it shows the point that needs confirming.',
    cta: {
      label: 'Let’s review your listing process together',
      subject: 'Listing verification: process conversation',
    },
    pdfCta: 'One-page summary of the sample audit',
    problem: {
      title: 'The problem',
      body: 'A public-sector listing is often published in more than one official source. The application deadline, number of posts or requirements may not be written the same way in each. Deciding which one to rely on means opening and comparing the sources one by one.',
    },
    steps: {
      title: 'How it works',
      items: [
        {
          title: 'The listing',
          body: 'We identify the official sources where it appears: the structured Kariyer Kapısı fields, the listing text and the institution’s own notice.',
        },
        {
          title: 'Source comparison',
          body: 'Each field is looked up in all three sources and recorded with a verbatim quote. The quotes are re-checked against the source text on every build.',
        },
        {
          title: 'Flagging the difference',
          body: 'Where sources differ, what each one says is shown side by side, and the difference goes to human review before publication.',
        },
      ],
    },
    demo: {
      title: 'Real sample: 5 listings, 3 sources, 55 comparisons',
      body: 'One position was taken from each of five open listings by different institutions, and 11 fields were compared across three official sources. One field showed a real difference between sources: the application deadline.',
      note: 'Sources read on 13.10.2026; the difference was re-checked on 14.10.2026. Contains no personal data.',
    },
    checks: {
      title: 'Which fields we check',
      intro: 'In the sample audit, these 11 fields were compared for each position:',
      items: [
        'Institution',
        'Job title',
        'Province and number of posts',
        'Application start date',
        'Application deadline',
        'KPSS year, score type and minimum score',
        'Education and field of study',
        'Age requirement',
        'Documents, certificates and licences',
        'Selection method',
        'Where to apply',
      ],
    },
    limits: {
      title: 'What it does not cover',
      items: [
        'It does not decide that a source or publisher is wrong; it shows the difference with its source.',
        'It does not replace the institution’s official announcement; for certainty, confirming with the institution is recommended.',
        'It is not yet an automated, continuously running product; scope and frequency are agreed together.',
      ],
    },
    closing: {
      title: 'Let’s review your listing process',
      body: 'Let’s talk about how you compile listings today and how you decide when sources disagree. If it fits, we can run a small sample on listings you choose.',
    },
  },
};
