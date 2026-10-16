import { defineConfig, devices } from '@playwright/test';

// Varsayılan olarak Playwright'ın kendi Chromium'u kullanılır (PLAYWRIGHT_BROWSERS_PATH).
// Sürüm uyuşmazlığında PW_CHROMIUM_PATH ile çalıştırılabilir dosya verilebilir.
const executablePath = process.env.PW_CHROMIUM_PATH;

const PORT = 4173;

export default defineConfig({
  testDir: 'e2e',
  // Ekran görüntüleri yalnızca `npm run screenshots` ile alınır.
  testIgnore: process.env.SCREENSHOTS ? [] : ['**/screenshots.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: executablePath ? { executablePath } : {},
      },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
