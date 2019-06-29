const util = require("util");
const fs = require("fs");

module.exports = async function(elem) {
  const getStats = util.promisify(fs.stat);
  const stats = await getStats(elem);
  if (stats.isFile()) return true;
  return false;
};
