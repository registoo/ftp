const fs = require('fs')
const path = require('path')

const search = (base) => { // base should be a string
  const arr = []
  const getFiles = (base) => fs.readdirSync(base)
  function func(item) {
    const currentDir = path.join(this.root, item)
    const state = fs.statSync(currentDir)
    if(state.isDirectory(currentDir)){
      switch(true) {
        case item[0] == '.':
          break;
        case item == 'node_modules':
          break;
        default:
          getFiles(currentDir).map(func, {root: currentDir})
      }
    }
    else {
      arr.push(currentDir)
    }
  }
  getFiles(base).map(func, {root: base})
  console.log(arr)
  return arr
}

module.exports = search


const React = require('react')
const {render} = require('react-dom')
function HelloWorld(){
  return (
    <div>
      <h1>привет мир </h1>
    </div>
  )
}

render(<HelloWorld />, document.getElementById('root'))
module.exports.welcome = alert('привет мир !!!')
