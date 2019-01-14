const fs = require("fs");
const path = require("path");

const search = base => {
  // base should be a string
  const arr = [];
  const ftp = base;
  const getFiles = base => fs.readdirSync(base);
  function func(item) {
    const currentDir = path.join(this.root, item);
    const state = fs.statSync(currentDir);
    if (state.isDirectory(currentDir)) {
      switch (true) {
        case item[0] == ".":
          break;
        case item == "node_modules":
          break;
        default:
          getFiles(currentDir).map(func, { root: currentDir });
      }
    } else {
      arr.push(path.relative(base, currentDir));
    }
  }
  getFiles(base).map(func, { root: base });
  return arr;
};

module.exports = search;
