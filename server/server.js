const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const db = require('./db.json');

const server = express();
const PORT = 8080;

const router = jsonServer.router(db);

// Middleware

server.use(cors());
server.use(morgan('dev'));

// Routes using json-server as database

server.use((req, res, next) => {
  console.log(req.method, req.path)
  if (req.method === 'POST' && req.path === '/api/resetDb/') {
    const initialDb = fs.readFileSync(path.join(__dirname, 'initialDb.json'), 'utf8');
    fs.writeFileSync(path.join(__dirname, 'db.json'), initialDb);
    router.db.setState(JSON.parse(initialDb));
    res.sendStatus(200);
  } else {
    next();
  }
});
server.use('/api', router);

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

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});