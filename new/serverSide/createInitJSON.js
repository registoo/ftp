const fs = require('fs');
const path = require('path');
const isFile = require('../helpers/isFile.js');
const asyncMap = require('../helpers/asyncMap.js');
const readDirAsync = require('../helpers/readDirAsync');
const filesJSON = require('../clientSide/ftpFiles.json');

async function f(filePath, foldersObj) {
  try {
    const arr = await readDirAsync(filePath);
    await asyncMap(arr, async function(i) {
      //проверка на пустую папку
      if (!i) {
        const J = JSON.stringify(filesJSON);
        fs.writeFile(
          path.join(__dirname, '../clientSide/ftpFiles.json'),
          J,
          'utf8',
          () => {}
        );
        return;
      }
      const arrayOfFileData = getResultArrayOfFileData(filePath, i);
      const currentFilePath = arrayOfFileData.fullFilePath;
      const fileName = arrayOfFileData.fileName;
      //проверка файл == файл?
      if (await isFile(currentFilePath)) {
        foldersObj.files.push(arrayOfFileData);
        delete arrayOfFileData.fullFilePath;
        const J = JSON.stringify(filesJSON);
        //запись объекта в файл
        fs.writeFile(
          path.join(__dirname, '../clientSide/ftpFiles.json'),
          J,
          'utf8',
          () => {}
        );
      }
      //если файл == папка
      else {
        foldersObj.folders[currentFilePath] = {
          files: [],
          folders: {},
          folderName: fileName,
        };
        f(currentFilePath, foldersObj.folders[currentFilePath]);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function main(filePath) {
  //"/" - указание на корень в JSON и добавляет шаблон
  filesJSON['/'] = { files: [], folders: {} };
  try {
    const firstArr = await readDirAsync(filePath);
    await asyncMap(
      firstArr,
      await async function(i) {
        const arrayOfFileData = getResultArrayOfFileData(filePath, i);
        const currentFilePath = arrayOfFileData.fullFilePath;
        const fileName = arrayOfFileData.fileName;
        if (await isFile(currentFilePath)) {
          filesJSON['/'].files.push(arrayOfFileData);
          delete arrayOfFileData.fullFilePath;
          const J = JSON.stringify(filesJSON);

          //запись объекта в файл
          fs.writeFile(
            path.join(__dirname, '../clientSide/ftpFiles.json'),
            J,
            'utf8',
            () => {}
          );
        } else {
          getResultArrayOfFileData;
          filesJSON['/'].folders[currentFilePath] = {
            files: [],
            folders: {},
            folderName: fileName,
          };
          await f(currentFilePath, filesJSON['/'].folders[currentFilePath]);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

const getResultArrayOfFileData = (filePath, i) => {
  //различные манипуляции с путём к файлу
  const fullFilePath = path.join(filePath, i);
  const arrayOfFileData = {};

  const significantElementsOfPath = path.parse(fullFilePath);
  const getSeparatedPath = fullFilePath.split(path.sep);

  const rootPath = getSeparatedPath.slice(0, 2).join('/');
  const relativeFilePath = getSeparatedPath.slice(2).join('/');
  const fileName = significantElementsOfPath.name;
  const ext = significantElementsOfPath.ext;

  arrayOfFileData.fullFilePath = fullFilePath; //полный путь к файлу
  arrayOfFileData.rootPath = rootPath; //корневая папка
  arrayOfFileData.relativeFilePath = relativeFilePath; //путь к файлу без корневой папки
  arrayOfFileData.fileName = fileName; //название файла с раширением
  arrayOfFileData.ext = ext; //расширение файла

  return arrayOfFileData;
};

module.exports = main;
