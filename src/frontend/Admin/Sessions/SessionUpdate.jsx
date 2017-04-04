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
      start:''
    }
    this._save = this._save.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.data.loading){
      this.setState({
        title: nextProps.data.session.title,
        summary: nextProps.data.session.summary,
        location: nextProps.data.session.location
      });
    }
  }

  render(){
    return (
      <div>
        <SessionForm editing={true} session={{
            title: this.state.title,
            summary: this.state.summary,
            location: this.state.location
          }} save={(update)=>{
            switch(update.target){
            case 'title': this.setState( { title: update.value}); break;
            case 'summary': this.setState( { summary: update.value}); break;
            case 'location': this.setState( { location: update.value}); break;
            }
          }} />
        <a className='btn btn-default btn-sm' onClick={this._save}>Save</a>
        <a className='btn btn-default btn-sm' onClick={()=>{
            this.props.history.replace('/admin/sessions');
          }}>Cancel</a>

      </div>
    );
  }

  _save(){
    this.props.save({
      variables:{
        _id: this.props.match.params._id,
        title: this.state.title,
        summary: this.state.summary,
        location: this.state.location
      },
      refetchQueries: [{
        query: gql`query { sessions { _id, title, location }}`
      }]
    }
  ).then(()=>{this.props.history.replace('/admin/sessions');});
  }

}

SessionNew.propTypes = {
  save: React.PropTypes.func
};


const thisSession = gql`query session($_id: String!){ session(_id: $_id){ _id, title, summary, location }}`;

const updateSession = gql`mutation updateSession($_id: String!, $summary: String, $location:String, $start:String){
	updateSession(_id:$_id, summary:$summary, location:$location, start:$start) {
    _id
  }
}`;

export default compose( graphql(thisSession,{name: 'data', options: (props)=>{
  return { variables: { _id: props.match.params._id}}
}}), graphql(updateSession, {name:'save'}) )(SessionNew);
