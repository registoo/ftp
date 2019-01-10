const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/testReact.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  node: {
   fs: "empty"
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : false,
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/,
    poll: 1000
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        // Options to configure the babel. here we have set up the preset. this can be replaced with .babelrc file
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    }]
  }
};
