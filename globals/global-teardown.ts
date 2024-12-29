const exec = require('child_process').execSync;
import logger from './../src/helpers/utils/logger';
import fs from 'fs';
import path from 'path';

async function globalSetup() {
  const resultsFolder = 'test-results';
  const resultsFile = 'results.xml';
  if (fs.existsSync(resultsFolder)) {
    logger.info('Generating HTML report from xUnit results folder exists');
    const filePath = `${resultsFolder}/${resultsFile}`;
    logger.info('HTML Report file generated at location [{0}]', fs.existsSync(path.resolve(filePath)));
  }
};
export default globalSetup;