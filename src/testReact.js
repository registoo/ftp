const path = require("path");
const fs = require("fs");
const fi = require("./serverSide/getFiles");
const files = fi.flatten(__dirname);
function separator(mustBeArray) {
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
  const callback = err => {
    if (err) throw err;
  };
  function innerMap(elem) {
    const obj = {};
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
    pathToFile.files = pathToFile.files || [];
    addFile(elem, pathToFile);
    return obj;
  }
  mustBeArray.map(innerMap);
}
const a = separator(__dirname);
console.logcmd(a);
// fs.writeFile("src/filesForReact.json", JSON.stringify(obj, false, 2), callback);
