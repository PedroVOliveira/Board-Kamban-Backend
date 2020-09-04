
exports.up = function(knex) {
    return knex.schema.createTable('step', function (table) {
        table.increments('id').primary();
        table.boolean('deleted')
        table.string('title').notNullable();
        table.integer('board_id').unsigned().notNullable();
        table.foreign('board_id').references('id').inTable('board'); 
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('step');
};
