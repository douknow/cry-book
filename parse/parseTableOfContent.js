const cheerio = require('cheerio');

module.exports = html => {
  console.log('Parse table of content!');
  const $ = cheerio.load(html);
  const $list = $('#list');
  const aElem = $list.find('dd > a');
  const allChapter = [];

  aElem.each((i, elem) => {
    const chapter = $(elem);

    allChapter.push({
      id: i,
      name: chapter.text().replace(/[<>]/g, '【】'),
      link: chapter.attr('href')
    });
  });

  return allChapter;
};
