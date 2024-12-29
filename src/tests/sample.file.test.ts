import { test, expect } from '@playwright/test';
import { PageUtils } from '../helpers/pages/pageUtils';

test.describe('Example Domain Tests', () => {
  test('Validate page title and navigation', async ({ page }) => {
    const pageUtils = new PageUtils(page);

    await pageUtils.navigateTo('https://example.com');

    const title = await pageUtils.getPageTitle();
    expect(title).toBe('Example Domain');

    await pageUtils.waitAndClick('a');
    await pageUtils.waitForUrl('https://www.iana.org/');

    expect(page.url()).toContain('iana.org');
  });

  test('Input field operations', async ({ page }) => {
    const pageUtils = new PageUtils(page);

    await pageUtils.navigateTo('https://www.w3schools.com/html/html_forms.asp');

    await pageUtils.typeText('input[name="firstname"]', 'John');
    await pageUtils.typeText('input[name="lastname"]', 'Doe');

    const firstName = await pageUtils.getInputValue('input[name="firstname"]');
    const lastName = await pageUtils.getInputValue('input[name="lastname"]');

    expect(firstName).toBe('John');
    expect(lastName).toBe('Doe');
  });
});
