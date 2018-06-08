const fs = require('fs');
const allChapter = require('../data/allChapter.json');

const title = '傲世九重天';

module.exports = () => {
  let lis = '';
  const chapters = fs.readdirSync(`${__dirname}/../out/OEBPS/chapters`);
  allChapter.forEach(chapter => {
    lis += `<li class="toc-entry" id="${chapter.id}"><a href="chapters/chapter${
      chapter.id
    }.xhtml">${chapter.name}</a></li>\n`;
  });

  const data = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
<title>${title}</title>
<link rel="stylesheet" href="style/style.css" type="text/css"/>
<meta charset="utf-8"/>
</head>
<body>
  <section>
    <header>
      <h1>Contents</h1>
    </header>
    <nav id="toc" role="doc-toc" epub:type="toc">
      <ol>
          ${lis}
      </ol>
    </nav>
  </section>
</body>
</html>
`;
  fs.writeFileSync(`${__dirname}/../out/OEBPS/toc.xhtml`, data);
};
