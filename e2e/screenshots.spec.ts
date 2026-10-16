import { test } from '@playwright/test';

// Yalnızca `npm run screenshots` ile çalışır (SCREENSHOTS=1). Çıktı: screenshots/

const widths = [1280, 390] as const;
const schemes = ['light', 'dark'] as const;

for (const width of widths) {
  for (const scheme of schemes) {
    test(`ekran görüntüsü ${width}px ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.screenshot({ path: `screenshots/${width}-${scheme}.png`, fullPage: true });
    });
  }
}
