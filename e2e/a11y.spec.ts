import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = [
  '/tr/',
  '/en/',
  '/tr/cozumler/tercih-on-kontrol/',
  '/tr/cozumler/ilan-dogrulama/',
  '/en/solutions/placement-precheck/',
  '/en/solutions/listing-verification/',
];

for (const path of PAGES) {
  for (const scheme of ['light', 'dark'] as const) {
    for (const width of [1280, 390]) {
      test(`${path} ${scheme} ${width}px: WCAG 2.1 AA ihlali yok`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        expect(
          results.violations.map(
            (v) =>
              `${v.id}: ${v.nodes.map((n) => `${n.target.join(' ')} ${n.failureSummary ?? ''}`).join(' | ')}`,
          ),
        ).toEqual([]);
      });
    }
  }
}

test('kök sayfa (yönlendirme betiği çalışmazsa görünen seçim ekranı) erişilebilir', async ({
  page,
}) => {
  // Yönlendirme betiğini engelle: betiksiz ziyaretçinin gördüğü ekranı denetle.
  await page.route(/\/assets\/root-[^/]+\.js$/, (route) => route.abort());
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('a[data-locale]')).toHaveCount(2);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test('hareket azaltma: döngü kapalı, son kare görünür; tercih yoksa süreç döngüsü çalışır', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/');
  for (const sel of ['.b-col', '.live', '.pstep-bar', '.hero-title', '.checks']) {
    const name = await page
      .locator(sel)
      .first()
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(name, sel).toBe('none');
  }
  await expect(page.locator('.live')).toBeVisible();
  const scroll = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(scroll).toBe('auto');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  const normal = await page
    .locator('.b-col')
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(normal).toBe('build');
  const duration = await page
    .locator('.b-col')
    .first()
    .evaluate((el) => getComputedStyle(el).animationDuration);
  expect(duration).toBe('10s');
});

test('elle seçilen koyu tema axe AA ihlali vermez', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/tr/');
  await page.locator('[data-theme-choice="dark"]').click();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
