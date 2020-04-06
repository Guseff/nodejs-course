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

const updateTask = async (
  taskId,
  { title, order, description, userId, boardId, columnId }
) => {
  const task = tasks.find(curr => curr.id === taskId);
  task.title = title;
  task.order = order;
  task.description = description;
  task.userId = userId;
  task.boardId = boardId;
  task.columnId = columnId;
  return task;
};

const deleteTaskById = taskId => {
  const task = tasks.find(curr => curr.id === taskId);
  if (!task) return false;
  tasks = tasks.filter(curr => curr.id !== taskId);
  return true;
};

const deleteTaskByBoardId = boardId => {
  tasks = tasks.filter(curr => curr.boardId !== boardId);
};

module.exports = {
  getAll,
  getTask,
  creatTask,
  updateTask,
  deleteTaskById,
  deleteTaskByBoardId
};
