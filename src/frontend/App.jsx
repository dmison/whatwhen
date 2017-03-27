import React from 'react';
import {Link} from 'react-router-dom';

const App = (props) => {
  return (
    <div>
      <h1>Summit @ Sites</h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/sessions'>Sessions</Link></li>

      </ul>
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node
};

export default App;
