const getPageContent = require('../getPageContent');
const parseTableOfContent = require('../parse/parseTableOfContent');

(async () => {
  const html = await getPageContent('https://www.biqudu.com/31_31677/', 'utf8');
  parseTableOfContent(html);
})();
