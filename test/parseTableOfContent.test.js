const getPageContent = require('../getPageContent');
const parseTableOfContent = require('../parse/parseTableOfContent');

(async () => {
  const html = await getPageContent('http://www.biquge.com.tw/1_1999/', 'gbk');
  parseTableOfContent(html);
})();
