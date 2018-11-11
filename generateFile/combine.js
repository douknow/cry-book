const child_process = require('child_process');

module.exports = (title) => {
  child_process.exec(
    `cd  ${__dirname}/../out && rm -rf ${title}.epub && zip -0Xq ${title}.epub mimetype && zip -Xr9Dq ${title}.epub * -x mimetype -x ${title}.epub && cp ${title}.epub ~/Desktop`,
    (err, stdout, stderr) => {
      if (err) console.log(err);
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  );
};
