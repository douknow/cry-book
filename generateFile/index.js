const fs = require('fs');
const opf = require('./opf');
const toc = require('./toc');
const combine = require('./combine');

const createDir = require('../util/createDir');

const containerContent = `<?xml version="1.0" encoding="utf-8" standalone="no"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
	<rootfiles xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
		<rootfile full-path="OEBPS/main.opf" media-type="application/oebps-package+xml" xmlns="urn:oasis:names:tc:opendocument:xmlns:container" />
	</rootfiles>
</container>`;

const mimetypeContent = 'application/epub+zip';

const metaInfoPath = `${__dirname}/../out/META-INF`;

module.exports = (title, allChapter) => {
  createDir(metaInfoPath);

  fs.writeFileSync(`${metaInfoPath}/container.xml`, containerContent);
  fs.writeFileSync(`${__dirname}/../out/mimetype`, mimetypeContent);

  opf(title, allChapter);
  toc(title, allChapter);
  combine(title);
};
