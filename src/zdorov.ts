import needle from 'needle';
import { URLSearchParams } from 'url';

const drugs = [
  'Арбидол капс 100мг №10',
];

for (const drug of drugs) {
  findZdorovDrug(drug);
}


async function findZdorovDrug(name: string) {
  try {
  
    const url = 'https://zdorov.ru/catalog/344/426/430/arbidol-84448';


    const data = await needle('get', url);
    // const body = await data.body;

    const cookies = data.headers['set-cookie'];
    const strCookie = cookies![0];
    console.log(strCookie, name);

    const bodyParams = new URLSearchParams();
    bodyParams.append('selectedStock', '255');

    await needle('post', 'https://zdorov.ru/catalog/ChangeStock', { 
      headers: { cookie: strCookie} 
    });

    const d = await needle('get', url, { headers: { cookie: strCookie } });
    console.log(d.body);

    // const ctx = new DOMParser().parseFromString(body);
    // const links: SelectedValue[] = xpath.select('//*[@class="title-search-item"][1]//a/@href', ctx);
    // for (const link of links) {
    //   const url = (link as Attr).value;
    //   console.log( `http://www.aptekanika.ru${url}`);
    //   const page = await needle('get', `http://www.aptekanika.ru${url}`);
    //   console.log(page.body);
    //   break;
    // }
  } catch (e) {
    console.log(e);
  }
}