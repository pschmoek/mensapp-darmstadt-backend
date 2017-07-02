const moment = require('moment');

const mensaDb = require('../../infra/db/mensa');
const reportingDb = require('../../infra/db/reporting');
const studierendenwerkAdapter = require('./studierendenwerk-adapter');

module.exports = {

  async importMenus() {
    return studierendenwerkAdapter.readMenus();
  },

  async getMensas() {
    const mensas = await mensaDb.getAll();

    return mensas;
  },

  async getMenu(mensaId, date) {
    date = date || moment().format('DD.MM.YYYY');

    return reportingDb.getMenusOnDate(date, mensaId);
  }

}
