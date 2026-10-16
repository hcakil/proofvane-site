import { expect, test } from '@playwright/test';

for (const locale of ['tr', 'en'] as const) {
  test.describe(`/${locale}/`, () => {
    test('yüklenir; konsol hatası yok; h1 ve menü hedefleri var', async ({ page }) => {
      const problems: string[] = [];
      page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
      page.on('pageerror', (e) => problems.push(e.message));
      const res = await page.goto(`/${locale}/`);
      expect(res?.ok()).toBe(true);
      await expect(page).toHaveURL(new RegExp(`/${locale}/$`));
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveCount(1);
      const hrefs = await page
        .locator('nav.primary-nav a')
        .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
      expect(hrefs).toHaveLength(4);
      for (const href of hrefs) await expect(page.locator(href)).toHaveCount(1);
      await page.waitForLoadState('networkidle');
      expect(problems).toEqual([]);
    });

    test('iki tek sayfalık özet doğru dilde ve PDF olarak iner', async ({ page, request }) => {
      await page.goto(`/${locale}/`);
      const links = page.locator('[data-testid="demo-download"]');
      await expect(links).toHaveCount(2);
      for (const href of await links.evaluateAll((els) =>
        els.map((el) => (el as HTMLAnchorElement).href),
      )) {
        expect(href.endsWith('-en.pdf')).toBe(locale === 'en');
        const res = await request.get(href);
        expect(res.ok(), href).toBe(true);
        expect(res.headers()['content-type']).toContain('pdf');
        expect((await res.body()).subarray(0, 5).toString()).toBe('%PDF-');
      }
    });

    test('iletişim CTA mailto ve kurumsal adresler görünür', async ({ page }) => {
      await page.goto(`/${locale}/`);
      await expect(page.locator('.hero a.button-primary')).toHaveAttribute(
        'href',
        'mailto:hello@proofvane.com',
      );
      await expect(
        page.locator('#contact a[href="mailto:hello@proofvane.com"]').first(),
      ).toBeVisible();
      await expect(
        page.locator('#contact a[href="mailto:partnerships@proofvane.com"]'),
      ).toBeVisible();
    });

    test('klavye: atlama bağlantısı ilk odak, içerik odağı alır, ikincil CTA çalışmalara gider', async ({
      page,
    }) => {
      await page.goto(`/${locale}/`);
      await page.keyboard.press('Tab');
      const skip = page.locator('.skip-link');
      await expect(skip).toBeFocused();
      await expect(skip).toBeInViewport();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#content$/);
      // İkinci kontrol temiz bir yüklemede: önceki yumuşak kaydırma devam ederken başlamasın.
      await page.goto(`/${locale}/`);
      await page.locator('.hero .button-ghost').focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#work$/);
      // Yumuşak kaydırma bitene kadar bekle: bölümün üstü görünür alana gelmeli.
      await expect
        .poll(
          () => page.evaluate(() => document.querySelector('#work')!.getBoundingClientRect().top),
          {
            timeout: 8000,
          },
        )
        .toBeLessThan(200);
    });

    for (const scheme of ['light', 'dark'] as const) {
      for (const width of [360, 390, 768, 1440]) {
        test(`${width}px ${scheme}: yatay taşma yok`, async ({ page }) => {
          await page.emulateMedia({ colorScheme: scheme });
          await page.setViewportSize({ width, height: 800 });
          await page.goto(`/${locale}/`);
          const o = await page.evaluate(() => ({
            s: document.documentElement.scrollWidth,
            c: document.documentElement.clientWidth,
          }));
          expect(o.s).toBeLessThanOrEqual(o.c);
        });
      }
    }
  });
}

test('favicon, manifest, robots, sitemap ve OG görseli sunuluyor', async ({ request }) => {
  for (const path of [
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/site.webmanifest',
    '/robots.txt',
    '/sitemap.xml',
    '/og-image.png',
  ]) {
    const res = await request.get(path);
    expect(res.ok(), path).toBe(true);
  }
});
