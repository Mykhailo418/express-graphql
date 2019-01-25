const graphql = require('graphql');
const {getUserById, getCompanyById} = require('../db/db_connection');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema} = graphql;

const CompanyType  = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString}
  }
});
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValuem, args){
        return getCompanyById(parentValuem.companyId);
      }
    }
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
