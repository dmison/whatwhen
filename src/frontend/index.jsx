import React from 'react';
import {render} from 'react-dom';
import {IndexRoute, Route, HashRouter} from 'react-router-dom';

import {ApolloClient, ApolloProvider} from 'react-apollo';
import App from './App.jsx';
import Home from './Home.jsx';
import SessionsContainer from './SessionsContainer.js';

const client = new ApolloClient();

render(
  <ApolloProvider client={client}>
  <HashRouter>
    <App>
      <Route exact path='/' component={Home} />
      <Route exact path='/sessions' component={SessionsContainer} />
    </App>
  </HashRouter></ApolloProvider>, document.getElementById('app'));
