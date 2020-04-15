const tasksRepo = require('./task.db.repository');

const getAllTasks = boardId => tasksRepo.getAll(boardId);
const getTask = (boardId, id) => tasksRepo.getTask(boardId, id);
const postTask = (boardId, obj) => tasksRepo.creatTask(boardId, obj);
const putTask = (id, obj) => tasksRepo.updateTask(id, obj);
const deleteTaskById = (boardId, id) => tasksRepo.deleteTaskById(id);

module.exports = { getAllTasks, getTask, postTask, putTask, deleteTaskById };
