const graphql = require('graphql');
const {getUserById, getCompanyById, getAllUsersOfCompany, addUser} = require('../db/db_connection');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const CompanyType  = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return getAllUsersOfCompany(parentValue.id);
      }
    }
  })
});
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValue, args){
        return getCompanyById(parentValue.companyId);
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
        resolve(parentValue, args){
            return getUserById(args.id);
        }
      },
      company: {
        type: CompanyType,
        args: { id: {type: GraphQLString} },
        resolve(parentValue, args){
            return getCompanyById(args.id);
        }
      }
    }
});

const mutation  = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: UserType,
        args: {
          firstName: {type: new GraphQLNonNull(GraphQLString)},
          age: {type: new GraphQLNonNull(GraphQLInt)},
          companyId: {type: GraphQLString}
        },
        resolve(parentValue, {firstName, age, companyId}){
          return addUser({firstName, age, companyId});
        }
      }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
