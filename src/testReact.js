const React = require("react");
const { render } = require("react-dom");
function HelloWorld() {
  return (
    <div>
      <h1>привет мир </h1>
    </div>
  );
}

render(<HelloWorld />, document.getElementById("root"));
module.exports.welcome = alert("привет мир !!!");
