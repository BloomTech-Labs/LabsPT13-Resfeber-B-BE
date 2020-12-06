const itineraries_destinations = [...new Array(5)].map((i, idx) => ({
    itinerary_id: idx+1,
  destination_id: idx+1
}));


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('destinations')
    .then(function () {
      // Inserts seed entries
      return knex('itineraries_destinations').insert(itineraries_destinations);
    });
};
