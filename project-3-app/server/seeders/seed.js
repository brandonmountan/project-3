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

        await User.create(userSeeds);

        for (let i = 0; i < postSeeds.length; i++) {
            const { _id, postAuthor } = await Post.create(postSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: postAuthor },
                {
                    $addToSet: {
                        posts: _id,
                    },
                }
            );

            for (let j = 0; j < commentSeeds.length; j++) {
                if (commentSeeds[j].post === postSeeds[i].postTitle) {
                    const { _id: commentId } = await Comment.create(commentSeeds[j]);
                    await Post.findOneAndUpdate(
                        { _id: _id },
                        {
                            $addToSet: {
                                comments: commentId,
                            },
                        }
                    );
                }
            }
        }

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});