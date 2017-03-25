const baseConfig = require('./webpack.config.js');

var devConfig = baseConfig;
devConfig.devServer = {
  hot: true,
  contentBase: './src/frontend/public'
};

devConfig.output.publicPath = '/';

module.exports = devConfig;
