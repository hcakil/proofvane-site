import { expect, test } from '@playwright/test';

const SOLUTIONS = [
  { tr: '/tr/cozumler/tercih-on-kontrol/', en: '/en/solutions/placement-precheck/' },
  { tr: '/tr/cozumler/ilan-dogrulama/', en: '/en/solutions/listing-verification/' },
] as const;

for (const pair of SOLUTIONS) {
  for (const l of ['tr', 'en'] as const) {
    const path = pair[l];
    test(`${path}: yüklenir, CTA, PDF, telefon; konsol hatası yok`, async ({ page, request }) => {
      const problems: string[] = [];
      page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
      page.on('pageerror', (e) => problems.push(e.message));
      const res = await page.goto(path);
      expect(res?.ok()).toBe(true);
      await expect(page.locator('html')).toHaveAttribute('lang', l);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('[data-testid="solution-cta"]')).toHaveAttribute(
        'href',
        /^mailto:hello@proofvane\.com\?subject=/,
      );
      const pdf = page.locator('.sol-hero [data-testid="demo-download"]');
      const href = await pdf.evaluate((el) => (el as HTMLAnchorElement).href);
      expect(href.endsWith('-en.pdf')).toBe(l === 'en');
      const r = await request.get(href);
      expect(r.headers()['content-type']).toContain('pdf');
      await expect(page.locator('#contact a[href="tel:+905421546037"]')).toBeVisible();
      await page.waitForLoadState('networkidle');
      expect(problems).toEqual([]);
    });

    test(`${path}: dil seçici karşı dildeki aynı sayfaya gider`, async ({ page }) => {
      await page.goto(path);
      const other = l === 'tr' ? 'en' : 'tr';
      await page.locator(`header nav.lang a[data-locale="${other}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${pair[other].replace(/\//g, '\\/')}$`));
    });

    for (const width of [390, 1440]) {
      test(`${path} ${width}px: yatay taşma yok`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const o = await page.evaluate(() => ({
          s: document.documentElement.scrollWidth,
          c: document.documentElement.clientWidth,
        }));
        expect(o.s).toBeLessThanOrEqual(o.c);
      });
    }
  }
}

test('ana sayfa çözüm kartları çözüm sayfalarını açar', async ({ page }) => {
  await page.goto('/tr/');
  await page.locator('#solutions a.button-primary').first().click();
  await expect(page).toHaveURL(/\/tr\/cozumler\/tercih-on-kontrol\/$/);
});

test.describe('tema', () => {
  test('sistem modunda cihaz tercihini izler ve değişince uyar', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/tr/');
    const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const light = await bg();
    await expect(page.locator('[data-theme-choice="system"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect.poll(bg).not.toBe(light);
    expect(await page.locator('html').getAttribute('data-theme')).toBeNull();
  });

  test('elle seçim kalıcıdır ve cihaz tercihini geçersiz kılar', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/tr/');
    await page.locator('[data-theme-choice="dark"]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.goto('/en/solutions/placement-precheck/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('[data-theme-choice="dark"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await page.locator('[data-theme-choice="light"]').click();
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.locator('[data-theme-choice="system"]').click();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/);
    expect(await page.evaluate(() => localStorage.getItem('proofvane.theme'))).toBeNull();
  });
});

test.describe('mobil menü', () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test('açılır, bağlantı tıklanınca kapanır, Escape ile kapanır', async ({ page }) => {
    await page.goto('/tr/');
    const toggle = page.locator('[data-menu-toggle]');
    const nav = page.locator('nav.primary-nav');
    await expect(toggle).toBeVisible();
    await expect(nav).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(nav).toBeVisible();
    await expect(page.locator('.site-menu .theme')).toBeVisible();
    await nav.locator('a[href="#services"]').click();
    await expect(nav).toBeHidden();
    await expect(page).toHaveURL(/#services$/);
    await toggle.click();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });
});

test('404 sayfası iki dilli ve stilleri yüklü', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('h1')).toHaveText('404');
  await expect(page.locator('a[href="/tr/"]')).toBeVisible();
  await expect(page.locator('a[href="/en/"]')).toBeVisible();
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(font).toContain('Geist');
});

test('ilk ekranda teknik ayrıntı görünmez; isteğe bağlı demo kapalı', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('.hero code')).toHaveCount(0);
  await expect(page.locator('details.tech')).not.toHaveAttribute('open', /.*/);
  await expect(page.locator('[data-demo="sync"]')).toBeHidden();
  await page.locator('details.tech > summary').click();
  await expect(page.locator('[data-demo="sync"]')).toBeVisible();
});

for (const [l, path] of [
  ['tr', '/tr/cozumler/tercih-on-kontrol/nasil-calisir/'],
  ['en', '/en/solutions/placement-precheck/how-it-works/'],
] as const) {
  test.describe(`nasıl çalışır ${l}`, () => {
    test('kendiliğinden ilerler, durdurulur, adımlar arasında gezilir', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const problems: string[] = [];
      page.on('pageerror', (e) => problems.push(e.message));
      await page.goto(path);
      const active = page.locator('.wt-scene.is-active');
      await expect(active).toHaveAttribute('data-scene', '0');
      await page.locator('.wt-stage').scrollIntoViewIfNeeded();
      await expect(active).toHaveAttribute('data-scene', '1', { timeout: 8000 });
      await page.locator('[data-wt-toggle]').click();
      await expect(page.locator('[data-wt-toggle]')).toHaveAttribute('aria-pressed', 'false');
      await page.waitForTimeout(6000);
      await expect(active).toHaveAttribute('data-scene', '1');
      await page.locator('[data-wt-go="3"]').click();
      await expect(active).toHaveAttribute('data-scene', '3');
      await page.locator('[data-wt-prev]').click();
      await expect(active).toHaveAttribute('data-scene', '2');
      await expect(page.locator('.wt-scene.is-active [data-count="361"]')).toHaveText('361', {
        timeout: 3000,
      });
      expect(problems).toEqual([]);
    });

    test('hareket azaltmada otomatik oynatma kapalı', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      await expect(page.locator('[data-wt-toggle]')).toHaveAttribute('aria-pressed', 'false');
      await page.waitForTimeout(6500);
      await expect(page.locator('.wt-scene.is-active')).toHaveAttribute('data-scene', '0');
    });

    test('390px taşma yok ve AA ihlali yok', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const o = await page.evaluate(() => ({
        s: document.documentElement.scrollWidth,
        c: document.documentElement.clientWidth,
      }));
      expect(o.s).toBeLessThanOrEqual(o.c);
      const AxeBuilder = (await import('@axe-core/playwright')).default;
      for (const i of [0, 1, 2, 3]) {
        await page.locator(`[data-wt-go="${i}"]`).click();
        const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
        expect(r.violations.map((v) => `${i}:${v.id}`)).toEqual([]);
      }
    });
  });
}

test('tercih sayfasından nasıl çalışır sayfasına bağlantı', async ({ page }) => {
  await page.goto('/tr/cozumler/tercih-on-kontrol/');
  await page.locator('[data-testid="walkthrough-link"]').click();
  await expect(page).toHaveURL(/\/tr\/cozumler\/tercih-on-kontrol\/nasil-calisir\/$/);
});
