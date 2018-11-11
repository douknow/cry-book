const cheerio = require('cheerio');

module.exports = (html) => {
  let $ = cheerio.load(html);
  let title = $('#maininfo #info h1').text();
  let author = $('#maininfo #info p').first().text().split('：')[1];
  let imagePath = $('#fmimg img').attr('src');
  return { title, author, imagePath };
}