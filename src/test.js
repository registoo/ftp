const { files } = require("./files.json");
const React = require("react");
const { render } = require("react-dom");
const path = require("path");

function HelloWorld(props) {
  const f = Ff(props.files);
  return <ul>{f}</ul>;
}

function Ff(arr) {
  const a = arr.map((elem, i) => {
    i++;
    return (
      <li key={i}>
        <a href={elem}>{elem}</a>
      </li>
    );
  });
  return a;
}

render(<HelloWorld files={files} />, document.getElementById("root"));
