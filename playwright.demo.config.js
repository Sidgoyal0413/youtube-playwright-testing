// DEMO MODE: visible browser, slowed down, one test at a time, video of every test.
const { defineConfig, devices } = require('@playwright/test');
const base = require('./playwright.config');

module.exports = defineConfig({
  ...base,
  workers: 1,
  retries: 0,
  timeout: 120_000,
  fullyParallel: false,
  use: {
    ...base.use,
    video: { mode: 'on', size: { width: 1280, height: 720 } },
    trace: 'on',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'demo-chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1280, height: 720 },
        launchOptions: { slowMo: 700 },   // ms delay between every action; raise for slower
      },
    },
  ],
});
