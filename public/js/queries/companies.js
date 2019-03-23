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
