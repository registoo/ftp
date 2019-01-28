const fs = require("fs");
const getFiles = require("./getFiles");

const files = base => {
  return {
    files: getFiles(base)
  };
};

const callback = err => {
  if (err) throw err;
};

function f(base, targetDir) {
  const filesObj = files(base);
  fs.writeFile(targetDir, JSON.stringify(filesObj, false, 2), callback);
}

module.exports = f;
