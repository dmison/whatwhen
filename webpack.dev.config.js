const baseConfig = require('./webpack.config.js');

var devConfig = baseConfig;
devConfig.devServer = {
  hot: true,
  contentBase: './src/frontend/public',
  proxy: {
    '/graphql': {
      target: 'http://localhost:9000',
      secure: false
    }
  }
};

devConfig.output.publicPath = '/';

module.exports = devConfig;
