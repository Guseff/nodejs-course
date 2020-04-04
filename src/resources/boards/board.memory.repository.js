const Board = require('./board.model');

const boards = [];

const getAllBoards = async () => {
  return boards;
};

const getBoard = async boardId => {
  return boards.find(x => x.id === boardId);
};

const creatBoard = async ({ title, columns }) => {
  const board = new Board({ title, columns });
  boards.push(board);
  return board;
};

const updateBoard = async (boardId, { title, columns }) => {
  const board = boards.find(x => x.id === boardId);
  board.title = title;
  board.columns = columns;
  return board;
};

const deleteBoard = async boardId => {
  const board = boards.find(x => x.id === boardId);
  if (!board) return false;
  boards.splice(boards.indexOf(board), 1);
  return true;
};

module.exports = {
  getAllBoards,
  getBoard,
  creatBoard,
  updateBoard,
  deleteBoard
};
