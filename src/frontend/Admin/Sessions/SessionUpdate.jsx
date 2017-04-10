import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import SessionForm from './SessionForm.jsx';
import {func} from 'prop-types';

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
    if(!nextProps.data.loading){
      this.setState({
        title: nextProps.data.session.title,
        summary: nextProps.data.session.summary,
        location: nextProps.data.session.location,
        presenter: nextProps.data.session.presenter,
        locations: nextProps.data.locations,
        presenters: nextProps.data.presenters
      });
    }
  }

  render(){
    if(this.props.data.loading){
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


const query = gql`query session($_id: String!){
  session(_id: $_id){
    _id, title, summary, location { _id, name, description}, presenter { _id, name, email, bio }
  }
  locations { _id, name }
  presenters { _id, name, email, bio }
}`;

const updateSession = gql`mutation updateSession($_id: String!, $title: String!, $summary: String, $location:String, $presenter:String, $start:String){
	updateSession(_id:$_id, title: $title, summary:$summary, location:$location, presenter:$presenter, start:$start) {
    _id
  }
}`;

export default compose(
  graphql(query,{options: (props)=>{
    return { variables: { _id: props.match.params._id}}
  }}),
  graphql(updateSession, {name:'save'})
)(SessionUpdate);
