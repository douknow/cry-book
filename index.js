const getPageContent = require('./getPageContent');
const allChapter = require('./data/allChapter.json');
const parseChapter = require('./parse/parseContent');
const saveChapter = require('./save/saveChapter');
const fs = require('fs');
const async = require('async');

const loseData = require('./lose.json');

const errs = [];

async.mapLimit(
  allChapter,
  20,
  async chapter => {
    console.log(chapter.id);
    try {
      const html = await getPageContent(
        'http://www.biquge.com.tw' + chapter.link,
        'gbk'
      );
      saveChapter(chapter.id, parseChapter(html), chapter.name);
    } catch (e) {
      errs.push(chapter);
    }
  },
  err => {
    if (err) console.log(err);
    else console.log('complete!');

    console.log(errs);
    fs.writeFileSync('./err-log.txt', JSON.stringify(errs));
  }
);
