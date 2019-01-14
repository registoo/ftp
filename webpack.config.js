const path = require('path');

module.exports = (env, options) => {
  const NODE_ENV = options.mode
  return {
    entry: {
      testReact: './src/testReact.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/',
      library: '[name]'
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
        include: [path.resolve(__dirname, 'src')],
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
}
