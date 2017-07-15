const pg = require('./knex');

module.exports = {

  async getMenusOnDate(date, mensaId) {
    return pg('mensa')
      .leftJoin('menu_item', 'mensa.id', 'menu_item.mensa_id')
      .leftJoin('meal', 'menu_item.meal_id', 'meal.id')
      .leftJoin('import', 'menu_item.import_id', 'import.id')
      .where(function() {

        const whereClause = 
          this.where('import_id', pg('menu_item').where({date:date}).max('import_id'))
              .andWhere('menu_item.date', date);

        if (mensaId) {
          whereClause.andWhere('mensa.id', +mensaId);
        }
        
      })
      .select('*');
  },

  async getMeals(date) {
    let query = pg('meal');
    if (!date) {
      return query.select('meal.id', 'meal.title');
    }
    
    return query
      .leftJoin('menu_item', 'meal.id', 'menu_item.meal_id')
      .leftJoin('mensa', 'mensa.id', 'menu_item.mensa_id')
      .where(function() {
        this.where('import_id', pg('menu_item').where({date:date}).max('import_id'))
            .andWhere('menu_item.date', date);
      })
      .select('meal.id',
              'meal.title',
              'menu_item.price',
              'mensa.location',
              'mensa.sub_location',
              'mensa.id as mensa_id');
  }

}
