const fs = require("fs");
const f = i => {
  fs.appendFileSync("./dist/forSafe.js", `${i}\r\n`);
};
module.exports = f;
