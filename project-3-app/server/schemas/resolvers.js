const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51NruVnLbZqu6Vpn3o85H4sr4avu3L7WKZtaBJhVx52qVPs0UG4OqplpdkSCNDyK4w9DpXRPXAXpdXrmkzxFmGJF800GFrXttl6"
);

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (parent, { userId }) => {
      return (
        User.findOne({ _id: userId })
          // .populate('games')
          .populate("posts")
      );
    },
    posts: async (parent, { userId }) => {
      const params = userId ? { postAuthor: userId } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId })
        .populate("postAuthor")
        .populate({
          path: "comments",
          populate: {
            path: "commentAuthor",
          },
        });
    }, // get additional user data from author ID
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("posts")
          .populate("comments");
      }
      throw new AuthenticationError("You need to be logged in!");
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
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        // otherwise execute the `isCorrectPassword` instance method and check if the correct password was provided
        const correctPw = await user.isCorrectPassword(password);

        // password is incorrect, throw error
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        // email and password are correct, sign the user into the application with a JWT
        const token = signToken(user);

        // `Auth` object of token
        return { token, user };
      } catch (error) {
        throw new Error(`Error logging in: ${error.message}`);
      }
    },

    // THE USER YOU CHOOSE TO GENERATE YOUR TOKEN ON THE LOGIN ROUTE WILL BE THE USER AFFECTED BY ALL AUTH ROUTES, SO IT DOESN'T MATTER WHAT "AUTHOR" ID IS USED IN THE APOLLO VARIABLES

    addPost: async (parent, { postTitle, postText, gameId }, context) => {
      console.log("test addPost");
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in to add a post");
      }
      try {
        const post = await Post.create({
          postTitle,
          postText,
          // postAuthor does not return a username in Apollo for some reason. Username does appear in console log.
          postAuthor: {
            _id: context.user._id,
          },
          game: gameId, // or whatever we use to identify the games through the API
        });

        console.log("author user id is: " + context.user._id);
        console.log("author username is: " + context.user.username);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        const newPost = await Post.findById(post).populate("postAuthor");

        console.log("user id is: " + context.user._id);
        return newPost;
      } catch (error) {
        throw new Error(`Error creating post: ${error.message}`);
      }
    },

    updatePost: async (
      parent,
      { postId, postTitle, postText, gameId },
      context
    ) => {
      console.log("test updatePost");
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update a post"
        );
      }
      try {
        const existingPost = await Post.findOne({
          _id: postId,
          postAuthor: context.user._id,
        });
        if (!existingPost) {
          throw new AuthenticationError(
            "You are not authorized to update this post"
          );
        }

        const updates = {
          postTitle,
          postText,
        };

        // if gameId is provided, update the game association
        if (gameId) {
          updates.game = gameId;
        }

        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $set: updates },
          { new: true }
        );

        if (!updatedPost) {
          throw new Error("Post not found");
        }

        return updatedPost;
      } catch (error) {
        throw new Error(`Error updating post: ${error.message}`);
      }
    },

    removePost: async (parent, { postId }, context) => {
      console.log("test removePost");
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to remove a post"
        );
      }
      try {
        const existingPost = await Post.findOne({
          _id: postId,
          postAuthor: context.user._id,
        });

        if (!existingPost) {
          throw new AuthenticationError(
            "You are not authorized to remove this post"
          );
        }
        const deletedPost = await Post.findOneAndDelete({ _id: postId });

        if (!deletedPost) {
          throw new Error("Post not found");
        }

        // remove the reference to this post from the user
        await User.findOneAndUpdate(
          { _id: deletedPost.postAuthor },
          { $pull: { posts: postId } }
        );

        // remove the reference to this post from the game
        if (deletedPost.game) {
          await Game.findOneAndUpdate(
            { _id: deletedPost.game },
            { $pull: { posts: postId } }
          );
        }

        // do we want to delete all comments associated with a Post, or make a placeholder "user removed post" that leaves comments visible under the deleted post?
        // await Comment.deleteMany({ post: postId });

        return deletedPost;
      } catch (error) {
        throw new Error(`Error removing post: ${error.message}`);
      }
    },

    addComment: async (
      parent,
      { postId, commentText, commentAuthor },
      context
    ) => {
      console.log("test addComment");
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to comment on other posts"
        );
      }
      try {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: {
                commentText,
                commentAuthor: context.user._id,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!updatedPost) {
          throw new Error("Post not found");
        }

        return updatedPost;
      } catch (error) {
        throw new Error(`Error adding comment: ${error.message}`);
      }
    },
    updateComment: async (parent, { commentId, commentText }, context) => {
      console.log("test updateComment");
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update a comment"
        );
      }
      try {
        const updatedComment = await Comment.findOneAndUpdate(
          {
            _id: commentId,
            commentAuthor: context.user._id,
          },
          { $set: { commentText } },
          { new: true }
        );

        if (!updatedComment) {
          throw new Error("Comment not found");
        }

        return updatedComment;
      } catch (error) {
        throw new Error(`Error updating comment: ${error.message}`);
      }
    },
    removeComment: async (parent, { commentId }, context) => {
      console.log("test removeComment");
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to remove a comment"
        );
      }
      try {
        const deletedComment = await Comment.findOneAndDelete({
          _id: commentId,
          commentAuthor: context.user._id,
        });

        if (!deletedComment) {
          throw new Error("Comment not found");
        }

        return deletedComment;
      } catch (error) {
        throw new Error(`Error removing comment: ${error.message}`);
      }
    },
    donate: async (parent, { amount }, context) => {
      console.log(stripe);
      try {
        const url = new URL(context.headers.referer).origin;
        const product = await stripe.products.create({
          name: "Donation to PostGame",
        });
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: amount * 100,
          currency: "usd",
        });
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${url}/donation-success`,
          cancel_url: `${url}/donation-cancelled`,
        });
        return { session: session.id };
      } catch (error) {
        console.error("Error in donate function:", error.message);
        throw error;
      }
    },
  },
};
module.exports = resolvers;
