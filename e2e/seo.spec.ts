import { expect, test } from '@playwright/test';

const TITLES = {
  tr: 'Proofvane | Yazılım mühendisliği stüdyosu, Ankara',
  en: 'Proofvane | Software engineering studio, Ankara',
} as const;

for (const l of ['tr', 'en'] as const) {
  test(`/${l}/: title, description, canonical, hreflang, Open Graph`, async ({ page }) => {
    await page.goto(`/${l}/`);
    await expect(page).toHaveTitle(TITLES[l]);
    const head = page.locator('head');
    await expect(head.locator('meta[name="description"]')).toHaveAttribute('content', /.{80,}/);
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://proofvane.com/${l}/`,
    );
    const alternates: [string, string][] = [
      ['tr', 'https://proofvane.com/tr/'],
      ['en', 'https://proofvane.com/en/'],
      ['x-default', 'https://proofvane.com/'],
    ];
    for (const [hl, href] of alternates) {
      await expect(head.locator(`link[rel="alternate"][hreflang="${hl}"]`)).toHaveAttribute(
        'href',
        href,
      );
    }
    await expect(head.locator('meta[property="og:locale"]')).toHaveAttribute(
      'content',
      l === 'tr' ? 'tr_TR' : 'en_GB',
    );
    await expect(head.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `https://proofvane.com/${l}/`,
    );
    await expect(head.locator('meta[property="og:title"]')).toHaveAttribute('content', TITLES[l]);
    await expect(head.locator('meta[name="robots"]')).toHaveCount(0);
  });
}

test('sitemap iki dili hreflang ile listeler', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  for (const l of ['tr', 'en']) expect(xml).toContain(`<loc>https://proofvane.com/${l}/</loc>`);
  expect(xml.match(/hreflang="x-default"/g)).toHaveLength(2);
});
