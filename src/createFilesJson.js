const countFiles = require("./serverSide/index.js");

const f = (searchDir, targetDir) => {
  countFiles(searchDir, targetDir);
};

module.exports = f;
