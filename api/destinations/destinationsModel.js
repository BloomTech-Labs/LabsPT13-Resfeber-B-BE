const db = require('../../data/db-config');
const pinnedId = 'Sedwhqjkbqjyediseturhuqauh';
module.exports = {
  addDestination,
  deleteDestination,
  getPinnedDestinations,
  unpinDestination,
  getDestination,
};
//helpers go here

async function addDestination(destination, pinAction = false) {
  if (pinAction === false) {
    const itineraries = await db('itineraries as i').where(
      'i.user_id',
      destination.user_id
    );
    let found = false;

    for (let i = 0; i < itineraries.length; i++) {
      if (
        itineraries[i].id == destination.itinerary_id &&
        itineraries[i].title == pinnedId
      ) {
        return 'Invalid itinerary ID';
      } else if (itineraries[i].id == destination.itinerary_id) {
        found = true;
      }
    }

    if (found === false) {
      return 'Invalid itinerary ID';
    }
  } else {
    const pinnedItinerary = await db('itineraries as i').where(
      'i.title',
      pinnedId
    );
    destination['itinerary_id'] = pinnedItinerary[0].id;
  }

  const destination_id = await db('destinations').insert(destination, ['id']);
  console.log(destination_id);

  return pinAction === false
    ? {
        message: `Successfully posted destination to itinerary ID ${destination.itinerary_id}`,
        destination_id: destination_id[0].id,
      }
    : {
        message: `Successfully posted destination to pinned`,
        destination_id: destination_id[0].id,
      };
}
function getPinnedDestinations(user_id) {
  return db('itineraries as i')
    .where('i.user_id', user_id)
    .andWhere('i.title', pinnedId)
    .join('destinations as d', 'd.itinerary_id', '=', 'i.id')
    .select('d.destName', 'd.lat', 'd.lon', 'd.id');
}
async function deleteDestination(user_id, itinerary_id, destination_id) {
  const illegalItinerary = await db('itineraries as i')
    .where('i.title', pinnedId)
    .andWhere('i.user_id', user_id);
  console.log(illegalItinerary[0].id);
  if (itinerary_id == illegalItinerary[0].id) {
    return 'Invalid itinerary ID';
  }
  return db('destinations as d')
    .where('d.id', destination_id)
    .andWhere('d.user_id', user_id)
    .del();
}

async function unpinDestination(user_id, destination_id) {
  const pinnedItinerary = await db('itineraries as i')
    .where('i.title', pinnedId)
    .andWhere('i.user_id', user_id)
    .select('i.id');
  const itinerary_id = pinnedItinerary[0].id;

  return db('destinations as d')
    .where('d.id', destination_id)
    .andWhere('d.user_id', user_id)
    .andWhere('d.itinerary_id', itinerary_id)
    .del();
}
function getDestination(user_id, destination_id) {
  return db('destinations as d')
    .where('d.user_id', user_id)
    .andWhere('d.id', destination_id);
}
