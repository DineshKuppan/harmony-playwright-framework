import { test, expect } from '@playwright/test';
import logger from './../helpers/logger';

test('has title', async ({ page }) => {
    logger.info(`Start "has title" test`);
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
    logger.info(`End "has title" test`);
});

test('get started link', async ({ page }) => {
    logger.info(`Start "get started link" test`);

    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    logger.info(`End "get started link" test`);
});