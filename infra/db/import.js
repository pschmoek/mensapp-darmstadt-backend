const pg = require('./knex');

module.exports = {

  async createImport(start, end) {
    const created = await pg('import').insert({ start: start, end: end }).returning('*');
    
    return created[0];
  }

}
