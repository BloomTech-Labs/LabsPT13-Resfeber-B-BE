const db = require('../../data/db-config');
const pinnedId = 'Sedwhqjkbqjyediseturhuqauh';
module.exports = {
  getUserItineraries,
  getSingleItinerary,
  postItinerary,
  deleteItinerary,
  modifyItinerary,
};
//helpers go here

async function getUserItineraries(id) {
  let itineraries = await db('itineraries as i')
    .where('i.user_id', id)
    .whereNot('i.title', pinnedId);
  const destinations = await db('destinations as d').where('d.user_id', id);
  for (let i = 0; i < itineraries.length; i++) {
    itineraries[i]['destinations'] = [];
    for (let j = 0; j < destinations.length; j++) {
      if (destinations[j].itinerary_id == itineraries[i].id) {
        itineraries[i]['destinations'].push(destinations[j]);
      }
    }
  }
  return itineraries;
}

async function getSingleItinerary(id, itinerary_id) {
  const itinerary = await db('itineraries as i')
    .where('i.user_id', id)
    .andWhere('i.id', itinerary_id)
    .whereNot('i.title', pinnedId);
  if (itinerary[0] == undefined) {
    return { message: 'invalid itinerary ID' };
  }
  const destinations = await db('destinations as d')
    .where('d.user_id', id)
    .andWhere('d.itinerary_id', itinerary_id);
  itinerary[0]['destinations'] = destinations;
  return itinerary;
}

async function postItinerary(itinerary) {
  const itin_res = await db('itineraries as i').insert({ ...itinerary }, [
    'id',
  ]);
  const itinerary_id = itin_res[0].id;
  return { ...itinerary, itinerary_id };
}

function modifyItinerary(id, itinerary, itinerary_id) {
  return db('itineraries as i')
    .where('i.user_id', id)
    .andWhere('i.id', itinerary_id)
    .whereNot('title', pinnedId)
    .update(itinerary);
}

function deleteItinerary(id, itinerary_id) {
  return db('itineraries as i')
    .where('i.id', itinerary_id)
    .andWhere('i.user_id', id)
    .del();
}
