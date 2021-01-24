# 🚚 Dispatch Me

## About

DispatchMe is a simple web application that allows a single dispatcher to manage tasks and routes for a driver. Built as my submission for Rose Rocket's Coding Challenge.

<<<<<<< HEAD
View demo: [https://dispatch-app-challenge.netlify.app/](https://dispatch-app-challenge.netlify.app/)

Server deployed on: [Heroku](https://dispatch-app-challenge.herokuapp.com/api/tasks)
=======
Server deployed on [Heroku](https://dispatch-app-challenge.herokuapp.com/api/tasks)
>>>>>>> 5b1ec2ccda80a777aebe2f04b77647d2075c33e0

### Built with:

- Front-end: React, react-bootstrap and react-google-maps
- Back-end: Express using json-server to mock REST APIs

### Features

- Create a task with a start location, end location, and freight description
- View each task on a map with color differentiating each task
- Edit or delete tasks
- Generate an optimized route based on tasks
- [Additional features](./FEATURES.md)

## How to run locally

1. Clone repo `git clone git@github.com:helenohyeah/keyboard-warrior.git`

### Server

1. `cd server && npm install` to install server-side dependencies
2. `npm run` to start the server on [localhost:8080](http://localhost:8080/)

Optional:

- To change ports: create a .env file and set the `PORT`
- To seed database: `npm run seed`
- To reset database: `npm run reset`

### Client

1. On a second terminal `cd client && npm install` to install client-side dependencies
2. Generate a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
3. Create a .env file and set `REACT_APP_GOOGLE_API_KEY` to your Google Maps API key
4. `npm run` to start the client on [localhost:3000](http://localhost:3000/)

Optional:

- To change server url: in your .env file set `REACT_APP_SERVER_BASE_URL`
- To run tests: `npm test`

## Known Issues

- Compile error where a useEffect has missing dependencies because it only meant to run on first load. Look into useCallback as potential solution.
