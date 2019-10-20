import * as phantom from 'phantom';
import {
  chooseDrugStore,
  getChosenDrugStore
} from './assets/nika';

enum ParsingState {
  ChooseDrugStore = 0,
  ParseDrugs = 1,
};

(async function() {
  const url = 'https://zdorov.ru/catalog/344/426/430/arbidol-36087';

  let state: ParsingState = ParsingState.ChooseDrugStore;
  
  console.log('start');
  const ph: phantom.PhantomJS = await phantom.create();
  const page = await ph.createPage();

  page.on('onLoadFinished', onload);

  console.log('navigate');
  await page.open(url);

  async function onload() {
    switch (state) {
      case ParsingState.ChooseDrugStore:
        console.log('choose drug store');
        state = ParsingState.ParseDrugs;
        await page.evaluate(chooseDrugStore);
        break;
      case ParsingState.ParseDrugs:
        console.log('getting results...');
        const result = await page.evaluate(getChosenDrugStore);
        console.log(result);
        ph.exit();
        break;
    }
  }
})();
