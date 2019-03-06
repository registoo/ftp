const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const hashWatcher = require("./src/serverSide/hashWatcher");
const initJsonHash = require("./src/serverside/initJsonHash");
const WebSocket = require("ws").Server;

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

const WWW = new WebSocket(
  { host: "127.0.0.1", port: 3001, path: "/wpw" },
  () => {
    "new ws callback";
  }
);

WWW.on("connection", function open(ws) {
  ws.send("усепшно запустилась эта хуйня");
  console.log("connection extebl");
  ws.on("message", function incoming(data) {
    console.log(data);
  });
  ws.on("error", err => {
    console.log("ws err\r\n", err);
  });
});
