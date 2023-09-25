const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/post-game-db');

module.exports = mongoose.connection;


module.exports.API_KEY = process.env.REACT_API_KEY;