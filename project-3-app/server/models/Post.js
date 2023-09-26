const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
    {
        postTitle: {
            type: String,
            required: 'Posts require a title!',
            minlength: 1,
            maxlength: 80,
            trim: true,
        },
        postText: {
            type: String,
            required: 'Posts require content!',
            minlength: 1,
            maxlength: 500,
            trim: true,
        },
        postAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            }
        ],
        game: {
            type: Schema.Types.ObjectId,
            ref: 'Game',
            required: false,
          },

    }
);

const Post = model('Post', postSchema);

module.exports = Post;