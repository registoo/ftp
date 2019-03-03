const fs = require("fs");
const path = require("path");
const readDirAsync = require("./readDirAsync.js");
const isFile = require("./isFile.js");
const getHash = require("./getHash.js");
const asyncMap = require("./asyncMap.js");

async function objOfHashes(directory, algorithm, encoding, objForJSON = {}) {
  const arrOfFiles = await readDirAsync(directory);

  async function addSHA1(elem) {
    const fullPath = path.join(directory, elem);
    if (await isFile(fullPath)) {
      const hash = await getHash(fullPath, algorithm, encoding);
      objForJSON[fullPath] = hash;
    } else {
      const innerObj = await objOfHashes(fullPath);
      objForJSON = { ...objForJSON, ...innerObj };
    }
  }
  await asyncMap(arrOfFiles, addSHA1);
  return objForJSON;
}

module.exports = async function(directory, algorithm, encoding) {
  const obj = await objOfHashes(directory, algorithm, encoding);
  fs.writeFileSync(
    "src/serverSide/__JSON_SHA1__.json",
    JSON.stringify(obj, false, 2)
  );
};
