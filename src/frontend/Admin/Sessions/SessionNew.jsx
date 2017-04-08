import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import SessionForm from './SessionForm.jsx';

class SessionNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      summary: '',
      location: '',
      start:'',
      locations: []
    }
    this._save = this._save.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.locations.loading){
      this.setState({
        locations: nextProps.locations.locations
      });
    }
  }

  render(){
    return (
      <div>
        <SessionForm editing={false} session={{
            title: this.state.title,
            summary: this.state.summary,
            location: this.state.location
          }} save={(update)=>{
            switch(update.target){
            case 'title': this.setState( { title: update.value}); break;
            case 'summary': this.setState( { summary: update.value}); break;
            case 'location': this.setState( { location: update.value}); break;
            }
          }} locations={this.state.locations} />
        <a className='btn btn-default btn-sm' onClick={this._save}>Save</a>
        <a className='btn btn-default btn-sm' onClick={()=>{
            this.props.history.replace('/admin/sessions');
          }}>Cancel</a>

      </div>
    );
  }

  _save(){
    console.log(this.state);
    this.props.save({
      variables:{
        title: this.state.title,
        summary: this.state.summary,
        location: this.state.location._id
      },
      refetchQueries: [{
        query: gql`query { sessions { _id, title }}`
      }]
    }
  ).then(()=>{this.props.history.replace('/admin/sessions');});
  }

}

SessionNew.propTypes = {
  save: React.PropTypes.func
};

const allLocations = gql`query { locations { _id, name, description }}`;

const addSession = gql`mutation addSession($title:String!, $summary:String, $location:String){
	addSession(title:$title, summary:$summary, location:$location) {
    _id, title, summary, location { _id, name, description }
  }
}`;

export default compose( graphql(addSession, {name:'save'}), graphql(allLocations, {name:'locations'}) )(SessionNew);
