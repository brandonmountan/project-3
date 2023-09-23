const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  // storing an _id because the API will likely have id's the model will need to reference to match user posts to games
  // _id: ObjectId
  
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