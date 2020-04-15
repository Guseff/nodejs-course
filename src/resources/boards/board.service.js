const boardRepo = require('./board.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAllBoards = () => boardRepo.getAllBoards();
const getBoard = id => boardRepo.getBoard(id);
const postBoard = obj => boardRepo.creatBoard(obj);
const putBoard = (id, obj) => boardRepo.updateBoard(id, obj);
const deleteBoard = id => {
  tasksRepo.deleteTaskByBoardId(id);
  return boardRepo.deleteBoard(id);
};

module.exports = { getAllBoards, getBoard, postBoard, putBoard, deleteBoard };
