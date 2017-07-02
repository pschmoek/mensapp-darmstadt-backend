const pg = require('./knex');

module.exports = {
  async sync(mensas) {
    const existingMensasInDb = await this.getAll();
    for (const mensa of mensas) {
      const existingInDb = existingMensasInDb
        .find(m => m.location === mensa.location 
                   && m.sub_location === mensa.subLocation);
      mensa.id = existingInDb ? existingInDb.id : await this.add(mensa);
    }
  },

  async add(mensa) {
    return pg('mensa').insert({
        location: mensa.location,
        sub_location: mensa.subLocation
      }).returning('id');
  },

  async getAll() {
    return pg('mensa').select('*');
  }
}
