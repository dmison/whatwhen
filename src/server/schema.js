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
  reviews: [Review]
}

type Presenter {
  name: String!
  email: String
}

type User {
  provider: String!,
  resourceName: String!,
  name: String!,
  avatar: String,
  email: String,
  title: String,
  location: String
}

type Review {
  comment: String,
  rating: Int,
  reviwer: User
}

type Query {
  sessions: [Session]
  session(_id: String!): Session
  user(resourceName: String!): User
}

type Mutation {
  addSession(title: String!, summary: String, location:String start:String ): Session
  updateSession(_id:String!, summary: String, location:String start:String): Session
  deleteSession(_id:String!): Session
}

schema {
  query: Query
  mutation: Mutation
}
`;

module.exports = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: resolvers
});
