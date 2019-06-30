const React = require('react');
const { render } = require('react-dom');

require('../mysite.sass');
const isVideo = require('./isVideo');
const ftpFiles = require('../ftpFiles.json')['/'];

function FTPfiles(props) {
  const startDir = props.startDir;
  const result = [];
  let id = 0;
  if (startDir.files.length > 0) {
    result.push(<FileElement files={startDir.files} key={id} />);
    id = id + 1;
  }
  if (Object.keys(startDir.folders).length > 0) {
    Object.keys(startDir.folders)
      .sort()
      .forEach(elem => {
        result.push(
          <FileDir
            elemValue={startDir.folders[elem]}
            key={id}
            elemName={startDir.folders[elem].folderName}
          />
        );
        id = id + 1;
      });
  }
  if (!result.length) {
    return <div>Пустая папка</div>;
  }
  return result;
}

function FileElement(props) {
  const files = props.files;
  files.sort(sortFunc);
  const resultArr = files.map((elem, id) => {
    return (
      <div key={id} className="file">
        {isVideo(elem)}
      </div>
    );
  });
  return resultArr;
}

class FileDir extends React.Component {
  constructor(props) {
    super(props);
    this.elemValue = this.props.elemValue;
    this.elemName = this.props.elemName;
    this.state = {
      filesButton: true,
    };
  }
  handlerButtonValue() {
    this.setState({ filesButton: !this.state.filesButton });
  }
  render() {
    return (
      <div>
        <div
          className="directory comfortaa"
          onClick={() => this.handlerButtonValue()}
        >
          {this.state.filesButton ? <span>&#9658;</span> : <span>&#9660;</span>}
          <span>{this.elemName}</span>
        </div>
        <div>
          <FilesFromButton
            filesButton={this.state.filesButton}
            dirObj={this.elemValue}
          />
        </div>
      </div>
    );
  }
}

//добавление содержимого папки по клику на папку
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

const sortFunc = (a, b) => a.fileName.split(' ')[0] - b.fileName.split(' ')[0];

render(<FTPfiles startDir={ftpFiles} />, document.getElementById('root'));
