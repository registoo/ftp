const files = require("./clientSide/files.json");
const React = require("react");
const { render } = require("react-dom");
const path = require("path");
const isVideo = require("./clientSide/isVideo");
require("./clientSide/mysite.sass");
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
        <div className="directory">
          {this.state.filesButton ? (
            <span onClick={() => this.handlerButtonValue()}>&#9658;</span>
          ) : (
            <span onClick={() => this.handlerButtonValue()}>&#9660;</span>
          )}
          <div onClick={() => this.handlerButtonValue()} className="dirStr">
            {this.props.dirName}
          </div>
        </div>
        <div>
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
    <div className="child">
      <FTPfiles startDir={props.dirObj} />
    </div>
  );
}

function DivFiles(props) {
  const a = props.arrOfElem.map((elem, id) => {
    const separatePathToArr = elem.split("\\");
    const fileName = separatePathToArr[separatePathToArr.length - 1];
    return (
      <div key={id} className="file">
        {isVideo(elem, fileName)}
        {/* mp4 or webm*/}
      </div>
    );
  });
  return a;
}

render(<FTPfiles startDir={files} />, document.getElementById("root"));
