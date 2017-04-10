const Mongoose = require('mongoose');
const {Location, Session, Presenter} = require('./connectors.js');

const resolveFunctions = {

  Query: {
    sessions(){
      return Session.find().populate('location presenter');
    },
    session(_,args){
      return Session.findOne({_id: args._id}).populate('location presenter');
    },
    locations(){
      return Location.find();
    },
    location(_,args){
      return Location.findOne({_id: args._id});
    },
    presenters(){
      return Presenter.find();
    },
    presenter(_,args){
      return Presenter.findOne({_id: args._id});
    }

  },

  Mutation: {
    addSession(_, args){
      const newSession = new Session(args).populate('location presenter');
      return newSession.save();
    },
    updateSession(_, args){
      console.log(args);
      return Session.findOneAndUpdate(  {_id:args._id}, {$set: args}).populate('presenter location').exec();
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
    },

    addPresenter(_,args){
      return new Presenter(args).save();
    },
    updatePresenter(_, args){
      return Presenter.findOneAndUpdate({_id:args._id}, {$set: args});
    },
    deletePresenter(_,args){
      return Presenter.deleteOne({_id: args._id});
    }

  }
}

module.exports = resolveFunctions;
