const path = require('path');

// frontend
const singleEntryPoint = 'testR';
const singleEntryPointDir = path.join(__dirname, 'dist');
const singleEntryPointFullPath = path.join(
  singleEntryPointDir,
  singleEntryPoint + '.js'
);

module.exports.singleWebpackEntryPoint = singleEntryPoint;
module.exports.singleWebpackEntryPointDir = singleEntryPointDir;
module.exports.singleWebpackEntryPointFullPath = singleEntryPointFullPath;
