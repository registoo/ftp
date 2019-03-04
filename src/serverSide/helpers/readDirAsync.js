const util = require("util");
const fs = require("fs");

async function readDir(dir) {
  const filesInDir = util.promisify(fs.readdir);
  return await filesInDir(dir);
}

// return arr of files with absolute path
module.exports = readDir;
