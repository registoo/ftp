const fs = require('fs')
const path = require('path')

const search = (base) => { // base should be a string
  const arr = []
  const getFiles = (base) => fs.readdirSync(base)
  function func(item) {
    const currentDir = path.join(this.root, item)
    const state = fs.statSync(currentDir)
    if(state.isDirectory(currentDir)){
      getFiles(currentDir).map(func, {root: currentDir})
    }
    else {
      arr.push(item)
    }
  }
  getFiles(base).map(func, {root: base})
  return arr
}

const a = search(path.join(__dirname, '..'))
console.log(a)
