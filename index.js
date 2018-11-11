const getPageContent = require('./getPageContent');
const allChapter = require('./data/allChapter.json');
const parseChapter = require('./parse/parseContent');
const saveChapter = require('./save/saveChapter');
const fs = require('fs');
const async = require('async');
const parseTitle = require('./parse/parseTitle');
const rp = require('request-promise');
const combine = require('./generateFile/index');
const mkdir = require('./util/createDir');
const rm = require('rimraf');
const readline = require('readline');

const parseTableOfContent = require('./parse/parseTableOfContent');

const loseData = require('./lose.json');

const errs = [];

let book = {};
const root_path = 'http://www.biquge.com.tw';
let chapters = [];

// Delete all files.
if (fs.existsSync(`${__dirname}/out`)) {
  rm.sync(`${__dirname}/out`);
}

// Create dirs
mkdir(`${__dirname}/out`);
mkdir(`${__dirname}/out/OEBPS`);
mkdir(`${__dirname}/out/OEBPS/chapters`);
mkdir(`${__dirname}/out/OEBPS/images`);

console.log('Get all chapter info...');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('请输入id：', id => {
  rl.close();
  (async () => {
    const html = await getPageContent(`${root_path}/${id}/`, 'gbk');
    book.chapters = parseTableOfContent(html);
    console.log('Get all chapter info complete!');
  
    // Get book title and cover image and autor.
    Object.assign(book, parseTitle(html));
  
    // Get image file.
    await rp.get(`${root_path}/${book.imagePath}`).pipe(fs.createWriteStream(`${__dirname}/out/OEBPS/images/cover-image.jpg`));
  
    // Get chapter file
    let chapters = [...book.chapters];
    await saveAllCahpter(chapters, 1);
  
    // Combine ebook file.
    combine(book.title, chapters);
  
    // Will delete
    console.log(book);
  })();
});

function saveAllCahpter(chapters, x) {
  return new Promise((resolve, reject) => {
    console.log(`*************尝试第${x}次,共有${chapters.length}条数据************`);
    async.mapLimit(
      chapters,
      20,
      async chapter => {
        console.log(chapter.id);
        try {
          const html = await getPageContent(
            'http://www.biquge.com.tw' + chapter.link,
            'gbk'
          );
          saveChapter(chapter.id, parseChapter(html), chapter.name);
          book.chapters = book.chapters.filter(v => v.id !== chapter.id);
        } catch (e) {
          console.log('Fail: ', chapter.id);
        }
      },
      async err => {
        if (err) console.log(err);
        else console.log('Complete once!');

        if (book.chapters.length > 0) {
          await saveAllCahpter(book.chapters, x + 1);
        } else {
          console.log('Complete!!!!!!!!!!!!');
        }
        resolve();
      }
    );
  });
}



// Complete!


