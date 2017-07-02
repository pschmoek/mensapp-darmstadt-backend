const parseSite = require('./parse-site');

const urlMenuPairs = require('./url-menu-pairs')
const db = require('../../infra/db/menus');

module.exports = {
  async readFromSite() {
    const startMoment = new Date().toISOString();

    const menusFromSite = await Promise.all(urlMenuPairs.map(p => parseSite(p)));

    return db.save(menusFromSite, startMoment);
  }
}
