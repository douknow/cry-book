const child_process = require('child_process');

module.exports = () => {
  child_process.exec(
    `cd  ${__dirname}/../out && rm -rf book.epub && zip -0Xq book.epub mimetype && zip -Xr9Dq book.epub * -x mimetype -x book.epub`,
    (err, stdout, stderr) => {
      if (err) console.log(err);
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  );
};
