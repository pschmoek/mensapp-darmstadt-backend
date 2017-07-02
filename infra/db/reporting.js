const pg = require('./knex');

module.exports = {
  async getMensaWithMenusOnDate(mensaId, date) {
    return pg('mensa')
      .leftJoin('menu_item', 'mensa.id', 'menu_item.mensa_id')
      .leftJoin('meal', 'menu_item.meal_id', 'meal.id')
      .leftJoin('import', 'menu_item.import_id', 'import.id')
      .where({
        'mensa.id': +mensaId,
        'menu_item.date': date
      })
      .select('*');
  }
}
