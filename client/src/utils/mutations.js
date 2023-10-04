import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const DONATE = gql`
  mutation donate($amount: Float!) {
    donate(amount: $amount) {
      session
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($postTitle: String!, $postText: String!, $postAuthor: ID!, $game: ID) {
    addPost(postTitle: $postTitle, postText: $postText, postAuthor: $postAuthor, game: $gameId) {
      _id
      postTitle
      postText
      createdAt
      postAuthor {
        _id
        username
      }
      game {
        _id
        name
      }
    }
  }
`;