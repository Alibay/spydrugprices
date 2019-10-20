import * as phantom from 'phantom';
import {
  typeDrugName,
  parseSearchResult
} from './assets/aptekanika';

enum ParsingState {
  TypeDrugName = 0,
  ParseDrugs = 1,
};

(async function() {
  const url = 'http://www.aptekanika.ru/reservations/98608/';

  let state: ParsingState = ParsingState.TypeDrugName;
  
  console.log('start');
  const ph: phantom.PhantomJS = await phantom.create();
  const page = await ph.createPage();

  page.on('onLoadFinished', onload);

  console.log('navigate');
  await page.open(url);

  async function onload() {
    switch (state) {
      case ParsingState.TypeDrugName:
        console.log('typeing drug name');
        state = ParsingState.ParseDrugs;
        await page.evaluate(typeDrugName);
        break;
      case ParsingState.ParseDrugs:
        console.log('getting results...');
        const result = await page.evaluate(parseSearchResult);
        console.log(result);
        ph.exit();
        break;
    }
  }
})();
