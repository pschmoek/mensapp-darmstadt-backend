exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', function(table){
    table.increments();
    table.string('title');
    table.decimal('price');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item');
};
