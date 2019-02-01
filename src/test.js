const { files } = require("./files.json");
const React = require("react");
const { render } = require("react-dom");
const path = require("path");
function FilesFromButton(props) {
  if (props.filesButton) {
    return null;
  }
  return <div>qwe</div>;
}
class FTPfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesButton: true
    };
  }
  liFTP(arr) {
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
  handlerButtonValue() {
    this.setState({ filesButton: !this.state.filesButton });
  }

  render() {
    return (
      <div>
        <div>
          <button
            onClick={() => this.handlerButtonValue()}
            className="buttonFiles"
          >
            {this.state.filesButton ? "+" : "-"}
          </button>
          <FilesFromButton filesButton={this.state.filesButton} />
        </div>
        <ul>{this.liFTP(files)}</ul>;
      </div>
    );
  }
}

render(<FTPfiles />, document.getElementById("root"));
module.exports.welcome = alert("привет мир !!!");
