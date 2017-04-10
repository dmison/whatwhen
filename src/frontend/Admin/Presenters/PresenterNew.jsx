import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import PresenterForm from './PresenterForm.jsx';
import {func} from 'prop-types';

class PresenterNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      bio:''
    }
    this._save = this._save.bind(this);
  }

  render(){
    return (
      <div>
        <PresenterForm editing={false} presenter={{
            name: this.state.name,
            email: this.state.email,
            bio: this.state.bio
          }} save={(update)=>{
            switch(update.target){
            case 'name': this.setState( { name: update.value}); break;
            case 'email': this.setState( { email: update.value}); break;
            case 'bio': this.setState( { bio: update.value}); break;
            }
          }} />
        <a className='btn btn-default btn-sm' onClick={this._save}>Save</a>
        <a className='btn btn-default btn-sm' onClick={()=>{
            this.props.history.replace('/admin/presenters');
          }}>Cancel</a>

      </div>
    );
  }

  _save(){
    this.props.save({
      variables:{
        name: this.state.name,
        email: this.state.email,
        bio: this.state.bio
      },
      refetchQueries: [{
        query: gql`query { presenters { _id, name, email, bio }}`
      }]
    }
  ).then(()=>{this.props.history.replace('/admin/presenters');});
  }

}

PresenterNew.propTypes = {
  save: React.PropTypes.func
};


const addPresenter = gql`mutation addPresenter($name:String!, $email:String, $bio:String){
	addPresenter(name:$name, email:$email, bio:$bio) {
    _id
  }
}`;

export default compose( graphql(addPresenter, {name:'save'}) )(PresenterNew);
