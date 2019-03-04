const fs = require("fs");
const path = require("path");
const getHash = require("./helpers/getHash");
const util = require("util");

// записывает переданный JSON-объект в file. ENOENT - если нет файла
const writeFile = (JsonOfHashes, file, ENOENT) => {
  fs.writeFile(
    "src/serverSide/__JSON_SHA1__.json",
    JSON.stringify(JsonOfHashes, false, 2),
    err => {
      if (err) throw err;
      if (ENOENT) {
        console.log(`Файл \"${file}\" был удалён или не найден`);
        return;
      }
      console.log(`Файл \"${file}\" был изменён`);
    }
  );
};

module.exports = async function(serveDir) {
  // рекурсивно смотрит в папку
  fs.watch(serveDir, { recursive: true }, (eventype, filename) => {
    const fullFilePath = path.join(serveDir, filename);
    try {
      // если fullFilePath является папкой, передаётся аргумент ENOENT как false
      fs.statSync(fullFilePath).isFile() ? func(false) : null;
    } catch (err) {
      // если ошибка, передаётся аргумент ENOENT как true
      if (err.code === "ENOENT") {
        func(true);
        return;
      }
      console.log(`>>> Какая-то ошибка в hashWatcher.js.\r\n${err}`);
    }

    async function func(ENOENT) {
      const JsonOfHashes = require("./__JSON_SHA1__.json");
      // если файла не существует или удалили - убирает из JSON
      if (ENOENT) {
        JsonOfHashes[fullFilePath] = undefined;
        writeFile(JsonOfHashes, fullFilePath, true);
        return;
      }
      // если Хэш файла изменился - обновляет Хэш для файла в JSON
      const currentHash = await getHash(fullFilePath);
      if (currentHash !== JsonOfHashes[fullFilePath]) {
        JsonOfHashes[fullFilePath] = currentHash;
        writeFile(JsonOfHashes, fullFilePath);
      }
    }
  });
};
