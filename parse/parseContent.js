const cheerio = require('cheerio');

module.exports = html => {
  const $ = cheerio.load(html);
  const $content = $('#content');

  const sections = $content
    .text()
    .replace(/[\n|　]+/g, '\n')
    .replace(/[<>]/g, '')
    .replace(/&/g, '')
    .split('\n');

  const data = sections.map(value => `<p>${value.trim()}</p>`).join('');
  return data;
};
