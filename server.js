const express = require('express');
const app = express();
const search = require('./src/getFiles.js')

app.use(express.static('dist'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
