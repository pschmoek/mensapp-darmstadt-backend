const pg = require('./knex');

module.exports = {

  async addAll(menuItems, importEntity) {
    const mapped = menuItems.map(m => ({
      price: m.price,
      date: m.date,
      meal_id: m.meal.id,
      mensa_id: m.mensa.id,
      import_id: importEntity.id
    }));

    return pg('menu_item').insert(mapped);
  }
}
