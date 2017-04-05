// const {sessions} = require('./data.js');
const {Session, Location} = require('./connectors.js');
const uuid =require('node-uuid');

const resolveFunctions = {
  Query: {
    sessions(){
      return Session.find();
    },
    session(_,args){
      return Session.findOne({_id: args._id});
    },
    locations(){
      return Location.find();
    },
    location(_,args){
      return Location.findOne({_id: args._id});
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
    },

    addLocation(_, args){
      args._id = uuid.v1();
      args.description = args.description?args.description:'';
      const newLocation = new Location(args);
      return newLocation.save();
    },
    updateLocation(_, args){
      return Location.findOneAndUpdate({_id:args._id}, {$set: args});
    },
    deleteLocation(_, args){
      return Location.deleteOne({_id: args._id});
    }

  }
}

module.exports = resolveFunctions;
