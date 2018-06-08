const fs = require('fs');

module.exports = dirName => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  } else {
    fs.readdirSync(dirName).forEach(e => fs.unlinkSync(`${dirName}/${e}`));
  }
};
