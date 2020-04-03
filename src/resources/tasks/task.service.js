const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getTask = id => tasksRepo.getTask(id);
const postTask = obj => tasksRepo.creatTask(obj);
const putTask = (id, obj) => tasksRepo.updateTask(id, obj);
const deleteTask = id => tasksRepo.deleteTask(id);

module.exports = { getAll, getTask, postTask, putTask, deleteTask };
