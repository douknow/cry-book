const request = require('request');
const iconv = require('iconv-lite');

const option = {
  uri: '',
  method: 'get',
  encoding: null,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
  }
  // timeout: 5000
};

const getPageContent = (url, decode = 'gbk') => {
  option.uri = url;
  return new Promise((resolve, reject) => {
    request(option, (err, res, body) => {
      if (err) {
        console.log(err);
        return reject(url);
      }

      if (res.statusCode === 200) {
        // Request OK!
        console.log('Request ok!');
        resolve(iconv.decode(body, decode));
      } else {
        console.log('Bad Request!\nStates: ' + res.statusCode);
        reject(url);
      }
    });
  });
};

module.exports = getPageContent;
