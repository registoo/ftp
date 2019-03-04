const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const hashWatcher = require("./src/serverSide/hashWatcher");
const initJsonHash = require("./src/serverside/initJsonHash");

const serveDir = "dist";
// делает абсолютный путь к папке
const serveFullDir = path.join(__dirname, serveDir);

async function mainFunction(dir) {
  // инициализирует JSON с хэшами файлов в папке dir
  await initJsonHash(dir, "SHA1");
  // ставит вотчера на папку dir
  hashWatcher(dir);
  app.use(express.static(dir));

  app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
  });
}

mainFunction(serveFullDir);
