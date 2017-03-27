import React from 'react';
import {render} from 'react-dom';
import {IndexRoute, Route, HashRouter} from 'react-router-dom';

import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';
import App from './App.jsx';
import Home from './Home.jsx';
import SessionsContainer from './SessionsContainer.js';

// const client = new ApolloClient();
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});
const client = new ApolloClient({
  networkInterface,
});


render(
  <ApolloProvider client={client}>
  <HashRouter>
    <App>
      <Route exact path='/' component={Home} />
      <Route exact path='/sessions' component={SessionsContainer} />
    </App>
  </HashRouter></ApolloProvider>, document.getElementById('app'));
