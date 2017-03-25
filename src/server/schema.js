const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers.js');

const Schema = `
# A presentation session
type Session {
  _id: String!
  title: String!
  location: String!
  start: String!
  summary: String!
  presenter: Presenter
}

type Presenter {
  name: String!
  email: String
}

type Query {
  sessions: [Session]
  session(_id: String!): Session
}

schema {
  query: Query
}
`;

module.exports = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: resolvers
});
