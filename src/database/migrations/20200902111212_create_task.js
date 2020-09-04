
exports.up = function(knex) {
    return knex.schema.createTable('task', function (table) {
        table.increments('id').primary();
        table.boolean('deleted');
        table.string('title').notNullable();
        table.string('content').notNullable();
        table.datetime('date').notNullable();
        table.integer('step_id').unsigned().notNullable();
        table.foreign('step_id').references('id').inTable('step');
        
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('task');
};
