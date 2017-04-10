import React from 'react';
import {gql, graphql} from 'react-apollo';
import {object} from 'prop-types';

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

const AllSessions = gql`query { sessions { _id, title }}`;

export default graphql(AllSessions)(Sessions);
