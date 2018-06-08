const cheerio = require('cheerio');
const fs = require('fs');

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

  console.log('Write to file save all the chapter info.');
  fs.writeFileSync(
    `${__dirname}/../data/allChapter.json`,
    JSON.stringify(allChapter)
  );

  console.log('Save ok!');
};
