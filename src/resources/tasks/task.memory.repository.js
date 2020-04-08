const Task = require('./task.model');

let tasks = [];

const getAll = async id => {
  return id ? tasks.filter(curr => curr.boardId === id) : tasks;
};

const getTask = async (boardId, taskId) => {
  return tasks.find(task => task.id === taskId && task.boardId === boardId);
};

const creatTask = async (
  boardId,
  { title, order, description, userId, columnId }
) => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  tasks.push(task);
  return task;
};

const updateTask = async (taskId, obj) => {
  const index = tasks.findIndex(curr => curr.id === taskId);
  return (tasks[index] = { ...tasks[index], ...obj });
};

const deleteTaskById = async taskId => {
  const task = tasks.find(curr => curr.id === taskId);
  if (!task) return false;
  tasks = tasks.filter(curr => curr.id !== taskId);
  return true;
};

const deleteTaskByBoardId = async boardId => {
  tasks = tasks.filter(curr => curr.boardId !== boardId);
};

const deleteUserAssignment = async id => {
  tasks = tasks.map(curr => {
    if (curr.userId === id) {
      curr.userId = null;
    }
    return curr;
  });
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
