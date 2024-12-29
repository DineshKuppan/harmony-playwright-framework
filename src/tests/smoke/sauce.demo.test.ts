import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('form')).toContainText('Login');
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await page.locator('[data-test="password"]').click();
});