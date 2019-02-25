const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const util = require("util");
const crypto = require("crypto");
const isFile = require("./isFile.js");
const readDirAsync = require("./readDirAsync.js");

const checkSHA1 = file => {
  function isValidSHA1(s) {
    const result = s.search(/^[a-fA-F0-9]{40}$/);
    return result == 0 ? true : false;
  }
  const stdout = spawnSync("certutil", ["-hashfile", file, "SHA1"]).stdout;
  const arr = stdout.toString().split(/\r\n/);
  const result = arr.reduce((acc, elem) => {
    if (isValidSHA1(elem)) acc.push(elem);
    return acc;
  }, []);
  if (result.length > 1) {
    return new Error("Получилось больше одного SHA1 на файл");
  }
  return result[0];
};
// смотрит в __JSON_SHA1__
function intoJSON(file) {
  const a = require(path.join(__dirname, file));
  console.log(Object.getOwnPropertyNames(a));
  // fs.writeFile(targetDir, JSON.stringify(file, false, 2), err => {
  //   if (err) throw err;
  // });
}

function injectJson(arr, targetDir) {
  const filesInDir = util.promisify(fs.readdir);
  filesInDir(targetDir)
    .then(arr => {
      const elemIndex = _.indexOf(arr, "__JSON_SHA1__.json");
      elemIndex >= 0 ? intoJSON(arr[elemIndex]) : console.log("джейсона нет");
    })
    .catch(err => console.log(err));
}

async function SHA1toFile(directory) {
  const arrOfFiles = await readDirAsync(directory);
  async function f(acc, elem) {
    const fullPath = path.join(directory, elem);
    const q = await isFile(fullPath);
    if (q) {
      const SHA1 = checkSHA1(fullPath);
      acc.push([fullPath, SHA1]);
    }
    return acc;
  }
  const arrOfFilesWithSHA1 = arrOfFiles.reduce(await f, []);

  console.log(arrOfFilesWithSHA1);
  // const SHA1 = checkSHA1(file);
  // // создаём массив с названием файла и его хэшем
  // const arr = [file, SHA1];
  // // записываем созданный массив в JSON
  // injectJson(arr, __dirname);
}

module.exports.checkSHA1 = checkSHA1;
module.exports.SHA1toFile = SHA1toFile;
