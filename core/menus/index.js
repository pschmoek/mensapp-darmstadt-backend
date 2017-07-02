const parseSite = require('./parse-site');

const urlMenuPairs = require('./url-menu-pairs')
const menuDb = require('../../infra/db/menus');
const mensaDb = require('../../infra/db/mensa');
const reportingDb = require('../../infra/db/reporting');

module.exports = {

  async importMenus() {
    const startMoment = new Date().toISOString();
    const menusFromSite = await Promise.all(urlMenuPairs.map(p => parseSite(p)));
    const summary = await menuDb.save(menusFromSite, startMoment);

    return summary;
  },

  async getAllMensas() {
    return await mensaDb.getAll();
  },

  async getMensasMenuItemsOn(mensaId, date) {
    return reportingDb.getMensaWithMenusOnDate(mensaId, date);
  }

}
