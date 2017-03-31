import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const Admin = (props) => {

  return (
    <div>
      <h2>Admin</h2>
      <a className='btn btn-info btn-sm'>Add Session</a>
      {props.loading?'loading':<AdminList sessions={props.data.sessions}/>}
    </div>
  );
};

const AdminList = (props) => {
  return <ul>
    {props.sessions? props.sessions.map((s)=>{
      return <li style={{marginBottom: 10}}key={s._id}>{s.title} <a className='btn btn-xs btn-danger' onClick={()=>{
        
      }}>x</a></li>;
    }):''}
  </ul>;
}

Admin.propTypes = {
  data: React.PropTypes.object
};

export default Admin;
