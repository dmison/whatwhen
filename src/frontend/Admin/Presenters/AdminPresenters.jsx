import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import {Link} from 'react-router-dom';

const PresenterAdmin = (props) => {
  return (
    <div>
      <h2>Manage Presenters</h2>
      <Link className='btn btn-info btn-sm' to='/admin/presenters/new'>Add Presenter</Link>
      {props.loading?'loading': <PresenterAdminList
        presenters={props.data.presenters}
        deletePresenter={(_id)=>{
          props.deletePresenter( {variables:{presenterID: _id},
                                refetchQueries: [{
                                  query: gql`query { presenters { _id, name, email, bio } }`
                                }]
                              });
        }} /> }
    </div>
  );
};

const PresenterAdminList = (props) => {
  return <ul>
    {props.presenters? props.presenters.map((l)=>{
      return <li style={{marginBottom: 10}} key={l._id}>{l.name}
        <Link className='btn btn-xs btn-warning' to={`/admin/presenters/update/${l._id}`} >Edit</Link>
        <a className='btn btn-xs btn-danger' onClick={()=>{ props.deletePresenter(l._id); }}>Delete</a>
      </li>;
    }):''}
  </ul>;
}

PresenterAdmin.propTypes = {
  data: React.PropTypes.object
};

const allPresenters = gql`query { presenters { _id, name, email, bio } }`;

const deletePresenter = gql`mutation deletePresenter($presenterID: String!){ deletePresenter(_id: $presenterID){ _id }}`;


export default compose(
  graphql(allPresenters),
  graphql(deletePresenter, {name:'deletePresenter', forceFetch:true})
)(PresenterAdmin);
