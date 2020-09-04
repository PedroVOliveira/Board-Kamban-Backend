
exports.up = function(knex) {
    return knex.schema.createTable('board', function (table) {
        table.increments('id').primary();
        table.boolean('deleted')
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
        
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('board');
};
