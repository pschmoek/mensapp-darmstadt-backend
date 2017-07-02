exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mensa', function(table){
      table.increments();
      table.string('location');
      table.string('sub_location');
    }),
    knex.schema.createTable('meal', function(table) {
      table.increments();
      table.string('title');
    }),
    knex.schema.createTable('import', function(table) {
      table.increments();
      table.dateTime('start');
      table.dateTime('end');
    }),
    knex.schema.createTable('menu_item', function(table) {
      table.increments();
      table.decimal('price');
      table.string('date');
      table.integer('mensa_id');
      table.integer('meal_id');
      table.integer('import_id');

      table.foreign('mensa_id').references('mensa.id');
      table.foreign('meal_id').references('meal.id');
      table.foreign('import_id').references('import.id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('menu_item'),
    knex.schema.dropTable('mensa'),
    knex.schema.dropTable('import'),
    knex.schema.dropTable('meal')
  ]);
};
