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
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
      }
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
