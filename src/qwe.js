const fs = require("fs");
const path = require("path");

function initJSON(dirName) {


  function lookingStats (err, stats) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stats: ${stats.isFile()}`);
  };


  async function lookingFiles (err, files) {
    return files;
    // files.map(elem => {
    //   fs.stat(path.join(dirName, elem), lookingStats);
    // });
  };


  const arr = fs.readdir(dirName, await lookingFiles);
  console.log(arr)

}


initJSON(__dirname);
