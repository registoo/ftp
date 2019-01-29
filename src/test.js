const { files } = require("./files.json");
const React = require("react");
const { render } = require("react-dom");
const path = require("path");

class FTPfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cross: true
    };
  }
  handleClick() {
    alert(this.state.cross);
  }
  render() {
    return <HelloWorld files={files} onClick={() => this.handleClick()} />;
  }
}

function HelloWorld(props) {
  function liFTP(arr) {
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
  const f = liFTP(props.files);
  return (
    <div>
      <button onClick={props.onClick}>+</button>
      <ul>{f}</ul>;
    </div>
  );
}

render(<FTPfiles />, document.getElementById("root"));
