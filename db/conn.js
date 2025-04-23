
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.ATLAS_URI, {
    dbName: 'SBA319',

  })
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch((error) => console.error('MongoDB connection error:', error));

module.exports = mongoose;
