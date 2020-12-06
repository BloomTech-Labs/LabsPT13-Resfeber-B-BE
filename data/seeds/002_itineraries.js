const uNG = require('unique-names-generator');
const uniqueNamesGenerator = uNG.uniqueNamesGenerator;
const names = uNG.names;
const Config = {
  dictionaries: [names],
};
const itineraries = [...new Array(5)].map((i, idx) => ({
  user_id: idx + 1,
  title: `${uniqueNamesGenerator(Config)}'s trip`,
  description: 'our favorite route',
  finished: false,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('itineraries').then(function () {
    // Inserts seed entries
    return knex('itineraries').insert(itineraries);
  });
};
