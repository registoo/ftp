const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const lookServerSide = require("./src/serverSide");
const qwe = require("./src/qwe");
// const initJSONhashSHA1 = require("./src/serverSide/checkSHA1");

const serveDir = "dist";
const serveFullDir = path.join(__dirname, serveDir);

fs.watch("./dist", { recursive: true }, (eventype, filename) => {
  const fullFilePath = path.join(__dirname, serveFiles, filename);
  lookServerSide(fullFilePath, eventype);
});

app.use(express.static(serveDir));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
  qwe(serveFullDir);
});
