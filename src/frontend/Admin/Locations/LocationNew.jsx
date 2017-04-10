import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import LocationForm from './LocationForm.jsx';
import {func} from 'prop-types';

class LocationNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: ''
    }
    this._save = this._save.bind(this);
  }

  render(){
    return (
      <div>
        <LocationForm editing={false} location={{
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


const addLocation = gql`mutation addLocation($name:String!, $description:String){
	addLocation(name:$name, description:$description) {
    _id
  }
}`;

export default compose( graphql(addLocation, {name:'save'}) )(LocationNew);
