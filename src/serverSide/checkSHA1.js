const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readDirAsync = require("./readDirAsync.js");
const isFile = require("./isFile.js");

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

function intoJSON(file) {
  const a = require(path.join(__dirname, file));
  console.log(Object.getOwnPropertyNames(a));
}

async function SHA1toFile(directory, objForJSON = {}) {
  const arrOfFiles = await readDirAsync(directory);

  async function addSHA1(elem) {
    const fullPath = path.join(directory, elem);
    if (await isFile(fullPath)) {
      const SHA1 = checkSHA1(fullPath);
      objForJSON[fullPath] = SHA1;
    } else {
      const innerObj = await SHA1toFile(fullPath);
      function jsonConcat(o1, o2) {
        for (var key in o2) {
          o1[key] = o2[key];
        }
        return o1;
      }
      jsonConcat(objForJSON, innerObj);
    }
  }

  const asyncMap = async (arr, func) => {
    const last = arr.pop();
    if (last) {
      await func(last);
      await asyncMap(arr, func);
    }
  };

  await asyncMap(arrOfFiles, addSHA1);
  return objForJSON;
}

module.exports.checkSHA1 = checkSHA1;
module.exports.SHA1toFile = SHA1toFile;
