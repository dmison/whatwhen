import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import LocationForm from './LocationForm.jsx';

class LocationNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: ''
    }
    this._save = this._save.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.data.loading){
      this.setState({
        name: nextProps.data.location.name,
        description: nextProps.data.location.description
      });
    }
  }

  render(){
    return (
      <div>
        <LocationForm editing={true} location={{
            name: this.state.name,
            description: this.state.description
          }} save={(update)=>{
            switch(update.target){
            case 'name': this.setState( { name: update.value}); break;
            case 'description': this.setState( { description: update.value}); break;
            }
          }} />
        <a className='btn btn-default btn-sm' onClick={this._save}>Save</a>
        <a className='btn btn-default btn-sm' onClick={()=>{
            this.props.history.replace('/admin/locations');
          }}>Cancel</a>

      </div>
    );
  }

  _save(){
    this.props.save({
      variables:{
        _id: this.props.match.params._id,
        name: this.state.name,
        description: this.state.description
      },
      refetchQueries: [{
        query: gql`query { locations { _id, name, description }}`
      }]
    }
  ).then(()=>{this.props.history.replace('/admin/locations');});
  }

}

LocationNew.propTypes = {
  save: React.PropTypes.func
};


const thisLocation = gql`query location($_id: String!){ location(_id: $_id){ _id, name, description }}`;

const updateLocation = gql`mutation updateLocation($_id: String!, $name: String, $description: String){
	updateLocation(_id:$_id, name: $name, description:$description) {
    _id
  }
}`;

export default compose(
  graphql(thisLocation,{name: 'data', options: (props)=>{
    return { variables: { _id: props.match.params._id}}
  }}),
  graphql(updateLocation, {name:'save'}) )(LocationNew);
