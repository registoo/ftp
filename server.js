const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const checkSHA1 = require("./src/serverSide/checkSHA1");

fs.watch("./dist", { recursive: true }, (eventype, filename) => {
  const time = new Date().getTime();
  const fullFilePath = path.join(__dirname, "dist", filename);
  console.log(fullFilePath, eventype, checkSHA1(fullFilePath), new Date());
});

app.use(express.static("dist"));
app.use(express.static("D:Zona Downloads"));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
