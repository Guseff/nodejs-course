const tasksRepo = require('./task.memory.repository');

const getAllTasks = boardId => tasksRepo.getAll(boardId);
const getTask = (boardId, id) => tasksRepo.getTask(boardId, id);
const postTask = (boardId, obj) => tasksRepo.creatTask(boardId, obj);
const putTask = (id, obj) => tasksRepo.updateTask(id, obj);
const deleteTask = (boardId, id) => tasksRepo.deleteTask(id);

module.exports = { getAllTasks, getTask, postTask, putTask, deleteTask };
