import gql from 'graphql-tag';

export const queryListCompanies = gql`
query{
  companies{
      _id,
      id,
      name
  }
}
`;

export const mutationAddCompany = gql`
mutation AddCompany($name: String!, $description: String){
  addCompany(name: $name, description: $description){
      id
  }
}
`;
