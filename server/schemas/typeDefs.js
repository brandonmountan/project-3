const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    posts: [Post]
    comments: [Comment]
    friends: [User]
    likedGames: [Game]
  }

  type Auth {
    token: ID
    user: User
  }

  type Post {
    _id: ID
    postTitle: String
    postText: String
    postAuthor: User
    createdAt: String
    comments: [Comment]
    game: Game
  }

  type Game {
    _id: ID
    name: String!
    externalGameId: String
    releaseDate: String
    genre: String
    posts: [Post]
    likedByUsers: [User]
    likesCount: Int!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: User
    post: Post
    createdAt: String
  }

  type SessionResponse {
    session: String!
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    posts(userId: ID): [Post]!
    post(postId: ID!): Post
    games: [Game]
    game(gameId: ID!): Game 
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    addPost(
      postTitle: String!
      postText: String!
      postAuthor: ID!
      game: ID
    ): Post

    updatePost(
      postId: ID!
      postTitle: String!
      postText: String!
      game: ID
    ): Post

    addNewGame(name: String!, externalGameId: String!): Game!

    removePost(postId: ID!): Post

    addComment(postId: ID!, commentText: String!, commentAuthor: ID!): Comment

    updateComment(commentId: ID!, commentText: String!): Comment

    removeComment(commentId: ID!): Comment

    addFriend(friendId: ID!): User

    removeFriend(friendId: ID!): User

    addGameLike(gameId: ID!): Game

    removeGameLike(gameId: ID!): Game

    donate(amount: Float!): SessionResponse!
  }
`;

module.exports = typeDefs;
