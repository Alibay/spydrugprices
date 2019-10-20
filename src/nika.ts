import fetch from 'node-fetch';
// import cheerio from 'cheerio';
import xpath, { SelectedValue } from 'xpath';
import { DOMParser } from 'xmldom';
import querystring from 'querystring';
import { URLSearchParams } from 'url';
import needle from 'needle';

const drugs = [
  'Арбидол капс 100мг №10',
];

for (const drug of drugs) {
  findAptekanikaDrug(54, drug);
}

async function findAptekanikaDrug(drugstoreId: number, name: string) {
  try {
    const params = querystring.stringify({
      Y: '&',
      q: name
    });

    const url = `http://www.aptekanika.ru/reservations/${drugstoreId}/?${params}`;
    const headers = {
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7',
      'Bx-ajax': 'true',
      'X-Requested-With': 'XmlHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const bodyParams = new URLSearchParams();
    bodyParams.append('ajax_call', 'y');
    bodyParams.append('INPUT_ID', 'title-search-input');
    bodyParams.append('q', name);
    bodyParams.append('l', '2');

    const data = await needle('post', url, bodyParams);
    const body = await data.body;

    console.log(body);

    const ctx = new DOMParser().parseFromString(body);
    const links: SelectedValue[] = xpath.select('//*[@class="title-search-item"][1]//a/@href', ctx);
    for (const link of links) {
      const url = (link as Attr).value;
      console.log( `http://www.aptekanika.ru${url}`);
      const page = await needle('get', `http://www.aptekanika.ru${url}`);
      console.log(page.body);
      break;
    }
    
    
    // const ctx = new DOMParser().parseFromString(body);


    // const links: SelectedValue[] = xpath.select('//*[@id="ret"]/tbody/tr[1]/td[3]//a/@href', ctx);
    // for (const link of links) {
    //   console.log((link as Attr).value);
    // }

  } catch (e) {
    console.log(e);
  }
}