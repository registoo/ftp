const fs = require("fs");
let i = 1;
const f = () => {
  if (i <= 10) {
    fs.appendFileSync("./dist/forSafe.js", `${i}\r\n`);
    i += 1;
    f();
  }
};
f();
