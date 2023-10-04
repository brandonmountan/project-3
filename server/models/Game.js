const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        name: {
            type: String,
        },

        externalGameId: {
            type: String,
            unique: true,
            required: true,
          },

        // users who like this game
        likedByUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],

        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { timestamps: true }
);

const Game = model('Game', gameSchema);

module.exports = Game;