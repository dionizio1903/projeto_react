exports.up = function(knex) {
    return knex.schema.createTable('casos',function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('pessoas_id').notNullable();

        table.foreign('pessoas_id').references('id').inTable('pessoas');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('casos');
};
