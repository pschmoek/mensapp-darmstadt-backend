const pg = require('./knex');

module.exports = {
  async addOrGetAll(items) {
    const existingEntitiesInDb = await this.getAll();
    const existingEntities = [];
    const newEntities = [];

    for (const item of items) {
      const existingInDb = existingEntitiesInDb
        .find(i => item.title === i.title 
                   && item.price === i.price);
      if (existingInDb) {
        existingEntities.push(existingInDb);
      } else {
        newEntities.push(item);
      }
    }

    const addedEntities = await this.addAll(newEntities);

    return existingEntities.concat(addedEntities);
  },

  async addAll(items) {
    if (items.length < 1) {
      return [];
    }

    return pg('item').insert(items).returning('*');
  },

  async getAll() {
    return pg('item').select('*');
  }
}
