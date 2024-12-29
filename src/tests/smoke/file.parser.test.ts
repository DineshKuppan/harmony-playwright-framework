import { FileParserUtil, Logger } from '@bytes2gram/harmony-utils';
import { test, expect } from '@playwright/test';
const logger = new Logger();

test('json test data check', async ({ page }) => {
    // JSON example
    const jsonData = await FileParserUtil.parseJSON('./data/data.json');
    console.log('JSON Data:', jsonData);
    logger.info('JSON Data:');
});

test('csv test data check', async ({ page }) => {
    // JSON example
    const csvData = await FileParserUtil.parseCSV('./data/data.csv');
    console.log('CSV Data:', csvData);
    logger.info('CSV Data:');
});