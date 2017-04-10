import React from 'react';
import {bool, object, func} from 'prop-types';

const PresenterForm = (props) => {
    return (
      <div>
        <h3>{props.editing?'Edit':'New'} Presenter</h3>

        <form>
          <div className='form-group'>
            <label>Name</label>
            <input className='form-control' type='text' value={props.presenter.name} onChange={(e)=>{ props.save({target: 'name', value:e.target.value}); }} />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input className='form-control' type='text' value={props.presenter.email} onChange={(e)=>{ props.save({target: 'email', value:e.target.value}); }} />
          </div>
          <div className='form-group'>
            <label>Bio</label>
              <textarea className='form-control' type='text' value={props.presenter.bio} onChange={(e)=>{ props.save({target: 'bio', value:e.target.value}); }} />
          </div>
        </form>
      </div>
    );
  };

PresenterForm.propTypes = {
  editing: React.PropTypes.bool,
  presenter: React.PropTypes.object,
  save: React.PropTypes.func
};

export default PresenterForm;
