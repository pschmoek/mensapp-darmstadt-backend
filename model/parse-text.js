module.exports = function (text) {
  return text ? (text + '').trim().replace(/\s+/g, ' ') : '';
}
