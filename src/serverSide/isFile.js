const util = require("util");
const fs = require("fs");

async function isFile(file) {
  const getStats = util.promisify(fs.stat);
  const stats = await getStats(file);
  if (stats.isFile()) {
    return (err, bool) => {
      if (err) {
        throw err;
      } else {
        true;
      }
    };
  }
  return (err, bool) => {
    if (err) {
      throw err;
    } else {
      false;
    }
  };
}

module.exports = isFile;
