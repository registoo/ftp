const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const hashWatcher = require('./src/serverSide/hashWatcher');
const initJsonHash = require('./src/serverside/initJsonHash');
const JSONchange = require('./src/serverSide/JSONchangeEmitter');
const bodyParser = require('body-parser');

const serveDir = 'dist';
const serveFullDir = path.join(__dirname, serveDir);
const ftpFiles = path.join(__dirname, '..', 'FTPfiles');

// async function mainFunction(dir) {
//   // инициализирует JSON с хэшами файлов в папке dir
//   await initJsonHash(dir, 'SHA1');
//   // ставит вотчера на папку dir
//   hashWatcher(dir);
// }

// mainFunction(serveFullDir);
// const textParser = bodyParser.text({ type: 'plaint/text' });

// app.post('/checkfronthash', textParser, function(req, res) {
//   console.log('body: ', req.body);
//   res.send('Ответ сервера');

//   JSONchange.on('change', e => {
//     if (e) console.log(`JSONchange error:\r\nconsole.log(e)`);

//     return;
//   });
// });

// try {
// } catch (err) {
//   console.log(err);
// }

// app.use(express.static(serveFullDir));
console.log(ftpFiles);
app.use(express.static(ftpFiles));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
