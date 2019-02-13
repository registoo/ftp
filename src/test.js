const files = require("./files.json");
const React = require("react");
const { render } = require("react-dom");
const path = require("path");
require("./mysite.sass");
function FTPfiles(props) {
  const arr = Object.getOwnPropertyNames(props.startDir);
  if (arr.length == 0) {
    return null;
  }
  let id = 0;
  const a = arr.map(elem => {
    if (elem === "files") {
      return null;
    }
    const result = (
      <DirFile dirName={elem} dirObj={props.startDir[elem]} key={id} />
    );
    id += 1;
    return result;
  });
  if (props.startDir.files) {
    a.push(<DivFiles arrOfElem={props.startDir.files} key={id} />);
  }
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
  render() {
    return (
      <div>
        <div onClick={() => this.handlerButtonValue()} className="directory">
          <span className="dirPlus">{this.state.filesButton ? "+" : "-"} </span>
          <div className="dirStr">{this.props.dirName}</div>
        </div>
        <div className="childMargin">
          <FilesFromButton
            filesButton={this.state.filesButton}
            dirObj={this.props.dirObj}
          />
        </div>
      </div>
    );
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

function DivFiles(props) {
  const a = props.arrOfElem.map((elem, id) => {
    const separatePathToArr = elem.split("\\");
    return (
      <div key={id}>
        <a href={elem}>{separatePathToArr[separatePathToArr.length - 1]}</a>
      </div>
    );
  });
  return a;
}

render(<FTPfiles startDir={files} />, document.getElementById("root"));
