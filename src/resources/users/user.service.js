const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const postUser = obj => usersRepo.creatUser(obj);
const putUser = (id, obj) => usersRepo.updateUser(id, obj);
const deleteUser = id => {
  tasksRepo.deleteUserAssignment(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
