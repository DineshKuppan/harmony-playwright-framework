import PlaywrightTestUtility from '../../helpers/pages/pageUtils';
import { test, expect } from "@playwright/test";

// test('Validate title of Example.com', async () => {
//     const testUtil = new PlaywrightTestUtility('chromium');

//     // Launch browser and navigate to URL
//     const page = await testUtil.launchBrowser();
//     await testUtil.navigateTo('https://saucedemo.com');

//     // Perform some actions
//     await testUtil.waitAndClick('button#login');

//     await page.locator("#user-name").type("standard_user");
//     await page.locator("#password").type("secret_sauce");

//     await testUtil.takeScreenshot('screenshot.png');

//     await page.locator("#login-button").click();

//     await testUtil.takeScreenshot('screenshot1.png');

//     await expect(page.locator("#shopping_cart_container")).toBeVisible();

//     // Close browser
//     await testUtil.closeBrowser();
// });
test('Validate title of Example.com', async ({ page }) => {
    await page.goto('https://saucedemo.com');
    expect(await page.title()).toBe('Swag Labs');
});