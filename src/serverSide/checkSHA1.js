const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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

function injectJson(filesObj, targetDir) {
  const callback = err => {
    if (err) throw err;
  };
  fs.writeFile(targetDir, JSON.stringify(filesObj, false, 2), callback);
}

const SHA1toFile = file => {
  const SHA1 = checkSHA1(file);
  const obj = { [file]: SHA1 };
  injectJson(obj, path.join(__dirname, "__JSON_SHA1__.json"));
  console.log("SHA1 done");
};

function initJSON = (dirName) => {
  const obj = {}
  const files = fs.readdir(dirname, (err, files)=>{
    files.map(elem => {
      fs.stat(elem, (err, stats) => {
        if (stats.isFile(currentDir)) {
          obj[elem] =
        }
      });

    })
  })

  })
};

module.exports.checkSHA1 = checkSHA1;
module.exports.SHA1toFile = SHA1toFile;
module.exports.initJSON = initJSON;
