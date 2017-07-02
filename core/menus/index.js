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
  },

  async getMeals(date) {
    const meals = await reportingDb.getMeals(date);

    const result = new Map();
    for (const meal of meals) {
      let group = result.get(meal.id);
      if (!group) {
        group = {
          id: meal.id,
          title: meal.title,
          locations: []
        };
        result.set(meal.id, group);
      }

      group.locations.push({
        location: meal.location,
        subLocation: meal.sub_location,
        price: meal.price
      });
    }

    return Array.from(result.values());
  }
}
