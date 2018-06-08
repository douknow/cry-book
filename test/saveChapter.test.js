const saveChapter = require('../save/saveChapter');
const allChapter = require('../data/allChapter.json');
const getPageContent = require('../getPageContent');
const parseChapter = require('../parse/parseContent');

[2280, 2290, 2658, 2662, 2664, 2667].map(v => {
  let chapter = allChapter[v];
  let html = getPageContent('http://www.biquge.com.tw/' + chapter.link);
  saveChapter(chapter.id, parseChapter(html), chapter.title);
});
