import { test } from '@playwright/test';

// Yalnızca `npm run screenshots` ile çalışır (SCREENSHOTS=1). Çıktı: screenshots/
for (const l of ['tr', 'en'] as const) {
  for (const width of [1440, 390] as const) {
    for (const scheme of ['light', 'dark'] as const) {
      test(`ekran görüntüsü ${l} ${width}px ${scheme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/${l}/`);
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: `screenshots/${l}-${width}-${scheme}.png`, fullPage: true });
      });
    }
  }
}
