import { expect, test } from '@playwright/test';

// Kök sayfa (/) dil yönlendirmesi: kayıtlı tercih > tarayıcı dil listesi; tr → /tr/, diğerleri → /en/.
for (const [browserLocale, expected] of [
  ['tr-TR', 'tr'],
  ['en-US', 'en'],
  ['de-DE', 'en'],
] as const) {
  test.describe(`tarayıcı dili ${browserLocale}`, () => {
    test.use({ locale: browserLocale });
    test(`/ → /${expected}/`, async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveURL(new RegExp(`/${expected}/$`));
      await expect(page.locator('html')).toHaveAttribute('lang', expected);
    });
  });
}

test.describe('elle seçim kalıcıdır', () => {
  test.use({ locale: 'en-US' });
  test('EN tarayıcıda TR seçilince sonraki / ziyareti /tr/ açar', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);
    await page.locator('header nav.lang a[data-locale="tr"]').click();
    await expect(page).toHaveURL(/\/tr\/$/);
    expect(await page.evaluate(() => localStorage.getItem('proofvane.lang'))).toBe('tr');
    await page.goto('/');
    await expect(page).toHaveURL(/\/tr\/$/);
    // Geri İngilizceye dönüş de kalıcı.
    await page.locator('footer nav.lang a[data-locale="en"]').click();
    await expect(page).toHaveURL(/\/en\/$/);
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);
  });
});

test.describe('doğrudan adres otomatik algılamayla değişmez', () => {
  test.use({ locale: 'tr-TR' });
  test('Türkçe tarayıcıda /en/ açılınca /en/ kalır', async ({ page }) => {
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('doğrudan /tr/', () => {
  test.use({ locale: 'de-DE' });
  test('Almanca tarayıcıda /tr/ açılınca /tr/ kalır', async ({ page }) => {
    await page.goto('/tr/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/tr\/$/);
  });
});

test('her sayfada TR/EN seçici, geçerli dil işaretli', async ({ page }) => {
  for (const l of ['tr', 'en']) {
    await page.goto(`/${l}/`);
    const sw = page.locator('header nav.lang');
    await expect(sw.locator('a')).toHaveCount(2);
    await expect(sw.locator(`a[data-locale="${l}"]`)).toHaveAttribute('aria-current', 'page');
  }
});
