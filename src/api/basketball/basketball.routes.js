const express = require('express');

const router = express.Router();

const axios = require('axios');

router.get('', async (req, res) => {
  try {
    const externalData = await axios.get('https://free-nba.p.rapidapi.com/games/1', {
      headers: { 'X-RapidAPI-Host': 'free-nba.p.rapidapi.com', 'X-RapidAPI-Key': 'b887627edcmsh9f9c4ac6232c408p1d78d2jsn778d1fedc4e5' },
    });
    res.json(externalData.data);
  } catch (err) {
    res.json(err.message, 500);
  }
});

module.exports = router;
