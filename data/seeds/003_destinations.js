const uNG = require('unique-names-generator');
const uniqueNamesGenerator = uNG.uniqueNamesGenerator;
const colors = uNG.colors;
const adjectives = uNG.adjectives;
const animals = uNG.animals;
const Config = {
  dictionaries: [adjectives, colors, animals],
};

function getRandCoords(arg) {
  if (arg === 'lat') {
    return Math.random() * (90 - -90 + -90);
  }
  if (arg === 'lon') {
    return Math.random() * (180 - -180 + -180);
  }
  return "Please specify coord format as an argument of 'lat' or 'lon'";
}

const destinations = [...new Array(5)].map((i, idx) => ({
  user_id: idx + 1,
  lat: getRandCoords('lat'),
  lon: getRandCoords('lon'),
  destName: uniqueNamesGenerator(Config),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('destinations').then(function () {
    // Inserts seed entries
    return knex('destinations').insert(destinations);
  });
};
