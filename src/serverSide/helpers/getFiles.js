const fs = require("fs");
const path = require("path");
const checkSHA1 = require("./getHash");

const searchFiles = base => {
  // base should be a string
  const obj = { __files__: [] };
  // getFiles возвращает массив файлов и папок первого уровня каталога base
  const getFiles = base => fs.readdirSync(base);
  function func(item) {
    // currentDir возвращает абсолютный путь к файлу от диска
    const currentDir = path.join(this.root, item);
    const state = fs.statSync(currentDir);
    if (state.isDirectory(currentDir)) {
      getFiles(currentDir).map(func, { root: currentDir });
      return;
    }
    console.log(base, " ", currentDir, " ", path.relative(base, currentDir));
    obj.__files__.push(path.relative(base, currentDir));
  }
  getFiles(base).map(func, { root: base });
  return obj;
};

function innerSeparator(mustBeArray) {
  const obj = {};
  function addFile(elem, targetObj) {
    if (
      targetObj.hasOwnProperty("__files__") &&
      Array.isArray(targetObj.__files__)
    ) {
      targetObj.__files__.push(elem);
      return;
    } else if (!targetObj.hasOwnProperty("__files__")) {
      targetObj.__files__ = [];
      targetObj.__files__.push(elem);
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

function searchFlatten(base, targetDir) {
  const obj = searchFiles(base);
  injectJson(obj, targetDir);
}
function separator(base, targetDir) {
  const obj = require("../__json_sha1__.json");
  const properties = Object.getOwnPropertyNames(obj);
  const o = {};
  properties.map(elem => {
    const dist = path.join(__dirname, "../../../dist");
    const innerDir = path.relative(dist, elem);
    const f = arr => {
      const lastElem = arr.pop();
      if (arr.length > 0) {
        const q = arr.reduce(elem => {
          const a = (o[elem] = o[elem] || {});
          console.log(a, o);
          return a;
        }, o);
        q.files = q.files || [];
      } else {
        // o.files = o.files || [];
        // o.files.push(lastElem);
      }
    };
    f(innerDir.split(path.sep));
  });
  fs.writeFileSync("qwerty.js", JSON.stringify(o, false, 2));
  // const separator = innerSeparator(obj);
  // injectJson(separator, targetDir);
}
// searchFiles возвращает объект со свойством files со списком файлов директории.
// searchFlatten берёт массив searchFiles и добавляет его в файл JSON targetDir.
// separator вызывает searchFiles и вызовом innerSeparator преобразует полученный
//           плоский массив в 3D вид. Добавляет результат в файл JSON targetDir.
// base - директория для поиска файлов.
// targetDir - файл JSON для записи найденных файлов.

const callback = err => {
  if (err) throw err;
};
function injectJson(filesObj, targetDir) {
  fs.writeFile(targetDir, JSON.stringify(filesObj, false, 2), callback);
}

// module.exports = separator;

separator("dist");
