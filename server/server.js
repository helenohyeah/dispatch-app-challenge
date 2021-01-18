const express = require('express');
const server = express();
const PORT = 8080;
const cors = require('cors');
const morgan = require('morgan');

// Middleware

server.use(cors());
server.use(morgan('dev'));

// Mock Data

const tasksData = [
  {
    start: { city: 'Toronto', lat: 43.653, lng: -79.383 },
    end: { city: 'Montreal', lat: 45.502, lng: -73.567 },
    frieght: 'Groceries'
  },
  {
    start: { city: 'Toronto', lat: 43.653, lng: -79.383 },
    end: { city: 'Ottawa', lat: 45.421, lng: -75.697 },
    freight: 'Parcels'
  }
];

// Routes

server.get('/', (req, res) => res.send('Hello from Server!'));
server.get('/tasks', (req, res) => res.json(tasksData));

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});