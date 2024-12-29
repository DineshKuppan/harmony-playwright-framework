import { elementUtils, browserUtils, test, expect } from '../../src';

test.describe('Example Domain Tests', () => {
    test('Validate the page title', async ({ page }) => {
        await browserUtils.navigate(page, '/');
        const title = await browserUtils.getPageTitle(page);
        expect(title).toBe('Example Domain');
    });

    test('Validate navigation after clicking a link', async ({ page }) => {
        await browserUtils.navigate(page, '/');
        await elementUtils.click(page, 'a');
        expect(page.url()).toContain('iana.org');
    });

    test('Take a screenshot of the homepage', async ({ page }) => {
        await browserUtils.navigate(page, '/');
        await elementUtils.takeScreenshot(page, 'homepage.png');
    });
});