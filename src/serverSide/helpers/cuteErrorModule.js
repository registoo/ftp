const colors = require("colors/safe");

module.exports = (fileDir, description, err) => {
  console.log(
    `>>> error in ${colors.yellow(fileDir)}\r\n>>> ${colors.magenta(
      description
    )}\r\n${err}`
  );
  return;
};
