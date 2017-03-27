import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const Sessions = (props) => {

  return (
    <div>
      <h2>Sessions</h2>
      {props.loading?'loading':<SessionsList sessions={props.data.sessions}/>}
    </div>
  );
};

const SessionsList = (props) => {
  return <ul>
    {props.sessions? props.sessions.map((s)=>{
      return <li key={s._id}>{s.title}</li>;
    }):''}
  </ul>;
}

Sessions.propTypes = {
  data: React.PropTypes.object
};

export default Sessions;
