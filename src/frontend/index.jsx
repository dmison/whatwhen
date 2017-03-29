import React from 'react';
import {render} from 'react-dom';

import 'font-awesome/css/font-awesome.css';
import './bootstrap/bootstrap.less';

import App from './App.jsx';


render( <App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextRootContainer = require('./App.jsx').default;
    render(<NextRootContainer />, document.getElementById('app'));
  });
}
