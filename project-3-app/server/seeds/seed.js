const db = require("../config/connection");
const { User, Post, Comment } = require("../models");
const userSeeds = require("./userSeeds.json");
const postSeeds = require("./postSeeds.json");
const commentSeeds = require("./commentSeeds.json");

db.once("open", async () => {
  try {
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});

    // seed users
    const users = await User.create(userSeeds);

    // seed posts and comments
    for (const postSeed of postSeeds) {
      const user = users[Math.floor(Math.random() * users.length)];

      // create a post
      const post = await Post.create({
        ...postSeed,
        postAuthor: user._id,
      });

      for (const commentSeed of commentSeeds) {
        const commentUser = users[Math.floor(Math.random() * users.length)];

        // create a comment
        const comment = await Comment.create({
          ...commentSeed,
          commentAuthor: commentUser._id,
          post: post._id,
        });

        // link the comment to the post
        post.comments.push(comment);
        await post.save();

        commentUser.comments.push(comment);
        await commentUser.save();
      }

      // link the post to the user
      user.posts.push(post);
      await user.save();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
