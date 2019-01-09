const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  node: {
   fs: "empty"
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
