import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import PresenterForm from './PresenterForm.jsx';

class PresenterNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      bio: ''
    }
    this._save = this._save.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.data.loading){
      this.setState({
        name: nextProps.data.presenter.name,
        email: nextProps.data.presenter.email,
        bio: nextProps.data.presenter.bio
      });
    }
  }

  render(){
    return (
      <div>
        <PresenterForm editing={true} presenter={{
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
        _id: this.props.match.params._id,
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


const thisPresenter = gql`query presenter($_id: String!){ presenter(_id: $_id){ _id, name, email, bio }}`;

const updatePresenter = gql`mutation updatePresenter($_id: String!, $name: String, $email: String, $bio: String){
	updatePresenter(_id:$_id, name: $name, email:$email, bio:$bio) {
    _id
  }
}`;

export default compose(
  graphql(thisPresenter,{name: 'data', options: (props)=>{
    return { variables: { _id: props.match.params._id}}
  }}),
  graphql(updatePresenter, {name:'save'}) )(PresenterNew);
