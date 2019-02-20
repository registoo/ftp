const fs = require("fs");

function initJSON(dirName) {
  const lookingStats = (err, stats) => {
    console.log(stats);
  };
  const lookingFIles = (err, files) => {
    files.map(elem => {
      console.log(elem);
      fs.stat(elem, lookingStats);
    });
  };
  fs.readdir(dirName, lookingFIles);
}

initJSON(__dirname);
