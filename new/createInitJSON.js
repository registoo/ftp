const path = require('path');
const readDirAsync = require('../src/serverSide/helpers/readDirAsync');
const isFile = require('../src/serverSide/helpers/isFile.js');
const filesJSON = require('./ftpFiles.json');
const fs = require('fs');
async function f(filePath, foldersObj) {
  try {
    const arr = await readDirAsync(filePath);
    await asyncMap(arr, async function(i) {
      const fullFilePath = path.join(filePath, i);
      if (await isFile(fullFilePath)) {
        foldersObj.files.push(fullFilePath);
        const J = JSON.stringify(filesJSON);
        fs.writeFile(path.join(__dirname, 'ftpFiles.json'), J, 'utf8', () => {
          console.log('done');
        });
      } else {
        foldersObj.folders[fullFilePath] = { files: [], folders: {} };
        f(fullFilePath, foldersObj.folders[fullFilePath]);
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
        const currentFilePath = path.join(filePath, i);
        if (await isFile(currentFilePath)) {
          filesJSON['/'].files.push(currentFilePath);
          const J = JSON.stringify(filesJSON);
          fs.writeFile(path.join(__dirname, 'ftpFiles.json'), J, 'utf8', () => {
            console.log('done');
          });
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
