var path = require('path');

module.exports = {
  entry: './dist/testReact.js',
  output: {
    path: path.resolve(__dirname, 'afterWebpack'),
    filename: 'bundle.js',
    publicPath: 'afterWebpack/'
  }
};
