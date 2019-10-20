import * as phantom from 'phantom';
import { logger } from '../utils/logger';

import {
  chooseDrugStore,
  getChosenDrugStore
} from '../assets/nika';

enum ParsingState {
  ChooseDrugStore = 0,
  ParseDrugs = 1,
};

export async function parseAptekanika() {
  const url = 'https://zdorov.ru/catalog/344/426/430/arbidol-36087';

  let state: ParsingState = ParsingState.ChooseDrugStore;
  
  logger.info('zdorov.ru: begin');
  const ph: phantom.PhantomJS = await phantom.create();
  const page = await ph.createPage();

  page.on('onLoadFinished', onload);

  console.log('navigate');  
  await page.open(url);

  async function onload() {
    logger.info('zdorov.ru: page loaded');

    switch (state) {
      case ParsingState.ChooseDrugStore:
        logger.info('zdorov.ru: chose drugstore');
        state = ParsingState.ParseDrugs;
        await page.evaluate(chooseDrugStore);
        break;
      case ParsingState.ParseDrugs:
        logger.info('zdorov.ru: parsing results');
        const result = await page.evaluate(getChosenDrugStore);
        logger.info('zdorov.ru: results', result);
        ph.exit();
        break;
    }
  }
}