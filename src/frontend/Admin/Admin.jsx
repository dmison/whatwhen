import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import {Link} from 'react-router-dom';

const Admin = (props) => {
  return (
    <div>
      <h2>Admin</h2>
      <ul>
        <li><Link className='' to='/admin/sessions'>Manage Sessions</Link></li>
        <li><Link className='' to='/admin/presenters'>Manage Presenters</Link></li>
        <li><Link className='' to='/admin/locations'>Manage Locations</Link></li>
      </ul>
    </div>
  );
};

export default Admin;
