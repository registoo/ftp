const { spawnSync } = require("child_process");

const checkSHA1 = file => {
  const stdout = spawnSync("certutil", ["-hashfile", file, "SHA1"]).stdout;
  const arr = stdout.toString().split(/\r\n/);
  const result = arr.reduce((acc, elem) => {
    if (isValidSHA1(elem)) acc.push(elem);
    return acc;
  }, []);
  if (result.length > 1) {
    return new Error("Получилось больше одного SHA1 на файл");
  }
  return result[0];
};

function isValidSHA1(s) {
  const result = s.search(/^[a-fA-F0-9]{40}$/);
  return result == 0 ? true : false;
}

module.exports = checkSHA1;
