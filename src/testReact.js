const files = require("./files.json");
const React = require("react");
const { render } = require("react-dom");
const path = require("path");

function FilesFromButton(props) {
  if (props.filesButton) {
    return null;
  }
  const a = props.dirName.map(elem => (
    <li>
      <a href={elem}>{elem}</a>
    </li>
  ));
  return a;
}
class FTPfiles extends React.Component {
  strElem(arr, obj) {
    const a = arr.map(elem => {
      if (elem === "files") {
        return null;
      }
      return <FileDir targetObj={obj[elem]} />;
    });
    return a;
  }
  render() {
    return <div>{this.strElem(Object.getOwnPropertyNames(files), files)}</div>;
  }
}

render(<FTPfiles />, document.getElementById("root"));

// {alert(Object.getOwnPropertyNames(files)[1])}

class FileDir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesButton: true
    };
  }
  fu() {
    <div className="flexbox">
      <div className="leftCol">
        <button onClick={() => this.handlerButtonValue()}>
          {this.state.filesButton ? "+" : "-"}
        </button>
        <FilesFromButton
          filesButton={this.state.filesButton}
          dirName={this.props.targetObj.files}
        />
      </div>
      <div className="rightCol">{e}</div>
    </div>;
  }
  handlerButtonValue() {
    this.setState({ filesButton: !this.state.filesButton });
  }
  render() {
    return <div>{this.fu()}</div>;
  }
}
