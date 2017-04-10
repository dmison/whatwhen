import React from 'react';
import {bool, object, func} from 'prop-types';

const LocationForm = (props) => {
    return (
      <div>
        <h3>{props.editing?'Edit':'New'} Location</h3>

        <form>
          <div className='form-group'>
            <label>Name</label>
            <input className='form-control' type='text' value={props.location.name} onChange={(e)=>{ props.save({target: 'name', value:e.target.value}); }} />
          </div>
          <div className='form-group'>
            <label>Description</label>
              <textarea className='form-control' type='text' value={props.location.description} onChange={(e)=>{ props.save({target: 'description', value:e.target.value}); }} />
          </div>
        </form>
      </div>
    );
  };

LocationForm.propTypes = {
  editing: React.PropTypes.bool,
  location: React.PropTypes.object,
  save: React.PropTypes.func
};

export default LocationForm;
