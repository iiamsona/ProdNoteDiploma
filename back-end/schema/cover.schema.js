const mongoose = require('mongoose');

const coverSchema = new mongoose.Schema({
  type: String,
  price: Number,
  isDeactivated: Boolean,
});

const Cover = mongoose.model('Cover', coverSchema);

module.exports = {
  Cover,
};