const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('posts');
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
            .populate('games')
            .populate('posts');
        },
        posts: async (parent, { userId }) => {
            const params = userId ? { postAuthor: userId } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },
        post: async (parent, { postId }) => {
            return Post.findOne({ _id: postId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
                .populate('posts')
                .populate('comments');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            try {
                // create the user
                const user = await User.create({ username, email, password });
                // sign a JSON Web Token and log the user in after they are created
                const token = signToken(user);
                // `Auth` object of the signed token and user's information
                return { token, user };
            } catch (error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
        },
        login: async (parent, { email, password }) => {
            try {
                // look up user by email address. 
                const user = await User.findOne({ email });

                // if no user with that email address, throw error
                if (!user) {
                    throw new AuthenticationError('No user found with this email address');
                }

                // otherwise execute the `isCorrectPassword` instance method and check if the correct password was provided
                const correctPw = await user.isCorrectPassword(password);

                // password is incorrect, throw error
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect credentials');
                }

                // email and password are correct, sign the user into the application with a JWT
                const token = signToken(user);

                // `Auth` object of token
                return { token, user };
            } catch (error) {
                throw new Error(`Error logging in: ${error.message}`);
            }
        },

        addPost: async (parent, { postTitle, postText, postAuthor, game }) => {
            try {
                const post = await Post.create({ postTitle, postText, postAuthor, game }); //postAuthor= User _id, game= Game _id

                await User.findOneAndUpdate(
                    { _id: postAuthor },
                    { $addToSet: { posts: post._id } }
                );

                return post;
            } catch (error) {
                throw new Error(`Error creating post: ${error.message}`);
            }
        },
        updatePost: async (parent, { postId, postTitle, postText }) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $set: { postTitle, postText } },
                    { new: true }
                );

                if (!updatedPost) {
                    throw new Error('Post not found');
                }

                return updatedPost;
            } catch (error) {
                throw new Error(`Error updating post: ${error.message}`);
            }
        },
        removePost: async (parent, { postId }) => {
            try {
                const deletedPost = await Post.findOneAndDelete({ _id: postId });

                if (!deletedPost) {
                    throw new Error('Post not found');
                }

                // remove the reference to this post from the user
                await User.findOneAndUpdate(
                    { _id: deletedPost.postAuthor },
                    { $pull: { posts: postId } }
                );

                // remove the reference to this post from the game
                await Game.findOneAndUpdate(
                    { _id: deletedPost.game },
                    { $pull: { posts: postId } }
                );
                
                // do we want to delete all comments associated with a Post, or make a placeholder "user removed post" that leaves comments visible under the deleted post?
                // await Comment.deleteMany({ post: postId });

                return deletedPost;
            } catch (error) {
                throw new Error(`Error removing post: ${error.message}`);
            }
        },

        addComment: async (parent, { postId, commentText, commentAuthor }) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $addToSet: { comments: { commentText, commentAuthor } },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                if (!updatedPost) {
                    throw new Error('Post not found');
                }

                return updatedPost;
            } catch (error) {
                throw new Error(`Error adding comment: ${error.message}`);
            }
        },
        updateComment: async (parent, { commentId, commentText }) => {
            try {
                const updatedComment = await Comment.findOneAndUpdate(
                    { _id: commentId },
                    { $set: { commentText } },
                    { new: true }
                );

                if (!updatedComment) {
                    throw new Error('Comment not found');
                }

                return updatedComment;
            } catch (error) {
                throw new Error(`Error updating comment: ${error.message}`);
            }
        },
        removeComment: async (parent, { commentId }) => {
            try {
                const deletedComment = await Comment.findOneAndDelete(
                    { _id: commentId }
                );

                if (!deletedComment) {
                    throw new Error('Comment not found');
                }

                return deletedComment;
            } catch (error) {
                throw new Error(`Error removing comment: ${error.message}`);
            }
        },
    }
};

module.exports = resolvers;