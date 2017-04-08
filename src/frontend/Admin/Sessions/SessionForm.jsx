import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const SessionForm = (props) => {
  var title='Pick a location';
  var selectedLocation = null;
  if(props.session.location){
    title = props.session.location.name;
    selectedLocation = props.session.location._id;
  }

    return (
      <div>
        <h3>{props.editing?'Edit':'New'} Session</h3>

        <form>
          <div className='form-group'>
            <label>Title</label>
            <input className='form-control' type='text' value={props.session.title} onChange={(e)=>{ props.save({target: 'title', value:e.target.value}); }} />
          </div>
          <div className='form-group'>
            <label>Summary</label>
            <textarea className='form-control' type='text' value={props.session.summary} onChange={(e)=>{ props.save({target: 'summary', value:e.target.value}); }} />
          </div>
          <div className='form-group'>
            <label>Location</label>

            <DropdownButton className='form-control' title={title} key={1} id='dropdown-location'>
              {props.locations.map((l, index)=>{
                return <MenuItem key={l._id} active={l._id === selectedLocation} eventKey={index} onClick={()=>{
                    props.save({target: 'location', value:l});
                  }}>{l.name}</MenuItem>
              })}
            </DropdownButton>
          </div>

        </form>
      </div>
    );
  };

SessionForm.propTypes = {
  editing: React.PropTypes.bool,
  session: React.PropTypes.object,
  locations: React.PropTypes.array,
  save: React.PropTypes.func
};

export default SessionForm;


//           <input className='form-control' type='text' value={props.session.location} onChange={(e)=>{ props.save({target: 'location', value:e.target.value}); }} />


// <MenuItem eventKey="1">Action</MenuItem>
// <MenuItem eventKey="2">Another action</MenuItem>
// <MenuItem eventKey="3" active>Active Item</MenuItem>
// <MenuItem eventKey="4">Separated link</MenuItem>
