const fs = require("fs");
const path = require("path");
const getHash = require("./helpers/getHash");
const util = require("util");

const EventEmitter = require("events");

class FileChangeEmitter extends EventEmitter {}
const fileChange = new FileChangeEmitter();
// base - корневая директория с файлами
fileChange.on("fileIsChange", base => {
  const fullJSONSHA1_promise = util.promisify(fs.readFile);
  fullJSONSHA1_promise("./src/serverSide/__json_sha1__.json", "utf8")
    .then(fullJSONSHA1 => {
      // props - массив папок
      const props = Object.getOwnPropertyNames(JSON.parse(fullJSONSHA1));
      const objForWrite = {};
      props.map(elem => {
        const innerDir = path.relative(base, elem);
        const f = arr => {
          // удаляю папку из массива, нужен только путь для сборки(добавления)
          // в результируюший обхъект на запись objForWrite
          arr.pop();
          if (arr.length > 0) {
            const temporaryObj = arr.reduce((acc, elem) => {
              const res = (acc[elem] = acc[elem] || {});
              return res;
            }, objForWrite);
            temporaryObj.__files__ = temporaryObj.__files__ || [];
            temporaryObj.__files__.push(innerDir);
          } else {
            objForWrite.__files__ = objForWrite.__files__ || [];
            objForWrite.__files__.push(innerDir);
          }
        };
        // разбивает строку на папки для удобного добавления в objForWrite
        f(innerDir.split(path.sep));
      });
      fs.writeFileSync(
        "src/clientSide/files.json",
        JSON.stringify(objForWrite, false, 2)
      );
    })
    .catch(error => {
      console.log(`Ошибка в hashWatcher.js/fileChange: ${error}`);
    });
});

// записывает переданный JSON-объект в file. ENOENT - если нет файла
function writeFile(JsonOfHashes, file, ENOENT, serveDir) {
  const writePromise = util.promisify(fs.writeFile);
  try {
    writePromise(
      "src/serverSide/__JSON_SHA1__.json",
      JSON.stringify(JsonOfHashes, false, 2)
    ).then(() => {
      if (ENOENT) {
        console.log(
          `\r\nФайл \"${file}\" был удалён или не найден, \r\nхэш: ${
            JsonOfHashes[file]
          }`
        );
        // вызывается перезапись для фронтэнд файла JSON
        fileChange.emit("fileIsChange", serveDir);
        return;
      }
      console.log(
        `\r\nФайл \"${file}\" был изменён, \r\nхэш: ${JsonOfHashes[file]}`
      );
      // вызывается перезапись для фронтэнд файла JSON
      fileChange.emit("fileIsChange", serveDir);
    });
  } catch (err) {
    console.log(`>>> Какая-то ошибка в hashWatcher.js/writeFile.\r\n${err}`);
  }
}

module.exports = async function(serveDir) {
  // рекурсивно смотрит в папку
  fs.watch(serveDir, { recursive: true }, (eventype, filename) => {
    const fullFilePath = path.join(serveDir, filename);
    try {
      // если fullFilePath является папкой, передаётся аргумент ENOENT как false
      if (fs.statSync(fullFilePath).isFile()) {
        func(false);
      }
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
        writeFile(JsonOfHashes, fullFilePath, true, serveDir);
        return;
      }
      // если Хэш файла изменился - обновляет Хэш для файла в JSON
      const currentHash = await getHash(fullFilePath);
      if (currentHash !== JsonOfHashes[fullFilePath]) {
        JsonOfHashes[fullFilePath] = currentHash;
        writeFile(JsonOfHashes, fullFilePath, false, serveDir);
      }
    }
  });
};
