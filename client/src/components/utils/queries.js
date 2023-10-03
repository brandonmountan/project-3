import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postTitle
        postText
        postAuthor
        createdAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    posts {
      _id
      comments {
        _id
        commentAuthor {
          _id
        }
        commentText
        createdAt
      }
      postTitle
      postText
      postAuthor {
        _id
      }
      createdAt
    }
  }
}
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postTitle
      postText
      postAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getPost($posttId: ID!) {
    post(postId: $postId) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;