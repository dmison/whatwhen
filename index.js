const express = require('express');
const {graphiqlExpress, graphqlExpress} = require('graphql-server-express');
const bodyParser = require('body-parser');
const {printSchema} = require('graphql/utilities/schemaPrinter');
const schema = require('./schema.js');

const GRAPHQL_PORT = 8080;
const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema,
  context: {}
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: 'graphql'
}));

graphQLServer.use('/schema', (req,res)=>{
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.listen(GRAPHQL_PORT, ()=>{
  console.log('running ... ');
})
