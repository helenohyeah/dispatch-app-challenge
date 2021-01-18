const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jsonServer = require('json-server');

const server = express();
const PORT = 8080;

// Middleware

server.use(cors());
server.use(morgan('dev'));
server.use('/api', jsonServer.router('db.json'));

// Mock Data
// const tasks = [{
//   "id": 1,
//   "start": {
//     "city": "Toronto",
//     "lat": 43.653,
//     "lng": -79.383
//   },
//   "end": {
//     "city": "Montreal",
//     "lat": 45.502,
//     "lng": -73.567
//   },
//   "frieght": "Groceries"
// },
// {
//   "id": 2,
//   "start": {
//     "city": "Toronto",
//     "lat": 43.653,
//     "lng": -79.383
//   },
//   "end": {
//     "city": "Ottawa",
//     "lat": 45.421,
//     "lng": -75.697
//   },
//   "freight": "Parcels"
// }]

// Routes

server.get('/', (req, res) => res.send('Hello from Server!'));

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});