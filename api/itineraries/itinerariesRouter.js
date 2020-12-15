const express = require('express');
const authRequired = require('../middleware/authRequired');
const router = express.Router();
const Itineraries = require('../itineraries/itinerariesModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Itinerary:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *          description: This is the title of the itinerary
 *        description:
 *          type: string
 *          description: A brief description of the itinerary
 *        finished:
 *          type: boolean
 *          description: A value representing whether or not the trip has been completed
 *      example:
 *        title: 'My favorite trip ever'
 *        description: 'this way is the best route to take through Ohio'
 *        finished: false
 *    Destination:
 *      type: object
 *      required:
 *        - lat
 *        - lon
 *      properties:
 *        destName:
 *          type: string
 *          description: This is the name of the destination, optionally passed during pinning
 *        lat:
 *          type: integer
 *          description: The latitude coordinates of the destination
 *        lon:
 *          type: integer
 *          description: The longitude coordinates of the destination
 *      example:
 *        destName: 'San Francisco'
 *        lat: 37.7749
 *        lon: 122.4194
 *    Success:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: "Itinerary/Destination posted/deleted/modified successfully"
 *
 * /itineraries:
 *  get:
 *    description: Get a list of all itineraries associated with user
 *    summary: Returns a list of all user itineraries
 *    security:
 *      - okta: []
 *    tags:
 *      - itineraries
 *    responses:
 *      200:
 *        description: array of itineraries
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Itinerary'
 *              example:
 *                - itinerary_id: '1'
 *                  user_id: '013e4ab94d96542e791f'
 *                  title: 'Elise`s trip'
 *                  description: 'our favorite route'
 *                  finished: 'false'
 *                  destinations: {
 *                    destName: "your destination",
 *                    lat: 42,
 *                    lon: 150}
 *                - itinerary_id: '2'
 *                  user_id: '013e4ab94d96542e791f'
 *                  title: '2020 vacation plans'
 *                  description: 'we had to cancel this one :('
 *                  finished: 'true'
 *                  destinations: {
 *                    destName: "your other destination",
 *                    lat: 79,
 *                    lon: 155}
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/', authRequired, function (req, res) {
  const user_id = req.profile.id;
  Itineraries.getUserItineraries(user_id)
    .then((itineraries) => {
      res.status(200).json(itineraries);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /itineraries/{id}:
 *  get:
 *    description: Get a single itinerary by including its id in the URL parameters
 *    summary: Returns a single itinerary
 *    security:
 *      - okta: []
 *    tags:
 *      - itineraries
 *    responses:
 *      200:
 *        description: array of reeeeee
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Itinerary'
 *              example:
 *                - itinerary_id: '1'
 *                  user_id: '013e4ab94d96542e791f'
 *                  title: 'Elise`s trip'
 *                  description: 'our favorite route'
 *                  finished: 'false'
 *                  destinations: {
 *                    destName: "your destination",
 *                    lat: 42,
 *                    lon: 150}
 *
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/:id', authRequired, function (req, res) {
  let itinId = req.params.id;
  itinId = parseInt(itinId);
  if (!Number.isInteger(itinId)) {
    res.status(400).json({
      message:
        'Please include the itinerary id in the URL with these parameters: /itineraries/{id}',
    });
  }
  const user_id = req.profile.id;
  Itineraries.getSingleItinerary(user_id, itinId)
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
 * /itineraries:
 *  post:
 *    description: Post a single itinerary by including its details in the HTTP request
 *    summary: Posts an itinerary to the user profile
 *    security:
 *      - okta: []
 *    tags:
 *      - itineraries
 *    requestBody:
 *      description: Itinerary to be posted
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: string
 *                description: This is the title of the itinerary
 *              description:
 *                type: string
 *                description: A brief description of the itinerary
 *              finished:
 *                type: boolean
 *                description: A value representing whether or not the trip has been completed
 *            example:
 *              title: 'My favorite trip ever'
 *              description: 'this way is the best route to take through Ohio'
 *    responses:
 *      201:
 *        description: itinerary posted - success message
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Success'
 *              example:
 *                - message: '1 Itinerary posted successfully'
 *
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

//POST - post an itinerary to the user profile
router.post('/', authRequired, function (req, res) {
  const user_id = req.profile.id;
  const itinerary = { ...req.body, user_id, finished: false };
  if (!itinerary.hasOwnProperty('title')) {
    res.status(400).json({
      message:
        'Please include the itinerary title in the http request. Example: { title: "the long commute"} (optional key) - description: "money-saving road trip routes"',
    });
  }
  Itineraries.postItinerary(itinerary)
    .then((insertRes) => {
      res.status(200).json({
        message: `Succesfully posted itinerary ID ${insertRes.itinerary_id}`,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.constraint === 'itineraries_title_unique') {
        res.status(500).json({
          message: 'An itinerary with that name already exists for this user',
        });
      }

      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /itineraries/{id}:
 *  put:
 *    description: Modify an existing itinerary, all fields optional
 *    summary: Modifies an existing itinerary with new values
 *    security:
 *      - okta: []
 *    tags:
 *      - itineraries
 *    requestBody:
 *      description: Itinerary to be posted
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Itinerary'
 *
 *    responses:
 *      201:
 *        description: itinerary posted - success message
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Success'
 *              example:
 *                - message: '1 Itinerary modified successfully'
 *
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.put('/:id', authRequired, function (req, res) {
  const user_id = req.profile.id;
  const itinerary_id = req.params.id;
  const itinerary = { ...req.body, user_id };
  Itineraries.modifyItinerary(user_id, itinerary, itinerary_id)
    .then((insertRes) => {
      res.status(201).json({
        message:
          insertRes === 0
            ? 'Error. Itinerary ID invalid for user'
            : `Itinerary ${itinerary_id} modified successfully`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /itineraries/{id}:
 *  delete:
 *    description: Delete an existing itinerary
 *    summary: Deletes an itinerary from user profile
 *    security:
 *      - okta: []
 *    tags:
 *      - itineraries
 *
 *    responses:
 *      201:
 *        description: itinerary posted - success message
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Success'
 *              example:
 *                - message: '1 Itinerary deleted successfully'
 *
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.delete('/:id', authRequired, function (req, res) {
  const user_id = req.profile.id;
  const itinerary_id = req.params.id;
  Itineraries.deleteItinerary(user_id, itinerary_id)
    .then((insertRes) => {
      res.status(201).json({
        message:
          insertRes === 0
            ? 'Error. Itinerary ID invalid for user'
            : `Itinerary ${itinerary_id} deleted successfully`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
