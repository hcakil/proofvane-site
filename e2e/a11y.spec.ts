import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const scheme of ['light', 'dark'] as const) {
  test(`erişilebilirlik: WCAG 2.1 AA ihlali yok (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map(
        (v) =>
          `${v.id}: ${v.nodes.map((n) => n.target.join(' ') + ' ' + (n.failureSummary ?? '')).join(' | ')}`,
      ),
    ).toEqual([]);
  });
}
