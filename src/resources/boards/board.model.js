const uuid = require('uuid');
const mongoose = require('mongoose');
const columnSchema = require('../columns/columns.model');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Board'
  },
  columns: {
    type: Array,
    default: [columnSchema]
  },
  _id: {
    type: String,
    default: uuid
  }
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
