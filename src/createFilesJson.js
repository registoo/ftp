const countFiles = require("./serverSide/index.js");
const path = require("path");

const searchDir = path.join(__dirname, "../");
const targetDir = "dist/files.json";
countFiles(searchDir, targetDir);
