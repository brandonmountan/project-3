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

    // Seed users
    await User.create(userSeeds);

    const users = await User.create(userSeeds);
    for (const commentSeed of commentSeeds) {
      const user = users[Math.floor(Math.random() * users.length)];
      const comment = await Comment.create({
        ...commentSeed,
        commentAuthor: user._id,
      });
      user.comments.push(comment);
      await user.save();
    }
    for (const postSeed of postSeeds) {
      const user = users[Math.floor(Math.random() * users.length)];
      const post = await Post.create({ ...postSeed, postAuthor: user._id });
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
