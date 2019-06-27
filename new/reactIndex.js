const React = require('react');
const { render } = require('react-dom');

const ftpFiles = require('./ftpFiles.json')['/'];
const isVideo = require('../src/clientSide/isVideo');
require('../src/clientSide/mysite.sass');

function FTPfiles(props) {
  const startDir = props.startDir;
  const result = [];
  if (startDir.files.length > 0) {
    result.push(<FileElement files={startDir.files} />);
  }
  return result;
}

function FileElement(props) {
  const files = props.files;
  return files.map((elem, id) => {
    const separatePathToArr = elem.split('\\');
    const fileName = separatePathToArr[separatePathToArr.length - 1];
    return (
      <div key={id} className="file">
        {isVideo(elem, fileName)}
      </div>
    );
  });
}

render(<FTPfiles startDir={ftpFiles} />, document.getElementById('root'));
