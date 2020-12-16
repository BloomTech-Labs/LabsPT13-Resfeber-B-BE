const faker = require('faker');

const profiles = [...new Array(5)].map((i, idx) => ({
  id: idx === 0 ? '00u13ol5x1kmKxVJU4x7' : idx,
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles').then(function () {
    // Inserts seed entries
    return knex('profiles').insert(profiles);
  });
};
