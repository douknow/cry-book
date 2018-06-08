const getPageContent = require('../getPageContent');

const url = 'https://www.biqudu.com/31_31677/';

(async () => {
  let data;
  try {
    data = await getPageContent(url, 'utf8');
  } catch (e) {
    console.log(e);
  }
  console.log(data);
})();
