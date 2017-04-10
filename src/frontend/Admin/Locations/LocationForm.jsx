import React from 'react';
import {bool, object, func} from 'prop-types';
import moment from 'moment-timezone';
import Select from 'react-select';

import '../../select.less';

const LocationForm = (props) => {
  const name = 'Pick a timezone';

  return (
    <div>
      <h3>{props.editing?'Edit':'New'} Location</h3>

      <form>
        <div className='form-group'>
          <label>Name</label>
          <input className='form-control' type='text' value={props.location.name} onChange={(e)=>{ props.save({target: 'name', value:e.target.value}); }} />
        </div>

        <div className='form-group'>
          <label>Timezone</label>
          <Select
            clearable={true}
            multi={false}
            value={props.location.timezone!=''?props.location.timezone:name}
            options={moment.tz.names().map((tz)=>{
              return {value: tz, label: tz};
            })}
            onChange={(value)=>{
              props.save({target: 'timezone', value:value.value});
            }}
            />
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
