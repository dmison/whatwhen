const baseConfig = require('./webpack.config.js');
const path = require('path');

var devConfig = baseConfig;
devConfig.devServer = {
  proxy: { '*': 'http://localhost:9090' }
};
devConfig.entry = {
  'index.js': [
    // 'babel-polyfill',
    // 'react-hot-loader/patch',
    './src/frontend/index.jsx'
  ]
};
// plugins

devConfig.output.publicPath = '/';

module.exports = devConfig;

// how to proxy like a pro
// https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96
