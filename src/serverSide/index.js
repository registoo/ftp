const fs = require("fs");
const getFiles = require("./getFiles");
const path = require("path");

const filesObj = {
  files: getFiles(path.join(__dirname, "../.."))
};
const callback = err => {
  if (err) throw err;
};

fs.writeFile("dist/files.json", JSON.stringify(filesObj, "", 2), callback);
