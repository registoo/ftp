const fs = require("fs");
const path = require("path");
const getFilesDipper = require("./getFiles").dipper;

const searchDir = "D:Zona Downloads"; //path.join(__dirname, "../../dist");
const targetDir = path.join("src", "files.json");

// в targetDir получает объет файлов JSON петём перезаписи файла
getFilesDipper(searchDir, targetDir);
