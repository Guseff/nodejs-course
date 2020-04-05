const Task = require('./task.model');

const tasks = [];

const getAll = async id => {
  return id ? tasks.filter(curr => curr.boardId === id) : tasks;
};

const getTask = async (boardId, taskId) => {
  return tasks.find(task => task.id === taskId);
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

const deleteTask = taskId => {
  const task = tasks.find(curr => curr.id === taskId);
  if (!task) return false;
  tasks.splice(tasks.indexOf(task), 1);
  return true;
};

module.exports = { getAll, getTask, creatTask, updateTask, deleteTask };
