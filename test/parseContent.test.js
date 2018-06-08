const getPageContent = require('../getPageContent');
const parseContent = require('../parse/parseContent');

(async () => {
  const html = await getPageContent(
    'https://www.biqudu.com/31_31677/2013444.html',
    'utf8'
  );

  console.log(parseContent(html));
})();
