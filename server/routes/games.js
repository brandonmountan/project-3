const express = require('express');
const router = express.Router();
const Game = require('../models/Game'); 

// Define a route to fetch game data by externalGameId
router.get('/:externalGameId', async (req, res) => {
  const externalGameId = req.params.externalGameId;

  try {
    const game = await Game.findOne({ externalGameId }); 
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


