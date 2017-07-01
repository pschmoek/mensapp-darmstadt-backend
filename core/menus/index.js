const parseSite = require('./parse-site');

const urlMenuPairs = require('./url-menu-pairs')
const menuDb = require('../../infra/db/menus');

module.exports = {
  readFromSite() {
    return Promise.all(urlMenuPairs.map(p => parseSite(p)))
      .then(menus => menuDb.save(menus));
  }
}
