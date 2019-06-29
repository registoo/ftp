const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

// принимает файл с полным путём, алгоритм хэширования и кодировку
module.exports = async function func(file, algorithm, encoding) {
  const stat = util.promisify(fs.stat);
  try {
    const callback = await stat(file);
    const readFile = util.promisify(fs.readFile);
    const data = await readFile(file);
    const hash = generateChecksum(data);
    function generateChecksum(str, algorithm, encoding) {
      return crypto
        .createHash(algorithm || 'SHA1')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
    }
    return hash;
  } catch (err) {
    console.log(`File \"${file}\" does not exist`);
    return 'undefined';
  }
};
