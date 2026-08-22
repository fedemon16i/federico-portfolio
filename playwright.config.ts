import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  snapshotDir: './tests/snapshots',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:8080',
    // Use pre-installed Chromium in remote environment
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_BROWSERS_PATH
        ? `${process.env.PLAYWRIGHT_BROWSERS_PATH}/chromium`
        : undefined,
    },
  },

  projects: [
    // The 6 viewports from CLAUDE.md pre-commit scan
    { name: '320',  use: { ...devices['Desktop Chrome'], viewport: { width: 320,  height: 568  } } },
    { name: '375',  use: { ...devices['Desktop Chrome'], viewport: { width: 375,  height: 667  } } },
    { name: '768',  use: { ...devices['Desktop Chrome'], viewport: { width: 768,  height: 1024 } } },
    { name: '1024', use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 768  } } },
    { name: '1440', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900  } } },
    { name: '1920', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } } },
  ],

  webServer: {
    command: 'npx serve . --listen 8080 --no-clipboard',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
