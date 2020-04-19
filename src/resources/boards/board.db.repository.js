const Board = require('./board.model');

const getAllBoards = async () => {
  return Board.find();
};

const getBoard = async boardId => {
  return Board.findById(boardId);
};

const creatBoard = async board => {
  return Board.create(board);
};

const updateBoard = async (boardId, obj) => {
  return Board.updateOne({ _id: boardId }, obj);
};

const deleteBoard = async boardId => {
  return (await Board.deleteOne({ _id: boardId })).ok;
};

module.exports = {
  getAllBoards,
  getBoard,
  creatBoard,
  updateBoard,
  deleteBoard
};
