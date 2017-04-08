// const {sessions} = require('./data.js');
const {Session, Location} = require('./connectors.js');
const uuid =require('node-uuid');

const resolveFunctions = {
  Query: {
    sessions(){
      return Session.find().populate('location');
    },
    session(_,args){
      return Session.findOne({_id: args._id}).populate('location');
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
      const newSession = new Session(args).populate('location');
      return newSession.save();
    },
    updateSession(_, args){
      return Session.findOneAndUpdate({_id:args._id}, {$set: args}).populate('location').exec();
    },
    deleteSession(_, args){
      return Session.deleteOne({_id: args._id});
    },

    addLocation(_, args){
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
