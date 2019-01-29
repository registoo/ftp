const fs = require("fs");
const path = require("path");

const search = base => {
  // base should be a string

  const obj = { files: [] };

  // getFiles возвращает массив файлов и папок первого уровня каталога base
  const getFiles = base => fs.readdirSync(base);

  function func(item) {
    // currentDir возвращает абсолютный путь к файлу от диска
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
      obj.files.push(path.relative(base, currentDir));
    }
  }
  getFiles(base).map(func, { root: base });
  return obj;
};

module.exports = search;
