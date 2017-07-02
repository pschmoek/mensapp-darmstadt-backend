const pg = require('./knex');

module.exports = {
  async sync(meals) {
    const existingEntitiesInDb = await this.getAll();
    for (const meal of meals) {
      const existingInDb = existingEntitiesInDb.find(m => meal.title === m.title);
      meal.id = existingInDb ? existingInDb.id : await this.add(meal);
    }
  },

  async add(item) {
    return pg('meal').insert(item).returning('id');
  },

  async getAll() {
    return pg('meal').select('*');
  }
}
