const fs = require('fs');
const moment = require('moment');
const allChapter = require('../data/allChapter.json');

const author = 'some';
const title = '傲世九重天';
const identifier = 'https://ice.com';
const publisher = 'ice';

module.exports = () => {
  let items = '';
  let itemrefs = '';
  const chapters = fs.readdirSync(`${__dirname}/../out/OEBPS/chapters`);
  allChapter.forEach(chapter => {
    items += `<item id="chapter${
      chapter.id
    }" media-type="application/xhtml+xml" href="chapters/chapter${
      chapter.id
    }.xhtml" />\n`;
    itemrefs += `<itemref idref="chapter${chapter.id}" linear="yes" />\n`;
  });

  const data = `<?xml version="1.0" encoding="utf-8" standalone="no"?>
	<package prefix="ibooks: http://vocabulary.itunes.apple.com/rdf/ibooks/vocabulary-extensions-1.0/" version="3.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid">
		<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
			<dc:title>${title}</dc:title>
			<dc:identifier id="bookid">${identifier}</dc:identifier>
			<dc:type>Text</dc:type>
			<dc:language>en</dc:language>
			<dc:rights>All rights reserved.</dc:rights>
			<dc:publisher>${publisher}</dc:publisher>
			<meta content="cover-image" name="cover" />
			<meta property="ibooks:specified-fonts">true</meta>
			<meta property="dcterms:modified">${moment().format(
        'YYYY-MM-DDThh:mm:ss'
      )}Z</meta>
		</metadata>
		<manifest>
			<item media-type="application/xhtml+xml" href="toc.xhtml" id="ncxtoc" properties="nav" />
			<item id="style" href="style/style.css" media-type="text/css" />
			<item id="cover-image" media-type="image/jpeg" href="images/cover-image.jpg" />
			${items}
		</manifest>
		<spine>
		  ${itemrefs}
		</spine>
	</package>`;

  fs.writeFileSync(`${__dirname}/../out/OEBPS/main.opf`, data);
};
