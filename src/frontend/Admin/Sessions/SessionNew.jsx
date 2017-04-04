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


const addSession = gql`mutation addSession($title:String!, $summary:String){
	addSession(title:$title, summary:$summary) {
    _id
  }
}`;

export default compose( graphql(addSession, {name:'save'}) )(SessionNew);
