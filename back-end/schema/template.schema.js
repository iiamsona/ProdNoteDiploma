const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: String,
  path: String,
  isDeactivated: Boolean,
});

const Template = mongoose.model('Template', templateSchema);

module.exports = {
  Template,
};