const files = require("./files.json");
const React = require("react");
const { render } = require("react-dom");

function FTPfiles(props) {
  console.log(props.startDir);
  const arr = Object.getOwnPropertyNames(props.startDir);
  if (arr.length == 0) {
    return null;
  }
  const a = arr.map((elem, id) => {
    if (elem === "files") {
      return null;
    }
    return <DirFile dirName={elem} dirObj={props.startDir[elem]} key={id} />;
  });
  return a;
}
class DirFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesButton: true
    };
  }
  handlerButtonValue() {
    this.setState({ filesButton: !this.state.filesButton });
  }
  fu() {
    return (
      <div className="flexbox">
        <div className="leftCol">
          <button onClick={() => this.handlerButtonValue()}>
            {this.state.filesButton ? "+" : "-"}
          </button>
          <FilesFromButton
            filesButton={this.state.filesButton}
            dirObj={this.props.dirObj}
          />
        </div>
        <div className="rightCol">{this.props.dirName}</div>
      </div>
    );
  }
  render() {
    return <div>{this.fu()}</div>;
  }
}

function FilesFromButton(props) {
  if (props.filesButton) {
    return null;
  }
  return (
    <div>
      <FTPfiles startDir={props.dirObj} />
    </div>
  );
}

render(<FTPfiles startDir={files} />, document.getElementById("root"));
