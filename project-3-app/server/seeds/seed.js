const db = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const commentSeeds = require('./commentSeeds.json');

db.once('open', async () => {
    try {
        await Comment.deleteMany({});
        await Post.deleteMany({});
        await User.deleteMany({});

    // Seed users
    await User.create(userSeeds);

    const userData = 


    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});