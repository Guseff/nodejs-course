const boardRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAllBoards = () => boardRepo.getAllBoards();
const getBoard = id => boardRepo.getBoard(id);
const postBoard = obj => boardRepo.creatBoard(obj);
const putBoard = (id, obj) => boardRepo.updateBoard(id, obj);
const deleteBoard = async id => {
  await tasksRepo
    .getAll()
    .then(res => res.filter(curr => curr.boardId === id))
    .then(res => {
      res.forEach(task => {
        tasksRepo.deleteTask(task.id);
      });
    })
    .catch(err => console.log('Error when board delete ', err));

  return await boardRepo.deleteBoard(id);
};

module.exports = { getAllBoards, getBoard, postBoard, putBoard, deleteBoard };
