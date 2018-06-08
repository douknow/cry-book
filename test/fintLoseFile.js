const fs = require('fs');
const allChapter = require('../data/allChapter.json');

const not = [];

for (i = 0; i < allChapter.length; i++) {
  let chapter = allChapter[i];
  let filename = `${__dirname}/../out/OEBPS/chapters/chapter${
    chapter.id
  }.xhtml`;
  if (!fs.existsSync(filename)) {
    not.push(chapter);
  }
}

console.log(not);

fs.writeFileSync(`${__dirname}/../lose.json`, JSON.stringify(not));
