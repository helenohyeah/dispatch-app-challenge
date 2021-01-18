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

// Routes

server.get('/', (req, res) => res.send('Hello from Server!'));

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});