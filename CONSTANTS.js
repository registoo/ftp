const path = require('path');

const storage = path.join('X:/FTPvideo');
const singleEntryPoint = 'indexReactJS';

const singleEntryPointDir = path.join(__dirname, 'dist');
const singleEntryPointFullPath = path.join(
  singleEntryPointDir,
  singleEntryPoint + '.js'
);

module.exports.storage = storage;
module.exports.singleWebpackEntryPoint = singleEntryPoint;
module.exports.singleWebpackEntryPointDir = singleEntryPointDir;
module.exports.singleWebpackEntryPointFullPath = singleEntryPointFullPath;
