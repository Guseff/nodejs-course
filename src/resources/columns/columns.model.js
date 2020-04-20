const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Column'
  },
  order: {
    type: Number,
    default: 0
  },
  _id: {
    type: String,
    default: uuid
  }
});

columnSchema.statics.toResponse = board => {
  const { id, title, order } = board;
  return { id, title, order };
};

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
