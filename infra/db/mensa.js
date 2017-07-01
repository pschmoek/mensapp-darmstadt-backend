const pg = require('./knex');

module.exports = {
  saveAll(mensas) {
    return Promise.all(mensas.map(m => this.save(m)));
  },

  save(mensa) {
    return this.find(mensa.location, mensa.subLocation).then(fromDb => {
      if (fromDb && fromDb.length > 0) {
        return Promise.resolve(fromDb[0]);
      }

      return pg('mensa').insert(mensa).returning('*');
    });
  },

  find(location, subLocation) {
    return pg('mensa')
      .where({location: location, subLocation: subLocation})
      .select('*');
  }
}
