
import { PlaywrightTestConfig, } from '@playwright/test';
import * as os from "node:os";

console.log('Default Workers -> ' + process.env.DEFAULT_WORKERS);

const config: PlaywrightTestConfig = {
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './src/tests',
  // Run all tests in parallel.
  fullyParallel: true,
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  globalSetup: require.resolve('./globals/global.setup.ts'),
  globalTeardown: require.resolve('./globals/global-teardown'),
  use: {
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 }
    },
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
    ['html', { outputFolder: 'html-report' }],
    ['playwright-s3-reporter',
      {
        credentials: {
          accessKeyId: "abcd", // Required: Your AWS access key ID.
          secretAccessKey: "xyz", // Required: Your AWS secret access key.
        },
        endpoint: "http://playwright-s3.services.mycompany.example:9000", // Optional: The endpoint URL of the S3 service. Required for services other than AWS S3. Defaults to s3.<region>.amazonaws.com.
        sslEnabled: false,
        region: "eu-west-rack-1",
        bucketName: "test",
        baseUploadKey: "tests/abcd/",
        uploadTestResults: false,
        uploadReport: false,
      }]],
  workers: process.env.CI === 'true' ? 1 : Number(process.env.DEFAULT_WORKERS),
  outputDir: 'test-results/'
};
export default config;