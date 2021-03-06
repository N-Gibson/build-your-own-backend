
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('area');
      table.string('venue');
      table.string('crestUrl');
      table.string('founded');
      table.string('clubColors');

      table.timestamp(true, true);
    }),

    knex.schema.createTable('players', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('position');
      table.string('nationality');
      table.string('role');
      table.integer('shirtNumber').unsigned();
      table.integer('team_id').unsigned();
      table.foreign('team_id')
        .references('teams.id')

      table.timestamp(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('players'),
    knex.schema.dropTable('teams'),
  ])
};
