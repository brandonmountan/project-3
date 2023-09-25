const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        games: [Game]
        posts: [Post]
        comments: [Comment]
        friends: [User]
    }

    login(
        email: String!
        password: String!
      ): Auth

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
        title: String!
        releaseDate: String
        genre: String
        posts: [Post]
      }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: User
        createdAt: String
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        posts(username: String): [Post]!
        post(postId: ID!): Post 
        me: User
      }

    type Mutation {
        addUser(
            username: String!
            email: String!
            password: String!
        ): Auth

        addPost(
            postTitle: String!
            postText: String!
            postAuthor: String!
            game: ID
        ): Post

        updatePost(
            postId: ID!
            postTitle: String!
            postText: String!
        ): Post

        removePost(postId: ID!): Post

        addComment(
            postId: ID!
            commentText: String!
            commentAuthor: String!
        ): Comment

        updateComment(
            commentId: ID!
            commentText: String!
        ): Comment

        removeComment(commentId: ID!): Comment
    }
`;


module.exports = typeDefs;