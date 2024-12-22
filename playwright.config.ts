
import { PlaywrightTestConfig, } from '@playwright/test';
import * as os from "node:os";

const config: PlaywrightTestConfig = {
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  // Run all tests in parallel.
  fullyParallel: true,
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  //globalSetup: require.resolve('./globals/global.setup.ts'),
  globalTeardown: require.resolve('./globals/global-teardown'),
  use: {
    headless: false,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    baseURL: 'http://127.0.0.1:8000',
    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'Accept': '*/*'
    }
  },
  // reporter: './my-awesome-reporter.ts',
  reporter: [
    ['line'],
    ['list'],
    ["allure-playwright", {
      resultsDir: "allure-results",
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        os_platform: os.platform(),
        os_release: os.release(),
        os_version: os.version(),
        node_version: process.version,
      },
    }],
    ['html', { outputFolder: 'html-report' }]],
  workers: process.env.CI ? 2 : process.env.DEFAULT_WORKERS,
  outputDir: 'test-results/'
};
export default config;