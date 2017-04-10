import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import {Link} from 'react-router-dom';

const LocationAdmin = (props) => {
  return (
    <div>
      <h2>Manage Locations</h2>
      <Link className='btn btn-info btn-sm' to='/admin/locations/new'>Add Location</Link>
      {props.loading?'loading': <LocationAdminList
        locations={props.data.locations}
        deleteLocation={(_id)=>{
          props.deleteLocation( {variables:{locationID: _id},
                                refetchQueries: [{
                                  query: gql`query { locations { _id, name, description } }`
                                }]
                              });
        }} /> }
    </div>
  );
};

const LocationAdminList = (props) => {
  return <ul>
    {props.locations? props.locations.map((l)=>{
      return <li style={{marginBottom: 10}} key={l._id}>{l.name}
        <Link className='btn btn-xs btn-warning' to={`/admin/locations/update/${l._id}`} >Edit</Link>
        <a className='btn btn-xs btn-danger' onClick={()=>{ props.deleteLocation(l._id); }}>Delete</a>
      </li>;
    }):''}
  </ul>;
}

LocationAdmin.propTypes = {
  data: React.PropTypes.object
};

const allLocations = gql`query { locations { _id, name, description } }`;

const deleteLocation = gql`mutation deleteLocation($locationID: String!){ deleteLocation(_id: $locationID){ _id }}`;


export default compose(
  graphql(allLocations),
  graphql(deleteLocation, {name:'deleteLocation', forceFetch:true})
)(LocationAdmin);
