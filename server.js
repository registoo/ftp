const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const hashWatcher = require("./src/serverSide/hashWatcher");
const initJsonHash = require("./src/serverside/initJsonHash");

const serveDir = "dist";
const serveFullDir = path.join(__dirname, serveDir);

// fs.watch("./dist", { recursive: true }, (eventype, filename) => {
//   console.log("----------------- WATCHER IS ON -----------------");
//   const fullFilePath = path.join(serveFullDir, filename);
//   hashWatcher(fullFilePath, eventype);
// });

async function mainFunction(dir) {
  await initJsonHash(dir, "SHA1");
  hashWatcher(serveFullDir);
  app.use(express.static(serveDir));

  app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
  });
}

mainFunction(serveFullDir);
