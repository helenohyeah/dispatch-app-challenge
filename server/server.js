const express = require('express');
const server = express();
const PORT = 8080;

server.get('/', (req, res) => {
  res.send('Hello from Server!');
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});