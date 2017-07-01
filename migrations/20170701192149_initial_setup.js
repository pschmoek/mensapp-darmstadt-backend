exports.up = function(knex, Promise) {
  return knex.schema.createTable('mensa', function(table){
    table.increments();
    table.string('location');
    table.string('subLocation');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mensa');
};
