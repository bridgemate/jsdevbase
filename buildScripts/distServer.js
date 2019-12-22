//this file  will configure our webserver that will serve up the files in the src directory

import express from 'express';
import path from 'path';
import open from 'open';
import chalk from 'chalk';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

//mock database with hard-coded data
// app.get('/users', function(req, res) {
//   res.json([
//     {"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bobsmith@gmail.com"},
//     {"id": 2, "firstName": "Brenda", "lastName": "Smyth", "email": "bsmyth@gmail.com"},
//     {"id": 2, "firstName": "Billy", "lastName": "Smath", "email": "williamsmath@gmail.com"}
//   ])
// })

app.listen(port, function(err) {
  err ? console.log(chalk.purple(err)) : open('http://localhost:' + port)
});
