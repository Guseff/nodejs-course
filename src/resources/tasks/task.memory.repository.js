const Task = require('./task.model');

const tasks = [...new Array(20)].map(() => new Task());

const getAll = async () => {
  return tasks;
};

const getTask = async taskId => {
  return tasks.find(task => task.id === taskId);
};

const creatTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
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
  const task = tasks.find(x => x.id === taskId);
  task.title = title;
  task.order = order;
  task.description = description;
  task.userId = userId;
  task.boardId = boardId;
  task.columnId = columnId;
  return task;
};

const deleteTask = taskId => {
  const task = tasks.find(x => x.id === taskId);
  if (!task) return false;
  tasks.splice(tasks.indexOf(task), 1);
  return true;
};

module.exports = { getAll, getTask, creatTask, updateTask, deleteTask };
