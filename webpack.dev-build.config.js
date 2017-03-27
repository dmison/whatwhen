const baseConfig = require('./webpack.config.js');
const path = require('path');

var devConfig = baseConfig;
// devConfig.devServer = {
//   hot: true,
//   contentBase: './src/frontend/public',
//   proxy: [
//     { '/graphql': { target: 'http://localhost:9000', secure: false} },
//     { '/graphiql': { target: 'http://localhost:9000', secure: false} },
//     { '/schema': { target: 'http://localhost:9000', secure: false} },
//     { '/login': { target: 'http://localhost:9000', secure: false} },
//     { '/logout': { target: 'http://localhost:9000', secure: false} },
//     { '/auth': { target: 'http://localhost:9000', secure: false} },
//     { '/auth/callback': { target: 'http://localhost:9000', secure: false} }
//   ]
// };
//
// devConfig.output.publicPath = '/';

devConfig.output = {
  path: path.join(__dirname, '/src/server/frontend'),
  filename: '[name]',
  publicPath: './'
},

module.exports = devConfig;
