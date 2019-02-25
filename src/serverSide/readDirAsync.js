const util = require("util");
const fs = require("fs");

async function readDir(dir) {
  // (await isFile(dir)) ? console.log(true) : console.log(false);
  const filesInDir = util.promisify(fs.readdir);
  return await filesInDir(dir);
}

// return arr of files with absolute path
module.exports = readDir;
