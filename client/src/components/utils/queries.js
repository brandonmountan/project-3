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
      postTitle
      postText
      createdAt
      game {
        _id
        externalGameId
        name
      } 
    }
    comments {
      _id
      commentAuthor {
        _id
        username
      }
      commentText
      createdAt
    }
    likedGames {
      _id
      externalGameId
      name
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

export const GET_ALL_GAMES = gql`
  query getAllGames {
    games {
      _id
      externalGameId
      name
      likedByUsers {
        _id
      }
    }
  }
`;

export const GET_SINGLE_GAME = gql`
  query getGameByXId($gameId: ID!) {
    game(gameId: $gameId) {
      _id
      externalGameId
      name
      likedByUsers {
        _id
      }
    }
  }
`;