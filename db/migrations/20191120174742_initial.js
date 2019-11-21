
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('venue');
      table.string('crestUrl');
      table.string('founded');

      table.timestamp(true, true);
    }),

    knex.schema.createTable('players', (table) => {
      table.increments('id').primary;
      table.string('name');
      table.string('position');
      table.string('nationality');
      table.string('role');
      table.integer('shirtNumber').unsigned();

      table.timestamp(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('teams'),
    knex.schema.dropTable('players'),
  ])
};
