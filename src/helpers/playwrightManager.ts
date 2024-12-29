import { Browser, BrowserContext, Page, chromium, firefox, webkit, LaunchOptions } from 'playwright';

class PlaywrightManager {
  browserType: string;
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(browserType = 'chromium') {
    this.browserType = browserType;
  }

  async launchBrowser(options: LaunchOptions = { headless: true }): Promise<Page> {
    this.browser = await this.getBrowserInstance(options);
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    return this.page;
  }

  async getBrowserInstance(options: LaunchOptions): Promise<Browser> {
    switch (this.browserType) {
      case 'firefox':
        return firefox.launch(options);
      case 'webkit':
        return webkit.launch(options);
      default:
        return chromium.launch(options);
    }
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

export default PlaywrightManager;
