import { Page, Locator } from '@playwright/test';

export class ElementUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(selector: string): Promise<void> {
    const element: Locator = this.page.locator(selector);
    await element.click();
  }

  async takeScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path });
  }

  async getText(selector: string): Promise<string> {
    const element: Locator = this.page.locator(selector);
    return (await element.textContent()) ?? '';
  }

  async type(selector: string, text: string): Promise<void> {
    const element: Locator = this.page.locator(selector);
    await element.fill(text);
  }

}