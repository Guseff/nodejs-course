const Board = require('./board.model');

let boards = [];

const getAllBoards = async () => {
  return boards;
};

const getBoard = async boardId => {
  return boards.find(curr => curr.id === boardId);
};

const creatBoard = async ({ title, columns }) => {
  const board = new Board({ title, columns });
  boards.push(board);
  return board;
};

const updateBoard = async (boardId, obj) => {
  const index = boards.findIndex(curr => curr.id === boardId);
  return (boards[index] = { ...boards[index], ...obj });
};

const deleteBoard = async boardId => {
  const board = boards.find(curr => curr.id === boardId);
  if (!board) return false;
  boards = boards.filter(curr => curr.id !== boardId);
  return true;
};

module.exports = {
  getAllBoards,
  getBoard,
  creatBoard,
  updateBoard,
  deleteBoard
};
