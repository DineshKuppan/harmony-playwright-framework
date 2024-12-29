import { Page } from 'playwright';

export class PageUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a given URL.
   * @param url - The URL to navigate to.
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Waits for an element to appear and clicks it.
   * @param selector - The selector of the element to click.
   */
  async waitAndClick(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  /**
   * Fills an input field with the specified text.
   * @param selector - The selector of the input field.
   * @param text - The text to type into the input field.
   */
  async typeText(selector: string, text: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, text);
  }

  /**
   * Retrieves the text content of an element.
   * @param selector - The selector of the element.
   * @returns The text content of the element.
   */
  async getText(selector: string): Promise<string> {
    await this.page.waitForSelector(selector);
    return await this.page.textContent(selector) ?? '';
  }

  /**
   * Takes a screenshot of the current page.
   * @param filePath - The file path where the screenshot will be saved.
   */
  async takeScreenshot(filePath: string): Promise<void> {
    await this.page.screenshot({ path: filePath });
  }

  /**
   * Checks if an element is visible on the page.
   * @param selector - The selector of the element.
   * @returns True if the element is visible, otherwise false.
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Retrieves the title of the current page.
   * @returns The title of the page.
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Waits for a specific URL to be loaded.
   * @param expectedUrl - The expected URL to wait for.
   * @param timeout - Maximum time to wait in milliseconds (default: 5000ms).
   */
  async waitForUrl(expectedUrl: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForURL(expectedUrl, { timeout });
  }

  /**
   * Retrieves the value of an input field.
   * @param selector - The selector of the input field.
   * @returns The value of the input field.
   */
  async getInputValue(selector: string): Promise<string> {
    await this.page.waitForSelector(selector);
    return await this.page.inputValue(selector);
  }
}
