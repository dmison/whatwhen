const {sessions} = require('./data.js');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql');

const Session = new GraphQLObjectType({
  name: 'Session',
  description: 'A presentation session',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)}
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    sessions: {
      type: new GraphQLList(Session),
      resolve: (rootValue, args, info) => {
        return sessions;
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

module.exports = Schema;
