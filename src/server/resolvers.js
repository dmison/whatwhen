// const {sessions} = require('./data.js');
const {Session} = require('./connectors.js');
const uuid =require('node-uuid');

const resolveFunctions = {
  Query: {
    sessions(){
      return Session.find();
    },
    session(_,args){
      return Session.findOne({_id: args._id});
    }
  },
  Mutation: {
    addSession(_, args){
      args._id = uuid.v1();
      args.summary = args.summary?args.summary:'';
      args.location = args.location?args.location:'';
      args.start = args.start?args.start:'';
      const newSession = new Session(args);
      return newSession.save();
    },
    updateSession(_, args){
      return Session.findOneAndUpdate({_id:args._id}, {$set: args});
    },
    deleteSession(_, args){
      return Session.deleteOne({_id: args._id});
    }

  }
}

module.exports = resolveFunctions;
