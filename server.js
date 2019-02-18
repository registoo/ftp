const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

fs.watch("./dist", (eventype, filename) => {
  console.log(filename);
});

app.use(express.static("dist"));
app.use(express.static("D:Zona Downloads"));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
