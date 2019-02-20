const fs = require("fs");
const path = require("path");
const getFilesDipper = require("./getFiles").dipper;
const SHA1toFile = require("./checkSHA1").SHA1toFile;
const searchDir = path.join(__dirname, "../../dist");
const targetDir = path.join("src", "./clientSide/files.json");

// в targetDir получает объет файлов JSON петём перезаписи файла
getFilesDipper(searchDir, targetDir);

const f = (file, eventype) => {
  fs.access(file, fs.constants.F_OK, err => {
    if (err) {
      return;
    }
    const state = fs.statSync(file);
    if (state.isFile(file)) {
      console.log("is file");
      SHA1toFile(file);
    }
  });
};

module.exports = f;
