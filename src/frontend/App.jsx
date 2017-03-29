import React from 'react';
import {Link, IndexRoute, Route, HashRouter} from 'react-router-dom';
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';

import Home from './Home.jsx';
import SessionsContainer from './SessionsContainer.js';
import AdminContainer from './Admin/GraphQLContainer.js';

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


const App = (props) => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>

    <div>
      <h1>Summit @ Sites</h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/sessions'>Sessions</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
        <li><a href='/logout'>logout</a></li>
      </ul>
          <Route exact path='/' component={Home} />
          <Route exact path='/sessions' component={SessionsContainer} />
          <Route exact path='/admin' component={AdminContainer} />
    </div>
  </HashRouter>
    </ApolloProvider>
  );
}


export default App;
