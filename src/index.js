const express = require('express');
const http= require("http")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const app = express();
const server = http.createServer(app);

dotenv.config({path:'.env'})

connectDB()

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.get('/', (req, res) => {
  res.send('Successful response.');
});

server.listen(3000, () => console.log('Example app is listening on port 3000.'));