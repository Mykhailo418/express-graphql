const graphql = require('graphql');
const {getUserById, getCompanyById, getAllUsersOfCompany, addUser, deleteUser, updateUser,
getAllUsers, getAllCompanies, addCompany,likeCompany} = require('../db/db_connection');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const CompanyType  = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    _id: {type: GraphQLString},
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    likes: {type: GraphQLInt},
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
    _id: {type: GraphQLString},
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
      users: {
        type:  new GraphQLList(UserType),
        args: {},
        resolve(parentValue, args){
            return getAllUsers();
        }
      },
      company: {
        type: CompanyType,
        args: { id: {type: GraphQLString} },
        resolve(parentValue, args){
            return getCompanyById(args.id);
        }
      },
      companies: {
        type:  new GraphQLList(CompanyType),
        args: {},
        resolve(parentValue, args){
            return getAllCompanies();
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
      },
      deleteUser: {
        type: UserType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
          return deleteUser(args.id);
        }
      },
      updateUser: {
        type: UserType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},
          firstName: {type: GraphQLString},
          age: {type: GraphQLInt},
          companyId: {type: GraphQLString}
        },
        resolve(parentValue, args){
          return updateUser(args);
        }
      },
      addCompany: {
        type: CompanyType,
        args: {
          name: {type: new GraphQLNonNull(GraphQLString)},
          description: {type: GraphQLString},
        },
        resolve(parentValue, {name, description}){
          return addCompany({name, description});
        }
      },
      likeCompany: {
        type: CompanyType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve(parentValue, {id}){
          return likeCompany(id);
        }
      },
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
