const { files } = require("./files.json");
const React = require("react");
const { render } = require("react-dom");
const path = require("path");

class FTPfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "+"
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
    switch (this.state.value) {
      case "+":
        this.setState({ value: "-" });
        break;
      case "-":
        this.setState({ value: "+" });
        break;
    }
  }
  render() {
    return (
      <div>
        <button
          onClick={() => this.handlerButtonValue()}
          className="buttonFiles"
        >
          {this.state.value}
        </button>
        <ul>{this.liFTP(files)}</ul>;
      </div>
    );
  }
}

render(<FTPfiles />, document.getElementById("root"));
