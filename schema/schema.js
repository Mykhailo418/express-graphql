const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema} = graphql;

// Hard coded users
const users = [
  {id: '321', firstName: 'Vasya', age: 23},
  {id: '24', firstName: 'Petya', age: 32},
  {id: '12', firstName: 'Kyzmin', age: 45}
];

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
            return _.find(users, {id: args.id});
        }
      }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
