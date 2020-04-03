const Board = require('./board.model');

const boards = [...new Array(10)].map(
  (_, i) => new Board({ name: `BOARD${i + 1}`, title: `board${i + 1}` })
);

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

const deleteBoard = boardId => {
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
