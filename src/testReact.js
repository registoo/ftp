const path = require("path");
const fs = require("fs");
const files = require("./files.json").files;

const f = () => {
  const z = Object.assign(files);
  console.log(Object.getOwnPropertyNames(z));
};

const obj = {};

function separator(qwe) {
  function innerMap(elem) {
    const separatePathToArr = elem.split(path.sep);
    const file = separatePathToArr.slice().pop();
    const dir = separatePathToArr.slice(0, -1);
    ff(dir, file, elem);
  }
  qwe.map(innerMap);
}

separator(files);

const createObjProp = (obj, elem) => {
  return obj.elem;
};

function ff(dir, file, elem) {
  if (dir.length === 0) {
    addFile(file, obj);
    return;
  }
  const pathToFile = dir.reduce(
    (obj, key) => (obj = obj[key] = obj[key] || {}),
    obj
  );
  pathToFile.files = pathToFile.files || [];
  addFile(elem, pathToFile);
}

function addFile(elem, targetObj) {
  if (targetObj.hasOwnProperty("files") && Array.isArray(targetObj.files)) {
    targetObj.files.push(elem);
    return;
  } else if (!obj.hasOwnProperty("files")) {
    targetObj.files = [];
    targetObj.files.push(elem);
    return;
  }
  throw new Error("Files not an array");
}
console.log(obj);
const callback = err => {
  if (err) throw err;
};

fs.writeFile("src/filesForReact.json", JSON.stringify(obj, false, 2), callback);
