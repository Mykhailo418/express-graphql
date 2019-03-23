import gql from 'graphql-tag';

export const queryListUsers = gql`
query{
  users{
      _id,
      id,
      firstName
  }
}
`;

export const mutationNewUser = gql`
mutation AddUser($firstName: String!, $age: Int!, $companyId: String){
  addUser(firstName: $firstName, age: $age, companyId: $companyId){
      id
  }
}
`;

export const deleteUser = gql`
mutation DeleteUser($id: String!){
  deleteUser(id: $id){
    _id,
    firstName
  }
}
`;
