const path = require('path');
const readDirAsync = require('../src/serverSide/helpers/readDirAsync');
const isFile = require('../src/serverSide/helpers/isFile.js');
const filesJSON = require('./fi.json');
const fs = require('fs');
async function f(filePath, foldersObj) {
  try {
    const arr = await readDirAsync(filePath);
    await asyncMap(arr, async function(i) {
      const fullFilePath = path.join(filePath, i);
      if (await isFile(fullFilePath)) {
        foldersObj.files.push(fullFilePath);
        console.dir(filesJSON, { depth: null });
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
        } else {
          filesJSON['/'].folders[currentFilePath] = { files: [], folders: {} };
          await f(currentFilePath, filesJSON['/'].folders[currentFilePath]);
        }
      }
    );
    Promise.all(results).then(() => {
      const J = JSON.stringify(filesJSON);
      console.dir(filesJSON, { depth: null });

      fs.writeFile(path.join(__dirname, 'fi.json'), J, 'utf8', () => {
        console.log('done');
      });
    });
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
