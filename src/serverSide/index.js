const fs = require("fs");
const getFiles = require("./getFiles");
const path = require("path");

const callback = err => {
  if (err) throw err;
};

function f(base, targetDir) {
  const filesObj = getFiles(base);
  fs.writeFile(targetDir, JSON.stringify(filesObj, false, 2), callback);
}

module.exports = f;
