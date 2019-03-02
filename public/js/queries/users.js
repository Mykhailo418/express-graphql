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
