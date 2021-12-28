import { gql } from '@apollo/client';


export const AUTHORIZE = gql`
  mutation authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
mutation($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
  createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
    id
    userId
    repositoryId
  }
}
`;

export const CREATE_USER = gql`
mutation($username: String!, $password: String!) {
  createUser(user: {username: $username, password: $password}) {
    id
  }
}
`;

export const REMOVE_REVIEW = gql`
  mutation RemoveReview($id: ID!) {
    deleteReview(id: $id)
  }
`;