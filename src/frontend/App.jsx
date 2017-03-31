import React from 'react';
import {NavLink, Link, IndexRoute, Route, HashRouter} from 'react-router-dom';
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';

import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';

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

      <Navbar staticTop fluid inverse collapseOnSelect>
        <div className='container'>
        <Navbar.Header>
          <Navbar.Brand>Summit @ Sites</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href='#/'>Home</NavItem>
            <NavItem eventKey={2} href='#/sessions'>Sessions</NavItem>
            <NavItem eventKey={3} href='#/admin'>Admin</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={4} href='/logout'>Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </div>
      </Navbar>

      <div className='container'>
        <Route exact path='/' component={Home} />
        <Route exact path='/sessions' component={SessionsContainer} />
        <Route exact path='/admin' component={AdminContainer} />
      </div>
    </div>
  </HashRouter>
    </ApolloProvider>
  );
}

export default App;
