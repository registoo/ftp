const React = require('react')
const {render} = require('react-dom')
import App form './components/app.js'
function HelloWorld(){
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}

render(<HelloWorld />, document.getElementById('root'))
