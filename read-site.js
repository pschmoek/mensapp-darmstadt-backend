const http = require('http');

module.exports = async (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let result = '';
      res.on('data', data => result += data);
      res.on('end', () => resolve(result));
    });
  });
}
