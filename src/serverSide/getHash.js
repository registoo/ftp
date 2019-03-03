const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

module.exports = async function func(file, algorithm, encoding) {
  const readFile = util.promisify(fs.readFile);
  const data = await readFile(file);
  const hash = generateChecksum(data);
  function generateChecksum(str, algorithm, encoding) {
    return crypto
      .createHash(algorithm || "SHA1")
      .update(str, "utf8")
      .digest(encoding || "hex");
  }
  return hash;
};
