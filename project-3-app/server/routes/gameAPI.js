const express = require('express');
const axios = require('axios');
const router = express.Router();
const Game = require('../models/Game'); 

router.get('/games', async (req, res) => {
  try {
    // external API
    const response = await axios.get('https://api.rawg.com/games');

    const gameData = response.data.map((game) => ({
    //   properties to fetch
        title: game.title,
        releaseDate: game.releaseDate,
        genre: game.genre,
    }));

    // make array of game database
    await Game.insertMany(gameData);

    res.json(gameData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;