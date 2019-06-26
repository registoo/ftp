const path = require('path');
const readDirAsync = require('../src/serverSide/helpers/readDirAsync');
const isFile = require('../src/serverSide/helpers/isFile.js');
const filesJSON = require('./files.json');
const fs = require('fs');
async function f(filePath) {
  try {
    const arr = await readDirAsync(filePath);
    arr.map(async function(i) {
      const fullFilePath = path.join(filePath, i);
      (await isFile(fullFilePath))
        ? filesJSON[filePath].push(i)
        : await f(path.join(filePath, i));
    });
  } catch (err) {
    console.log(err);
  }
}

async function ff(filePath) {
  filesJSON['/'] = [];
  try {
    const firstArr = await readDirAsync(filePath);
    firstArr.map(
      await async function s(i) {
        if (await isFile(i)) {
          filesJSON['/'].push(i);
        } else {
          const currentFilePath = path.join(filePath, i);
          filesJSON['/'][currentFilePath];
          await f(currentFilePath);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = ff;

// function ff(filePath) {
//   const httpHere = path.join(__dirname, 'fi.json');

//   filesJSON.q = {
//     id: 4,
//     firstName: 'John',
//     secondName: 'Forget',
//     city: {
//       estate: 'Alabama',
//     },
//   };
//   console.log('!! ', filesJSON);
//   const q = JSON.stringify(filesJSON);
//   fs.writeFile(httpHere, q, 'utf8', () => {
//     console.log('done');
//   });
// }
