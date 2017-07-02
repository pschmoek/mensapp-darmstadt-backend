const pg = require('./knex');

module.exports = {
  async addOrGetAll(mensas) {
    const existingMensasInDb = await this.getAll();
    const existingMensas = [];
    const newMensas = [];

    for (const mensa of mensas) {
      const existingInDb = existingMensasInDb
        .find(m => m.location === mensa.location 
                   && m.subLocation === mensa.subLocation);
      if (existingInDb) {
        existingMensas.push(existingInDb);
      } else {
        newMensas.push(mensa);
      }
    }

    const addedMensas = await this.addAll(newMensas);

    return existingMensas.concat(addedMensas);
  },

  async addAll(mensas) {
    if (mensas.length < 1) {
      return [];
    }

    return pg('mensa').insert(mensas).returning('*');
  },

  async getAll() {
    return pg('mensa').select('*');
  }
}
