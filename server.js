const express = require('express');
const app = express();
const path = require('path');
const createInitJSON = require('./new/serverSide/createInitJSON.js');

const ftpHere = require('./CONSTANTS').storage;
const httpHere = require('./CONSTANTS').singleWebpackEntryPointDir;

createInitJSON(ftpHere);

app.use('/files', express.static(ftpHere));
app.use(express.static(httpHere));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
