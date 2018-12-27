const express = require('express');
const app = express();
const search = require('./src/getFiles.js')

app.get('/', function (req, res) {
  res.send(search(__dirname));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
