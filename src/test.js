const { files } = require("./files.json");
const React = require("react");
const { render } = require("react-dom");

function HelloWorld(props) {
  return (
    <div>
      <h1>props.files[0]</h1>
    </div>
  );
}

render(<HelloWorld files={files} />, document.getElementById("root"));
