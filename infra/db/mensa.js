const pg = require('./knex');

module.exports = {
  async sync(mensas) {
    const existingMensasInDb = await this.getAll();
    for (const mensa of mensas) {
      const existingInDb = existingMensasInDb
        .find(m => m.location === mensa.location 
                   && m.subLocation === mensa.subLocation);
      mensa.id = existingInDb ? existingInDb.id : await this.add(mensa);
    }
  },

  async add(mensa) {
    const created = await pg('mensa').insert({
        location: mensa.location,
        sub_location: mensa.subLocation
      }).returning('id');

    return created[0];
  },

  async getAll() {
    const mensas = await pg('mensa').select('*');

    return mensas.map(m => ({
      id: m.id,
      location: m.location,
      subLocation: m.sub_location
    }));
  }

}
