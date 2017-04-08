const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers.js');

// presenter: Presenter
// reviews: [Review]


const Schema = `
# A presentation session
type Session {
  _id: String
  title: String
  summary: String
  location: Location
  presenter: Presenter
}

type Presenter {
  _id: String
  name: String
  email: String
  bio: String
}

type Location {
  _id: String
  name: String
  description: String
}

type User {
  provider: String,
  resourceName: String,
  name: String,
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

  locations: [Location]
  location(_id: String!): Location

  presenters: [Presenter]
  presenter(_id: String!): Presenter

  user(resourceName: String!): User
}

type Mutation {
  addSession(title: String!, summary: String, location:String start:String ): Session
  updateSession(_id: String!, title: String!, summary: String, location:String start:String): Session
  deleteSession(_id: String!): Session

  addLocation(name: String!, description: String): Location
  updateLocation(_id: String!, name: String, description: String): Location
  deleteLocation(_id: String!): Location

  addPresenter(name: String!, email: String, bio: String): Presenter
  updatePresenter(_id: String!, name: String, email: String, bio: String): Presenter
  deletePresenter(_id: String!): Presenter
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
