const express = require('express');
const authRequired = require('../middleware/authRequired');
const router = express.Router();
const Destinations = require('./destinationsModel');
//Try to solve this!
const pinnedId = 'Sedwhqjkbqjyediseturhuqauh';

/**
 * @swagger
 * /destinations/pinned:
 *  get:
 *    description: Get all pinned destinations associated with user
 *    summary: Returns a list of pinned destinations
 *    security:
 *      - okta: []
 *    tags:
 *      - pinned
 *    responses:
 *      200:
 *        description: array of pinned destinations
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Destination'
 *              example:
 *                - destination_id: 896
 *                  destName: 'San Francisco'
 *                  lat: 37.7749
 *                  lon: 122.4194
 *                - destination_id: 917
 *                  destName: 'New York'
 *                  lat: 40.7128
 *                  lon: 74.0060
 *                - destination_id: 1098
 *                  destName: 'Los Angeles'
 *                  lat: 34.0522
 *                  lon: 118.2437
 *
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/pinned', authRequired, function (req, res) {
  const user_id = req.profile.id;
  Destinations.getPinnedDestinations(user_id, pinnedId)
    .then((itinerary) => {
      res.status(200).json(itinerary);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
* @swagger
* /destinations/pinned:
*  post:
*    description: Post (pin) a destination to user profile
*    summary: Save a destination to 'pinned' in user profile
*    security:
*      - okta: []
*    tags:
*      - pinned
*    requestBody:
*      description: Destination to be pinned
*      content:
*        application/json:
*          schema:
*           $ref: '#/components/schemas/Destination'
*    responses:
*      201:
*        description: post success message
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Success'
*              example:
*                - message: 'Destination ID 386 was pinned successfully'
*

*      401:
*        $ref: '#/components/responses/UnauthorizedError'
*      403:
*        $ref: '#/components/responses/UnauthorizedError'
*/

router.post('/pinned', authRequired, function (req, res) {
  const user_id = req.profile.id;
  const destName = req.body.destName;
  const lat = req.body.lat;
  const lon = req.body.lon;

  const destination = { user_id, destName, lat, lon };

  Destinations.addDestination(destination, true)
    .then((itinerary) => {
      res.status(200).json(itinerary);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
* @swagger
* /destinations/{itinerary_id}:
*  post:
*    description: Post a destination to user itinerary
*    summary: Save a destination to an itinerary in the user profile
*    security:
*      - okta: []
*    tags:
*      - destinations
*    requestBody:
*      description: Destination to be saved
*      content:
*        application/json:
*          schema:
*           $ref: '#/components/schemas/Destination'
*    responses:
*      201:
*        description: post success message
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Success'
*              example:
*                - message: 'Destination ID 386 was successfully added to itinerary ID 73'
*

*      401:
*        $ref: '#/components/responses/UnauthorizedError'
*      403:
*        $ref: '#/components/responses/UnauthorizedError'
*/

router.post('/:itinerary_id', authRequired, function (req, res) {
  const user_id = req.profile.id;
  const itinerary_id = req.params.itinerary_id;
  const destName = req.body.destName;
  const lat = req.body.lat;
  const lon = req.body.lon;

  const destination = { user_id, itinerary_id, destName, lat, lon };

  Destinations.addDestination(destination)
    .then((itinerary) => {
      res.status(200).json(itinerary);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
* @swagger
* /destinations/pinned/{destination_id}:
*  delete:
*    description: Delete (remove) a destination from user profile
*    summary: Remove a destination from 'pinned' in user profile
*    security:
*      - okta: []
*    tags:
*      - pinned

*    responses:
*      201:
*        description: post success message
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Success'
*              example:
*                - message: 'Destination 658 was deleted successfully'

*

*      401:
*        $ref: '#/components/responses/UnauthorizedError'
*      403:
*        $ref: '#/components/responses/UnauthorizedError'
*/

router.delete('/pinned/:destination_id', authRequired, function (req, res) {
  const destination_id = req.params.destination_id;
  const user_id = req.profile.id;

  Destinations.unpinDestination(user_id, destination_id)
    .then((response) => {
      if (response === 1) {
        res.status(200).json({
          message: `destination ID ${destination_id} deleted successfully`,
        });
      } else {
        res.status(500).json({
          message: `could not process request. Please double check the itinerary and destination IDs`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
* @swagger
* /destinations/{itinerary_id}:
*  delete:
*    description: Delete (remove) a destination from user profile
*    summary: Remove a destination from a specific itinerary in user profile
*    security:
*      - okta: []
*    tags:
*      - destinations

*    responses:
*      201:
*        description: post success message
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Success'
*              example:
*                - message: 'Destination 658 was deleted successfully'

*

*      401:
*        $ref: '#/components/responses/UnauthorizedError'
*      403:
*        $ref: '#/components/responses/UnauthorizedError'
*/

router.delete('/:itinerary_id/:destination_id', authRequired, function (
  req,
  res
) {
  const destination_id = req.params.destination_id;
  const itinerary_id = req.params.itinerary_id;
  const user_id = req.profile.id;

  Destinations.deleteDestination(user_id, itinerary_id, destination_id)
    .then((response) => {
      if (response === 1) {
        res.status(200).json({
          message: `destination ID ${destination_id} deleted successfully`,
        });
      } else {
        res.status(500).json({
          message: `could not process request. Please double check the itinerary and destination IDs`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

module.exports = router;
