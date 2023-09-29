const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const Stripe = require("stripe");
const stripe = Stripe(
    "sk_test_51NruVnLbZqu6Vpn3o85H4sr4avu3L7WKZtaBJhVx52qVPs0UG4OqplpdkSCNDyK4w9DpXRPXAXpdXrmkzxFmGJF800GFrXttl6"
);
console.log(stripe);

const resolvers = {
    Query: {
        // tested- working "getAllUsers"
        users: async () => {
            return User.find().populate('posts');
        },

        // tested- working "getUserPosts"
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
                // .populate('games')
                .populate('posts');
        },

        // tested- working "getAllPosts"
        posts: async (parent, { userId }) => {
            const params = userId ? { postAuthor: userId } : {};
            return Post.find(params).sort({ createdAt: -1 })
                .populate('postAuthor');
        },

        // tested- working "getSinglePost"
        post: async (parent, { postId }) => {
            return Post.findOne({ _id: postId })
                .populate('postAuthor')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'commentAuthor',
                    },
                }); // get additional user data from author ID
        },

        // tested- working "getMyProfile"
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
        // tested- working
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
        // tested- working and provides token
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

        // tested- working
        addPost: async (parent, { postTitle, postText, gameId }, context) => {
            console.log("test addPost");
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to add a post');
            }
            try {
                const post = await Post.create({
                    postTitle,
                    postText,
                    postAuthor: context.user._id,
                    game: gameId // or whatever we use to identify the games through the API
                });

                console.log("author user id is: " + context.user._id);
                console.log("author username is: " + context.user.username);

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: post._id } }
                );

                const newPost = await Post.findById(post).populate('postAuthor'); //to display username from postAuthor _id

                console.log("user id is: " + context.user._id)
                return newPost;

            } catch (error) {
                throw new Error(`Error creating post: ${error.message}`);
            }
        },

        // tested- working
        updatePost: async (parent, { postId, postTitle, postText, gameId }, context) => {
            console.log("test updatePost");
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to update a post');
            }
            try {
                const existingPost = await Post.findOne({
                    _id: postId,
                    postAuthor: context.user._id
                });
                if (!existingPost) {
                    throw new AuthenticationError('You are not authorized to update this post');
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

        // tested- working "removePost"
        removePost: async (parent, { postId }, context) => {
            console.log("test removePost");
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to remove a post');
            }
            try {
                const existingPost = await Post.findOne({
                    _id: postId,
                    postAuthor: context.user._id
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

        // tested- working "addComment"
        addComment: async (parent, { postId, commentText }, context) => {
            console.log("test addComment");

            if (!context.user) {
                throw new AuthenticationError(
                    "You need to be logged in to comment on other posts"
                );
            }

            try {
                const comment = await Comment.create({
                    commentText,
                    commentAuthor: context.user._id,
                    post: postId,
                });

                // query created comment to populate author data
                const newComment = await Comment.findById(comment._id).populate("commentAuthor");

                // add comment to comments array inside Post
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $addToSet: { comments: newComment._id },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { comments: newComment._id },
                    }
                );

                if (!updatedPost) {
                    throw new Error("Post not found");
                }

                return newComment; // return comment including username property
            } catch (error) {
                throw new Error(`Error adding comment: ${error.message}`);
            }
        },

        // tested- working "updateComment"
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

        // tested- working "removeComment"
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

                // remove comment from User 'comments'
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { comments: commentId } }
                );
        
                // remove comment from Post 'comments'
                await Post.findOneAndUpdate(
                    { comments: commentId },
                    { $pull: { comments: commentId } }
                );

                return deletedComment;
            } catch (error) {
                throw new Error(`Error removing comment: ${error.message}`);
            }
        },


        addFriend: async (parent, { friendId }, context) => {
            if (!context.user) {
              throw new AuthenticationError("You need to be logged in to add a friend");
            }
            
            try {
              // find current user by id
              const user = await User.findById(context.user._id);
          
              // find another user and assign as "friend" to be added, and assign their user_id as "friendId"
              const friend = await User.findById(friendId);
          
              if (!friend) {
                throw new Error("Friend not found");
              }
          
              // check friend list for duplicate
              if (user.friends.includes(friendId)) {
                throw new Error("This user is already in your friends list");
              }
          
              // add friendId to the current user's friends array
              user.friends.push(friendId);
          
              // push current user's id to the "friends" array of the user_id called "friend"
              friend.friends.push(context.user._id);
          
              await user.save();
              await friend.save();
          
              return friend;
            } catch (error) {
              throw new Error(`Error adding friend: ${error.message}`);
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
