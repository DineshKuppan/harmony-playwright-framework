import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("https://saucedemo.com");
    await expect(page).toHaveTitle(/Swag/);
});

test("get started link", async ({ page }, testInfo) => {
    await page.goto("https://saucedemo.com");
    await page.locator("#user-name").type("standard_user");
    await page.locator("#password").type("secret_sauce");
    const homeScreenshot = await page.screenshot({ path: 'screenshot.png' });
    testInfo.attach('Home Page', {
        body: homeScreenshot,
        contentType: 'image/png',
    });

    await page.locator("#login-button").click();
    const fullPageScreenshot = await page.screenshot({ path: 'screenshot1.png', fullPage: true });
    testInfo.attach('Landing Page', {
        body: fullPageScreenshot,
        contentType: 'image/png',
    });
    await expect(page.locator("#shopping_cart_container")).toBeVisible();
});