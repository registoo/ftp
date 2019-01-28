const { files } = require("./files.json");
const React = require("react");
const { render } = require("react-dom");

function HelloWorld(props) {
  const f = Ff(props.files);
  return <div>{f}</div>;
}

function Ff(arr) {
  const a = arr.map((elem, i) => {
    i++;
    return (
      <div key={i}>
        <h1>{elem}</h1>
      </div>
    );
  });
  return a;
}

render(<HelloWorld files={files} />, document.getElementById("root"));
