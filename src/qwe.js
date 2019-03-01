const path = require("path");
const fs = require("fs");
const directoryFullInfo = require("./serverside/checkSHA1").SHA1toFile;

async function f(dirName) {
  const dirObj = await directoryFullInfo(dirName);
  await fs.writeFile(
    "src/serverSide/__JSON_SHA1__.json",
    JSON.stringify(dirObj, false, 2),
    err => {
      if (err) throw err;
    }
  );
}

module.exports = f;
