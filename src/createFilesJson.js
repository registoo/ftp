const countFiles = require("./serverSide/index.js");
const path = require("path");

const searchDir = path.join(__dirname, "../dist");
const targetDir = "src/files.json";
countFiles(searchDir, targetDir);
