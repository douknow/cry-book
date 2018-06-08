const fs = require('fs');
const createDir = require('../util/createDir');

module.exports = () => {
  const stylePath = `${__dirname}/../out/OEBPS/style`;

  createDir(stylePath);

  const defaultStyle = `div {
  color: red;
}
  `;

  console.log('Save style file...');
  fs.writeFileSync(`${stylePath}/style.css`, defaultStyle);

  console.log('Save ok!');
};
