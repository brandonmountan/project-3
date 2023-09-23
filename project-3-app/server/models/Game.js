const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  // fields will be fetched and defined from the API
  title: {
    type: String,
    required: true,
  },
  releaseDate: Date,
  genre: String,
  // add fields as needed
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;