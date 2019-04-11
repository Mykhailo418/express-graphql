import gql from 'graphql-tag';

export const queryListCompanies = gql`
query{
  companies{
      _id,
      id,
      name,
      description,
      likes
  }
}
`;

export const mutationAddCompany = gql`
mutation AddCompany($name: String!, $description: String){
  addCompany(name: $name, description: $description){
      _id,
      name,
      description
  }
}
`;

export const likeCopmpanyMutation = gql`
mutation LikeCompany($id: String!){
  likeCompany(id: $id){
    id,
    likes
  }
}
`;
