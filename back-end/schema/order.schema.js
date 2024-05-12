const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cover: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cover',      
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
    },
  },
  dimensions: {
    width: Number,
    height: Number,
  },
  templates: [{
    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paper',
    },
    pageCount: Number,
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
    },
    colorsCount: Number,
  }],
  price: Number,
  userId: String,
  status: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order,
};