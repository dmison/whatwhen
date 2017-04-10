import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import SessionForm from './SessionForm.jsx';

class SessionUpdate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      summary: '',
      location: null,
      presenter: null,
      start:'',
      locations:[],
      presenters:[]
    }
    this._save = this._save.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log('newProps:', nextProps);
    if(!nextProps.thisSession.loading){
      this.setState({
        title: nextProps.thisSession.session.title,
        summary: nextProps.thisSession.session.summary,
        location: nextProps.thisSession.session.location,
        presenter: nextProps.thisSession.session.presenter
      });
    }
    if(!nextProps.allLocations.loading){
      this.setState({ locations: nextProps.allLocations.locations});
    }
    if(!nextProps.allPresenters.loading){
      this.setState({ presenters: nextProps.allPresenters.presenters});
    }
  }

  render(){
    if(this.props.thisSession.loading && this.props.allLocations.loading && this.props.allPresenters.loading){
      console.log('still loading');
      return <div>loading ...</div>;
    } else {
    return (
      <div>
        <SessionForm editing={true} session={{
            title: this.state.title,
            summary: this.state.summary,
            location: this.state.location,
            presenter: this.state.presenter
          }}
          locations={this.state.locations}
          presenters={this.state.presenters}
          save={(update)=>{
            switch(update.target){
            case 'title': this.setState( { title: update.value}); break;
            case 'summary': this.setState( { summary: update.value}); break;
            case 'location': this.setState( { location: update.value }); break;
            case 'presenter': this.setState( { presenter: update.value }); break;
            }
          }} />
        <a className='btn btn-default btn-sm' onClick={this._save}>Save</a>
        <a className='btn btn-default btn-sm' onClick={()=>{
            this.props.history.replace('/admin/sessions');
          }}>Cancel</a>

      </div>
    );
  }
  }

  _save(){
    this.props.save({
      variables:{
        _id: this.props.match.params._id,
        title: this.state.title,
        summary: this.state.summary,
        location: this.state.location._id,
        presenter: this.state.presenter._id
      },
      refetchQueries: [{
        query: gql`query { sessions { _id, title, summary, location { _id, name, description }, presenter { _id, name, email, bio} }}`
      }]
    }
  ).then(()=>{this.props.history.replace('/admin/sessions');});
  }

}

SessionUpdate.propTypes = {
  save: React.PropTypes.func
};


const thisSession = gql`query session($_id: String!){ session(_id: $_id){ _id, title, summary, location { _id, name, description}, presenter { _id, name, email, bio } }}`;

const allLocations = gql`query { locations { _id, name }}`;
const allPresenters = gql`query { presenters { _id, name, email, bio }}`;

const updateSession = gql`mutation updateSession($_id: String!, $title: String!, $summary: String, $location:String, $presenter:String, $start:String){
	updateSession(_id:$_id, title: $title, summary:$summary, location:$location, presenter:$presenter, start:$start) {
    _id
  }
}`;

export default compose(
  graphql(thisSession,{name: 'thisSession', options: (props)=>{
    return { variables: { _id: props.match.params._id}}
  }}),
  graphql(allLocations, {name: 'allLocations'}),
  graphql(allPresenters, {name: 'allPresenters'}),
  graphql(updateSession, {name:'save'})
)(SessionUpdate);
