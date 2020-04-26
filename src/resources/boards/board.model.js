const uuid = require('uuid');
const mongoose = require('mongoose');
const { Column, columnSchema } = require('../columns/columns.model');

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Board'
    },
    columns: [columnSchema],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  const cols = columns.map(curr => Column.toResponse(curr));
  return { id, title, columns: cols };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
