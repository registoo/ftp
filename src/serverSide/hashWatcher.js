const fs = require("fs");
const path = require("path");
const getHash = require("./getHash");

const writeFile = JsonOfHashes => {
  fs.writeFile(
    "src/serverSide/__JSON_SHA1__.json",
    JSON.stringify(JsonOfHashes, false, 2),
    err => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
};

module.exports = async function(serveDir) {
  fs.watch(serveDir, { recursive: true }, (eventype, filename) => {
    async function func(eventype, filename) {
      const fullFilePath = path.join(serveDir, filename);
      const JsonOfHashes = require("./__JSON_SHA1__");
      const currentHash = await getHash(fullFilePath);

      // fs.access(filename, fs.constants.F_OK, err => {
      //   console.log(`${filename} ${err ? "does not exist" : "exists"}`);
      // });

      if (currentHash !== JsonOfHashes[fullFilePath]) {
        JsonOfHashes[fullFilePath] = currentHash;
        writeFile(JsonOfHashes);
        return;
      }
    }
    func(eventype, filename);
  });
};
