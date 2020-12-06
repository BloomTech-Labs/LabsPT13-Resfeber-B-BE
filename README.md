# resfeber

For steps on how to work with this repository [please see here](https://docs.labs.lambdaschool.com/labs-spa-starter/)

# Project

You can find the deployed project at [https://labspt13-resfeber-b-be.herokuapp.com/](https://labspt13-resfeber-b-be.herokuapp.com/).

## Contributors

|                                       [Zoe Brandt](https://github.com/CyrusTheCurator)                                        |
| :---------------------------------------------------------------------------------------------------------------------------: |
|  [<img src="https://zoe-brandt.com/static/media/zoe_main.25e30bab.jpg" width = "200" />](https://github.com/CyrusTheCurator)  |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/CyrusTheCurator)                  |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/zoe-a-brandt/) |

<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![node express](https://img.shields.io/node/v-lts/express)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

[Info on badge creation](https://github.com/badges/shields)

### Key Features

- Authenticate users via Okta token
- Enable client to create, read, update, and delete profiles
- Parse incoming form data through data-science API and return prediction-optimized travel itinerary
- Enable client to save travel itineraries for future review (DS data will be retrieved accordingly)

#### [Link to front end](https://github.com/Lambda-School-Labs/LabsPT13-Resfeber-B-Fe)

#### [Back end](https://labspt13-resfeber-b-be.herokuapp.com/) deployed to Heroku

## Frameworks, Libraries, Services:

####

- Express.js
- PostgreSQL
- Docker
- Okta

# APIs

## Authentication API here

All authentication is handled through Okta, via a javascript web token (jwt) that the user receives from the front-end okta login widget. The token must be listed as a bearer token in the authorization header of the request in order for the jwt to be parsed successfully.

## Misc API here

[Data-science endpoint docs will be linked here](#)

Users can send get requests to data-science endpoints with parameterized queries representing user-specified routes. The data-science API will return all associated prediction data in JSON format, which front-end can display for the user. Since users are able to save destinations, these endpoints will be called periodically to update data on existing saved routes.

## Getting Started

### Enviornment Variables

- `PORT` - API port (optional, but helpful with FE running as well)
  - The following ports are whitelisted for use with okta
    - 3000
    - 8000
    - 8080
- `DS_API_URL` - URL to a data science api. (eg. <https://ds-bw-test.herokuapp.com/>)
- `DS_API_TOKEN` - authorization header token for data science api (eg. SUPERSECRET)
- `DATABASE_URL` - connection string for postgres database
- `OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
- `OKTA_CLIENT_ID` - the okta client ID.

See `.env` file for example values

### Setup postgres

There are 3 options to get postgresql installed locally [Choose one]:

1. Use docker. [Install](https://docs.docker.com/get-docker/) for your platform
   - run: `docker-compose up -d` to start up the postgresql database and pgadmin.
   - Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.
   - If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
     - if the database `api-dev` was not created then start over.
2. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
   - make note of the port, username and password you use to setup the database.
   - Connect your client to the server manually using the values previously mentioned
   - You will need to create a database manually using a client.
   - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
3. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
   - Sign up for a free `Tiney Turtle` plan
   - copy the URL to the DATABASE_URL .env variable
   - make sure to add `?ssl=true` to the end of this url

### Setup the application

- create your project repo by forking or using this as a template.
- run: `npm install` to download all dependencies.
- confirm correct env variables in your `.env` file.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation

See [Backend Documentation](https://labspt13-resfeber-b-be.herokuapp.com/api-docs/) for details on the backend of our project.
