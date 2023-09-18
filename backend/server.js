// server.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors =require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

// Connect to MongoDB (Make sure you have MongoDB installed and running)
mongoose.connect('mongodb+srv://pulkit:123@cluster0.xofh23l.mongodb.net/new?retryWrites=true').then(console.log("database connected"));

// Create a MongoDB schema and model
const cryptoSchema = new mongoose.Schema({
  name: String,
  last: String,
  buy: String,
  sell: String,
  volume: String,
  base_unit: String,
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

// Fetch data from the WazirX API and store it in the database
const fetchDataAndStoreInDB = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');

    if (response.status === 200) {
      const tickers = Object.values(response.data);

      // Store the top 10 results in the database
      const top10Tickers = tickers.slice(0, 10);

      await Crypto.deleteMany({}); // Clear existing data
      await Crypto.insertMany(top10Tickers);

      console.log('Data fetched and stored in the database.');
    }
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  }
};

// Fetch and store data initially (you can set up a cron job to periodically update)
fetchDataAndStoreInDB();

// Create a route to get the stored data
app.get('/api/crypto', async (req, res) => {
  try {
    const cryptoData = await Crypto.find({});
    res.json(cryptoData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
