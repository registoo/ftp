const path = require('path');
const singleEntryPoint = require('./constants.js').singleWebpackEntryPoint;
const entryOutputDir = require('./constants.js').singleWebpackEntryPointDir;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  const NODE_ENV = options.mode;
  return {
    entry: {
      [singleEntryPoint]: './new/clientSide/js/reactIndex.js',
    },
    output: {
      path: entryOutputDir,
      filename: '[name].js',
      publicPath: '/',
      library: '[name]',
    },
    node: {
      fs: 'empty',
    },
    devtool: NODE_ENV === 'development' ? 'source-map' : false,
    watch: NODE_ENV === 'development',
    watchOptions: {
      aggregateTimeout: 200,
      ignored: /node_modules/,
      poll: 1000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './new/clientSide/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: [path.resolve(__dirname)],
          use: {
            loader: 'babel-loader',
            // Options to configure the babel. here we have set up the preset. this can be replaced with .babelrc file
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.sass$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  };
};
