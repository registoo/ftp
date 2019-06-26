const express = require('express');
const app = express();
const path = require('path');
const serverBody = require('./new/serverBody.js');

const httpHere = path.join(__dirname, 'dist');
const ftpHere = path.join(__dirname, '..', '..', '..', 'FTPvideo');

serverBody(ftpHere);

app.use('/files', express.static(ftpHere));
app.use(express.static(httpHere));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
