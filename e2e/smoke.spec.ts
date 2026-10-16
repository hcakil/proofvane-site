import { expect, test } from '@playwright/test';

test.describe('duman testi', () => {
  test('sayfa yüklenir, konsol hatası yok, h1 ve menü hedefleri var', async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') problems.push(msg.text());
    });
    page.on('pageerror', (err) => problems.push(err.message));

    const response = await page.goto('/');
    expect(response?.ok()).toBe(true);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/^Proofvane \| Yazılım stüdyosu/);

    const hrefs = await page
      .locator('nav[aria-label="Ana menü"] a')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const href of hrefs) {
      expect(href.startsWith('#')).toBe(true);
      await expect(page.locator(href)).toHaveCount(1);
    }

    await page.waitForLoadState('networkidle');
    expect(problems).toEqual([]);
  });

  test('menü bağlantıları ilgili bölüme gider', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('navigation', { name: 'Ana menü' })
      .getByRole('link', { name: 'İletişim' })
      .click();
    await expect(page).toHaveURL(/#iletisim$/);
    await expect(page.locator('#iletisim')).toBeInViewport();
  });

  test('iki tek sayfalık özet indirilebilir, kurumsal adres görünür', async ({ page, request }) => {
    await page.goto('/');
    const downloads = page.locator('[data-testid="demo-download"]');
    await expect(downloads).toHaveCount(2);
    for (const href of await downloads.evaluateAll((els) =>
      els.map((el) => el.getAttribute('href') ?? ''),
    )) {
      const res = await request.get(href);
      expect(res.ok()).toBe(true);
      expect(res.headers()['content-type']).toContain('pdf');
      expect((await res.body()).subarray(0, 5).toString()).toBe('%PDF-');
    }
    await expect(page.locator('#iletisim a[href="mailto:hello@proofvane.com"]')).toBeVisible();
    await expect(page.getByTestId('contact-fallback')).toHaveCount(0);
    await expect(page.getByText('Örnek çalışma · tek sayfalık özet')).toHaveCount(2);
  });

  test('favicon, manifest, robots ve sitemap sunuluyor', async ({ request }) => {
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

  test('atlama bağlantısı klavyeyle çalışır', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'İçeriğe geç' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });

  for (const scheme of ['light', 'dark'] as const) {
    test(`360px genişlikte yatay taşma yok (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.setViewportSize({ width: 360, height: 780 });
      await page.goto('/');
      const overflow = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(overflow.scroll).toBeLessThanOrEqual(overflow.client);
    });
  }
});
