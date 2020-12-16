module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Resfeber',
      version: '0.1.0',
      description:
        'Welcome to the Resfeber API documentation! The endpoints below will allow you to manage all CRUD operations for users, itineraries, destinations, and pinned destinations. Data science endpoints are currently not operational but their schemas have been included for reference',
      license: {
        name: 'MIT',
        url: 'https://en.wikipedia.org/wiki/MIT_License',
      },
    },
    tags: [
      {
        name: 'status',
        description: 'Everything about your status',
      },
      {
        name: 'profile',
        description: 'Operations for profile',
      },
      {
        name: 'data',
        description: 'Operations for data science service',
      },
      {
        name: 'itineraries',
        description: 'Operations for itineraries',
      },
      {
        name: 'destinations',
        description:
          'Operations for adding and removing destinations from itineraries',
      },
      {
        name: 'pinned',
        description: 'Operations for pinning destinations',
      },
    ],
    externalDocs: {
      description: 'Data Science scaffold service docs',
      url: 'https://ds.labsscaffolding.dev/',
    },
    components: {
      securitySchemes: {
        okta: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Okta idToken JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        BadRequest: {
          description: 'Bad request. profile already exists',
        },
        NotFound: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'A message about the result',
                    example: 'Not Found',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./api/**/*Router.js'],
};
