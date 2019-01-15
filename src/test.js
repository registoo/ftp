const { files } = require("./files.json");
const React = require("react");
const { render } = require("react-dom");

function HelloWorld(props) {
  const ul = props.files.map(elem => {
    return (
      <li>
        <a href="#">{elem}</a>
      </li>
    );
  });

  return <ul>{ul}</ul>;
}

render(<HelloWorld files={files} />, document.getElementById("root"));
