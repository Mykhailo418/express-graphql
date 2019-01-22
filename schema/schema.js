const graphql = require('graphql');
const {getUserById} = require('../db/db_connection');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt}
  }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        args: { id: {type: GraphQLString} },
        resolve(parentValuem, args){
            return getUserById(args.id);
        }
      }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
