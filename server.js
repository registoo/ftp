const express = require("express");
const app = express();
const fs = require("fs");
let a = 0;
let i = 1;
const arr = [];
fs.watch("./dist", { recursive: true }, (eventype, filename) => {
  const time = new Date().getTime();
  if (a + 20 >= time) {
    a = time;
    return;
  }
  a = time;
  arr.push(i);
  i += 1;
  console.log(filename, eventype, arr[arr.length - 1]);
});

app.use(express.static("dist"));
app.use(express.static("D:Zona Downloads"));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
