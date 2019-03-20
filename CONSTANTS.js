const path = require("path");

// frontend
const singleEntryPoint = "testR";
const singleEntryPointDir = path.join(__dirname, "dist");
const singleEntryPointFullPath = path.join(
  singleEntryPointDir,
  singleEntryPoint + ".js"
);
const filesSHA1 = "__FILES_SHA1__.db";

module.exports.singleWebpackEntryPoint = singleEntryPoint;
module.exports.singleWebpackEntryPointDir = singleEntryPointDir;
module.exports.singleWebpackEntryPointFullPath = singleEntryPointFullPath;
module.exports.filesSHA1 = filesSHA1;
