import { test, expect } from "@playwright/test";
 
// define a test task called "has expected title"
test("has expected title", async ({ page }) => {
  // visit the AppSignal home page in the browser
  await page.goto("https://www.google.com/ncr");
 
  // retrieve the page title
  const title = await page.title();
 
  // expect the page title to be equal to the expected string
  await expect(title).toBe(
    "Application Monitoring for Ruby on Rails, Elixir & Node.js | AppSignal APM"
  );
});