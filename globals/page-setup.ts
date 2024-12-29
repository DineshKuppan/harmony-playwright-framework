import { test as baseTest, expect } from '@playwright/test';
const cp = require("child_process");
const clientPlaywrightVersion = cp
    .execSync("npx playwright --version")
    .toString()
    .trim()
    .split(" ")[1];

console.log(`Client Playwright Version: ${clientPlaywrightVersion}`);

/**
 * A hook that runs before each test, setting the page context. The base test object with a beforeEach hook is already
 * set up. This can be used to define tests with the page context set up.
 *
 * @param {Page} page - The page context provided by Playwright.
 */
export const test = baseTest.extend<{ testHook: void }>({
    testHook: [
        async ({ page }, use) => {
            console.log('BEFORE EACH HOOK FROM FIXTURE');
            await use();
            console.log('AFTER EACH HOOK FROM FIXTURE');
        },
        { auto: true },
    ],
});

export { expect };
