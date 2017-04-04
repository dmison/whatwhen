import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import {Link} from 'react-router-dom';

const Admin = (props) => {
  return (
    <div>
      <h2>Manage Sessions</h2>
      <Link className='btn btn-info btn-sm' to='/admin/sessions/new'>Add Session</Link>
      {props.loading?'loading': <AdminList  sessions={props.data.sessions}
                                            deleteSession={(_id)=>{
                                              props.deleteSession({variables:{sessionID: _id}}).then(()=>{
                                              props.data.refetch();
                                              });} } /> }
    </div>
  );
};

const AdminList = (props) => {
  return <ul>
    {props.sessions? props.sessions.map((s)=>{
      return <li style={{marginBottom: 10}} key={s._id}>{s.title}
        <Link className='btn btn-xs btn-warning' to={`/admin/sessions/update/${s._id}`} >Edit</Link>
        <a className='btn btn-xs btn-danger' onClick={()=>{ props.deleteSession(s._id); }}>Delete</a>
      </li>;
    }):''}
  </ul>;
}

Admin.propTypes = {
  data: React.PropTypes.object
};

const allSessions = gql`query { sessions { _id, title }}`;

const deleteSession = gql`mutation deleteSession($sessionID: String!){ deleteSession(_id: $sessionID){ _id }}`;


export default compose(
  graphql(allSessions),
  graphql(deleteSession, {name:'deleteSession', forceFetch:true})
)(Admin);
