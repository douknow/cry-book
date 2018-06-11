const getPageContent = require('../getPageContent');
const parseTableOfContent = require('../parse/parseTableOfContent');

(async () => {
  const html = await getPageContent('http://www.biquge.com.tw/0_316/', 'gbk');
  parseTableOfContent(html);
})();
