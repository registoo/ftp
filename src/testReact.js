const path = require("path");
const fs = require("fs");

const str = path.join("src/новая папка", "files.json");
const a = str.split(path.sep);
console.log(a);
