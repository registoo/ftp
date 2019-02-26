const util = require("util");
const fs = require("fs");

module.exports = function(elem) {
  return new Promise(async function(resolve, reject) {
    const getStats = util.promisify(fs.stat);
    const stats = await getStats(elem);
    if (stats.isFile()) resolve(elem);
    resolve(`${elem} ne file`);
  });
};
