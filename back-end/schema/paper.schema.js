const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  type: String,
  price: Number,
  width: Number,
  height: Number,
  isDeactivated: Boolean,
});

const Paper = mongoose.model('Paper', paperSchema);

module.exports = {
  Paper,
};