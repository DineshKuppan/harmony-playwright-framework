import { Page } from '@playwright/test';

export async function navigate(page: Page, url: string): Promise<void> {
  await page.goto(url);
}

export async function getPageTitle(page: Page): Promise<string> {
  return await page.title();
}