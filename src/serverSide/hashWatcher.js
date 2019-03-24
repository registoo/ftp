const fs = require("fs");
const path = require("path");
const getHash = require("./helpers/getHash");
const util = require("util");
const EventEmitter = require("events");
const JSONchange = require("./JSONchangeEmitter");
const WpEntryPoint = require("../../constants.js").singleWebpackEntryPointFullPath;
const entryFileDB = require("../../constants.js").filesSHA1;
const neDB = require("./dataBase.js");

class FileChangeEmitter extends EventEmitter {}

const fileChange = new FileChangeEmitter();
// base - корневая директория с файлами
// (чтобы добавлять относительную ссылку на файл)
fileChange.on("fileIsChange", (file, base) => {
	console.log(`эмиттер запущен успешно`);
	// const fullJSONSHA1_promise = util.promisify(fs.readFile);
	// fullJSONSHA1_promise("./src/serverSide/__json_sha1__.json", "utf8")
	//   .then(fullJSONSHA1 => {
	//     // props - массив папок
	//     const props = Object.getOwnPropertyNames(JSON.parse(fullJSONSHA1));
	//     const objForWrite = {};
	//     props.map(elem => {
	//       const innerDir = path.relative(base, elem);
	//       const f = arr => {
	//         // удаляю папку из массива, нужен только путь для сборки(добавления)
	//         // в результируюший обхъект на запись objForWrite
	//         arr.pop();
	//         if (arr.length > 0) {
	//           const temporaryObj = arr.reduce((acc, elem) => {
	//             const res = (acc[elem] = acc[elem] || {});
	//             return res;
	//           }, objForWrite);
	//           temporaryObj.__files__ = temporaryObj.__files__ || [];
	//           temporaryObj.__files__.push(innerDir);
	//         } else {
	//           objForWrite.__files__ = objForWrite.__files__ || [];
	//           objForWrite.__files__.push(innerDir);
	//         }
	//       };
	//       // разбивает строку на папки для удобного добавления в objForWrite
	//       f(innerDir.split(path.sep));
	//     });
	//     fs.writeFile(
	//       "src/clientSide/files.json",
	//       JSON.stringify(objForWrite, false, 2),
	//       err => {
	//         if (err) {
	//           console.log(
	//             `Ошибка в колбеке hashWatcher/fullJSONSHA1_promise/fs.writeFile:\r\n${err}`
	//           );
	//           return;
	//         }
	//         // эмитирование эвента для передачи обновлённого JSON на фронт
	//         getHash(WpEntryPoint).then(hash => {
	//           if (
	//             file === WpEntryPoint &&
	//             // da39a3ee5e6b4b0d3255bfef95601890afd80709 - хэш пустого файла
	//             hash != "da39a3ee5e6b4b0d3255bfef95601890afd80709"
	//           ) {
	//             console.log(`>>>file: ${file}\r\n>>>hash: ${hash}`);
	//             JSONchange.emit("change");
	//           }
	//         });
	//       }
	//     );
	//   })
	//   .catch(error => {
	//     console.log(`Ошибка в hashWatcher.js/fileChange: ${error}`);
	//   });
});

module.exports = async function(serveDir) {
	// рекурсивно смотрит в папку
	fs.watch(
		serveDir,
		{
			recursive: true,
		},
		(eventype, filename) => {
			console.log("вотчер запущен");
			const fullFilePath = path.join(serveDir, filename);
			try {
				// если fullFilePath является файлом, передаётся аргумент ENOENT как false
				console.log("первый блок ошибок запущен успешно");
				if (fs.statSync(fullFilePath).isFile()) {
					func(false);
					console.log("конец первого блока успешно");
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
				// если файла не существует или удалили - убирает из JSON
				console.log(`func запущен`);
				if (ENOENT) {
					neDB.remove(
						{
							fileName: fullFilePath,
						},
						err => {
							if (err) {
								console.log(`Ошибка при удалении документа из neDB в файле ${__filename}:\r\n${err}`);
								return;
							}
							console.log(`\r\nФайл \"${filename}\" был удалён или не найден`);
							// вызывается перезапись для фронтэнд файла files.json
							fileChange.emit("fileIsChange", file, serveDir);
							return;
						}
					);
				}
				// если Хэш файла изменился - обновляет Хэш для файла в JSON
				const currentHash = await getHash(fullFilePath);
				console.log("добрались до findOne");
				neDB.find(
					{
						fileName: fullFilePath,
					},
					function(err, doc) {
						console.log(`doc.hash: ${doc}`);
						if (doc.hash !== currentHash)
							neDB.update(
								{
									fileName: fullFilePath,
								},
								{
									$set: {
										hash: currentHash,
									},
								},
								{},
								err => {
									if (err) {
										console.log(`Ошибка при замене документа neDB в файле ${__filename}:\r\n${err}`);
										return;
									}
									console.log(`\r\nФайл \"${filename}\" был изменён`);
									// вызывается перезапись для фронтэнд файла files.json
									fileChange.emit("fileIsChange", filename, serveDir);
								}
							);
						return;
					}
				);
			}
		}
	);
};
