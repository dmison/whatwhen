import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import SessionForm from './SessionForm.jsx';

class SessionNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      summary: '',
      location: null,
      presenter: null,
      start:'',
      locations: [],
      presenters: []
    }
    this._save = this._save.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.data.loading){
      this.setState({
        locations: nextProps.data.locations,
        presenters: nextProps.data.presenters
      });
    }
  }

  render(){
    return (
      <div>
        <SessionForm editing={false} session={{
            title: this.state.title,
            summary: this.state.summary,
            location: this.state.location,
            presenter: this.state.presenter
          }} save={(update)=>{
            switch(update.target){
            case 'title': this.setState( { title: update.value}); break;
            case 'summary': this.setState( { summary: update.value}); break;
            case 'location': this.setState( { location: update.value}); break;
            case 'presenter': this.setState( { presenter: update.value}); break;
            }
          }} locations={this.state.locations} presenters={this.state.presenters} />
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
        location: this.state.location._id,
        presenter: this.state.presenter._id
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

const locationsAndPresenters = gql`query { locations { _id, name, description } presenters { _id, name, email, bio }}`;

const addSession = gql`mutation addSession($title:String!, $summary:String, $location:String, $presenter:String){
	addSession(title:$title, summary:$summary, location:$location, presenter:$presenter) {
    _id, title, summary, location { _id, name, description }, presenter {_id, name, email, bio}
  }
}`;

export default compose( graphql(locationsAndPresenters), graphql(addSession, {name:'save'}) )(SessionNew);
