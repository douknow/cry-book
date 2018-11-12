const cheerio = require('cheerio');
const Chapter = require('../Model/Chapter');

class Parse {

  constructor(html) {
    this.title = '';
    this.author = '';
    this.coverImage = '';
    this.chapters = [];

    this.html = html;
  }

  luoxia() {
    const $ = cheerio.load(this.html);
    const chapterList = $('.book-list.clearfix > ul');
    const link = chapterList.find('li > a').each((i, elem) => {
      let a = $(elem);

      this.title = $('div.book-describe > h1').text();
      this.author = '';
      this.coverImage = $('div.book-img > img').attr('src');

      const chapter = new Chapter(i, a.text().replace('&', '&amp;'), a.attr('href'));
      this.chapters.push(chapter);
    });
  }

}

module.exports = Parse;