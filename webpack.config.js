const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      // Options to configure the babel. here we have set up the preset. this can be replaced with .babelrc file
      query: {
        presets: ["@babel/preset-react"]
      }
    }]
  }
};
