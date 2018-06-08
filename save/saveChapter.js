const fs = require('fs');
const createDir = require('../util/createDir');

module.exports = (id, data, title = `Chapter ${id}`) => {
  const chapterDirName = `${__dirname}/../out/OEBPS/chapters`;

  data = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <link rel="stylesheet" type="text/css" href="../style/style.css" />
  <title>${title}</title>
</head>

<body>
  <h2>${title}</h2>

  ${data}
</body>

</html>
  `;

  fs.writeFileSync(`${chapterDirName}/chapter${id}.xhtml`, data);
};
