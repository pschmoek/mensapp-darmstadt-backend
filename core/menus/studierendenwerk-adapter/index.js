const moment = require('moment');

const parseSite = require('./parse-site');
const urlMenuPairs = require('./url-menu-pairs')
const menuDb = require('../../../infra/db/menus');

module.exports = {

  async readMenus() {
    const startMoment = moment().utc().format();
    const menusFromSite = await Promise.all(urlMenuPairs.map(p => parseSite(p)));
    const endMoment = moment().utc().format();

    const summary = await menuDb.save(menusFromSite, startMoment, endMoment);

    return summary;
  }

}
