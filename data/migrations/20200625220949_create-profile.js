exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.increments('id').primary();
      table.string('email').unique();
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })
    .createTable('itineraries', function (table) {
      table.increments('id').primary();
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('profiles.id')
        .onDelete('cascade');
      table.string('title');
      table.string('description');
      table.boolean('finished');
    })
    .createTable('destinations', function (table) {
      table.increments('id').primary();
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('profiles.id')
        .onDelete('cascade');
      table.float('lat', 18, 15);
      table.float('lon', 18, 15);
      table.string('destName');
    })
    .createTable('itineraries_destinations', function (table) {
      table
        .integer('itinerary_id')
        .notNullable()
        .unsigned()
        .references('itineraries.id')
        .onDelete('cascade');
      table
        .integer('destination_id')
        .notNullable()
        .unsigned()
        .references('destinations.id')
        .onDelete('cascade');

      table.primary(['itinerary_id', 'destination_id']);
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('itineraries_destinations')
    .dropTableIfExists('destinations')
    .dropTableIfExists('itineraries')
    .dropTableIfExists('profiles');
};
