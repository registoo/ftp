const React = require('react');

const {
  render
} = require('react-dom');

function HelloWorld() {
  return React.createElement("div", null, React.createElement("h1", null, "Hello you!"));
}

render(React.createElement(HelloWorld, null), document.getElementById('root'));
