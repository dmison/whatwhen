const {sessions} = require('./data.js');

const resolveFunctions = {
  Query: {
    sessions(){
      return sessions;
    }
  }
}

module.exports = resolveFunctions;
