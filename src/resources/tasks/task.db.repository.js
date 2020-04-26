const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getTask = async (boardId, taskId) => {
  return Task.findOne({ boardId, _id: taskId });
};

const creatTask = async (
  boardId,
  { title, order, description, userId, columnId }
) => {
  return Task.create({ boardId, title, order, description, userId, columnId });
};

const updateTask = async (taskId, obj) => {
  await Task.updateOne({ _id: taskId }, obj);
  return Task.findById(taskId);
};

const deleteTaskById = async taskId => {
  return (await Task.deleteOne({ _id: taskId })).ok;
};

const deleteTaskByBoardId = async boardId => {
  await Task.deleteMany({ boardId });
};

const deleteUserAssignment = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAll,
  getTask,
  creatTask,
  updateTask,
  deleteTaskById,
  deleteTaskByBoardId,
  deleteUserAssignment
};
