const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 1,
            maxlength: 36,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            validate: {
                validator: /^(?=.*[A-Z])(?=.*\d).{8,}$/.test.bind(
                    /^(?=.*[A-Z])(?=.*\d).{8,}$/
                ),
                message: 'Password must have 1 number and 1 uppercase letter!',
            },
        },
        likedGames: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Game',
            }
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
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]

    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('formattedCreatedAt').get(function () {
    return dateFormat(this.createdAt); // creates field for timestamps
});

userSchema.virtual('formattedUpdatedAt').get(function () {
    return dateFormat(this.updatedAt); // updates field for timestamps
});

const User = model('User', userSchema);

module.exports = User;