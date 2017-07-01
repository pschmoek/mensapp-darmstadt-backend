const http = require('http');

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let result = '';
      res.on('data', data => result += data);
      res.on('end', () => resolve(result));
    });
  });
}
