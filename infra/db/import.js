const pg = require('./knex');

module.exports = {

  async createImport(start, end) {
    return pg('import').insert({ start: start, end: end }).returning('*');
  }

}
