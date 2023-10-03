import { gql } from '@apollo/client';

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

export const ADD_POST = gql`
mutation addPost($postTitle: String!, $postText: String!, $postAuthor: ID!) {
  addPost(postTitle: $postTitle, postText: $postText, postAuthor: $postAuthor) {
    postAuthor {
      _id
      username
    }
    postTitle
    postText
    createdAt
  }
}
`;

export const UPDATE_POST = gql`
mutation updatePost($postId: ID!, $postTitle: String!, $postText: String!) {
  updatePost(postId: $postId, postTitle: $postTitle, postText: $postText) {
    _id
    postText
    postTitle
  }
}
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
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