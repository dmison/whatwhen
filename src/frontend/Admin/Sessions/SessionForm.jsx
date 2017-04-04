import React from 'react';

const SessionForm = (props) => {
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
              <input className='form-control' type='text' value={props.session.location} onChange={(e)=>{ props.save({target: 'location', value:e.target.value}); }} />
          </div>

        </form>
      </div>
    );
  };

SessionForm.propTypes = {
  editing: React.PropTypes.bool,
  session: React.PropTypes.object,
  save: React.PropTypes.func
};

export default SessionForm;
