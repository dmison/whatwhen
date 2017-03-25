const {sessions} = require('./data.js');

const resolveFunctions = {
  Query: {
    sessions(){
      return sessions;
    },
    session(_, args){
      return sessions.find((s)=>{
        return s._id === args._id;
      });
    }
  }
}

module.exports = resolveFunctions;
