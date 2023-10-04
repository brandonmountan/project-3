// const { Schema, model } = require('mongoose');

// const gameSchema = new Schema(
//   {
//     // fields will be fetched and defined from the API
//     name: {
//       type: String,
//       required: true,
//     },
//     releaseDate: Date,
//     genre: String,
//     // add fields as needed

//     posts: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Post',
//       },
//     ],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//   }

// );

// // virtually populate list of users that like a game based on User 'likedGames' property
// gameSchema.virtual('usersLiked', {
//   ref: 'User',
//   localField: '_id', // local field in Game schema
//   foreignField: 'likedGames', // field in User schema
// });

// const Game = model('Game', gameSchema);

// module.exports = Game;

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