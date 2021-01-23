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

server.use(cors());
server.use(morgan('dev'));

// Reset server
server.post("/api/resetDb", (req, res) => {
  fs.readFile(path.join(__dirname, 'initialDb.json'), 'utf8', (err, db) => {
    if (err) throw err;
    fs.writeFile(path.join(__dirname, 'db.json'), db, () => {
      router.db.setState(JSON.parse(db));
      res.sendStatus(200);
    });
  });
});

// Seed server
server.post("/api/seedDb", (req, res) => {
  fs.readFile(path.join(__dirname, 'seeds.json'), 'utf8', (err, db) => {
    if (err) throw err;
    fs.writeFile(path.join(__dirname, 'db.json'), db, () => {
      router.db.setState(JSON.parse(db));
      res.sendStatus(200);
    })
  });
});

// Set routes using json-server mock database
server.use('/api', router);

server.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));