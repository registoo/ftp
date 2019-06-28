const path = require('path');
const readDirAsync = require('../src/serverSide/helpers/readDirAsync');
const isFile = require('../src/serverSide/helpers/isFile.js');
const filesJSON = require('./ftpFiles.json');
const fs = require('fs');

addToArray = (arr, ...rest) =>
  rest.forEach(elem => {
    arr.push(elem);
  });
const getResultArrayOfFileData = (filePath, i) => {
  const fullFilePath = path.join(filePath, i);
  const getSeparatedPath = fullFilePath.split(path.sep);
  const relativeFilePath = getSeparatedPath.slice(2).join('/');
  const getFileExtension = getSeparatedPath[getSeparatedPath.length - 1].split(
    '.'
  );
  const fileExtension = getFileExtension[getFileExtension.length - 1];
  const arrayOfFileData = [];
  addToArray(arrayOfFileData, fullFilePath, relativeFilePath, fileExtension);
  return arrayOfFileData;
};

async function f(filePath, foldersObj) {
  try {
    const arr = await readDirAsync(filePath);
    await asyncMap(arr, async function(i) {
      const arrayOfFileData = getResultArrayOfFileData(filePath, i);
      const currentFilePath = arrayOfFileData[0];

      if (await isFile(currentFilePath)) {
        foldersObj.files.push(arrayOfFileData);
        const J = JSON.stringify(filesJSON);
        fs.writeFile(
          path.join(__dirname, 'ftpFiles.json'),
          J,
          'utf8',
          () => {}
        );
      } else {
        foldersObj.folders[currentFilePath] = { files: [], folders: {} };
        f(currentFilePath, foldersObj.folders[currentFilePath]);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function ff(filePath) {
  filesJSON['/'] = { files: [], folders: {} };
  try {
    const firstArr = await readDirAsync(filePath);
    const results = await asyncMap(
      firstArr,
      await async function(i) {
        const arrayOfFileData = getResultArrayOfFileData(filePath, i);
        const currentFilePath = arrayOfFileData[0];
        if (await isFile(currentFilePath)) {
          filesJSON['/'].files.push(arrayOfFileData);
          const J = JSON.stringify(filesJSON);
          fs.writeFile(
            path.join(__dirname, 'ftpFiles.json'),
            J,
            'utf8',
            () => {}
          );
        } else {
          filesJSON['/'].folders[currentFilePath] = { files: [], folders: {} };
          await f(currentFilePath, filesJSON['/'].folders[currentFilePath]);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function asyncMap(arr, func) {
  const lastElem = arr.pop();
  await func(lastElem);
  arr.length > 0 ? await asyncMap(arr, func) : console.log('done');
}

module.exports = ff;
