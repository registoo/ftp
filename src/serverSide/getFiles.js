const fs = require("fs");
const path = require("path");
const checkSHA1 = require("./checkSHA1");

const searchFiles = base => {
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

function innerSeparator(mustBeArray) {
  const obj = {};
  function addFile(elem, targetObj) {
    if (targetObj.hasOwnProperty("files") && Array.isArray(targetObj.files)) {
      targetObj.files.push(elem);
      return;
    } else if (!targetObj.hasOwnProperty("files")) {
      targetObj.files = [];
      targetObj.files.push(elem);
      return;
    }
    throw new Error("Files not an array");
  }
  function innerMap(elem) {
    const separatePathToArr = elem.split(path.sep);
    const file = separatePathToArr.slice().pop();
    const dir = separatePathToArr.slice(0, -1);
    if (dir.length === 0) {
      addFile(file, obj);
      return;
    }
    const pathToFile = dir.reduce(
      (obj, key) => (obj = obj[key] = obj[key] || {}),
      obj
    );
    addFile(elem, pathToFile);
  }
  mustBeArray.map(innerMap);
  return obj;
}
const callback = err => {
  if (err) throw err;
};
function injectJson(filesObj, targetDir) {
  fs.writeFile(targetDir, JSON.stringify(filesObj, false, 2), callback);
}
function searchFlatten(base, targetDir) {
  const obj = searchFiles(base);
  injectJson(obj, targetDir);
}
function separator(base, targetDir) {
  const obj = searchFiles(base).files;
  const separator = innerSeparator(obj);
  injectJson(separator, targetDir);
}
// searchFiles возвращает объект со свойством files со списком файлов директории.
// searchFlatten берёт массив searchFiles и добавляет его в файл JSON targetDir.
// separator вызывает searchFiles и вызовом innerSeparator преобразует полученный
//           плоский массив в 3D вид. Добавляет результат в файл JSON targetDir.
// base - директория для поиска файлов.
// targetDir - файл JSON для записи найденных файлов.
module.exports.flatten = searchFlatten;
module.exports.dipper = separator;
