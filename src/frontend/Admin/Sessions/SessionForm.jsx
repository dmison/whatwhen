import React from 'react';
import {bool, object, array, func} from 'prop-types';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const SessionForm = (props) => {
  var title='Pick a location';
  var selectedLocation = null;
  if(props.session.location){
    title = props.session.location.name;
    selectedLocation = props.session.location._id;
  }

  var name='Pick a presenter';
  var selectedPresenter = null;
  if(props.session.presenter){
    name = props.session.presenter.name;
    selectedPresenter = props.session.presenter._id;
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
            <label>Presenter</label>
            <DropdownButton className='form-control' title={name} key={1} id='dropdown-location'>
              {props.presenters.map((p, index)=>{
                return <MenuItem key={p._id} active={p._id === selectedPresenter} eventKey={index} onClick={()=>{
                    props.save({target: 'presenter', value:p});
                  }}>{p.name}</MenuItem>
              })}
            </DropdownButton>
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
  presenters: React.PropTypes.array,
  save: React.PropTypes.func
};

export default SessionForm;
