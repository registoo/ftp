// const fs = require("fs");
const path = require("path");
// const util = require("util");
//
// function initJSON(dirName) {
//   function lookingStats(elem) {
//     const stats = util.promisify(fs.stat);
//     const fullPath = path.join(__dirname, elem);
//     stats(fullPath)
//       .then(stats => {
//         console.log(`elem: ${elem}\r\nstats: ${stats.isFile()}`);
//       })
//       .catch(err => console.log(err));
//   }
//
//   const arr = util.promisify(fs.readdir);
//   arr(dirName)
//     .then(files => {
//       files.map(lookingStats);
//     })
//     .catch(err => console.log(err));
//   console.log(arr);
// }

// initJSON(__dirname);
const q = require("./serverside/checkSHA1").SHA1toFile;
q(__dirname);