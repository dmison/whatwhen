import React from 'react';
import {NavLink, Link, IndexRoute, Route, HashRouter} from 'react-router-dom';
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';

import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from './NavItem/NavItem.js';

import Home from './Home.jsx';
import Sessions from './Sessions.jsx';

import Admin from './Admin/Admin.jsx';
import AdminSessions from './Admin/Sessions/AdminSessions.jsx';
import SessionNew from './Admin/Sessions/SessionNew.jsx';
import SessionUpdate from './Admin/Sessions/SessionUpdate.jsx';

// const client = new ApolloClient();
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o._id
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
        <Route exact path='/sessions' component={Sessions} />

        <Route exact path='/admin' component={Admin} />
        <Route exact path='/admin/sessions' component={AdminSessions} />
        <Route exact path='/admin/sessions/new' component={SessionNew} />
        <Route exact path='/admin/sessions/update/:_id' component={SessionUpdate} />

      </div>
    </div>
  </HashRouter>
    </ApolloProvider>
  );
}

export default App;
