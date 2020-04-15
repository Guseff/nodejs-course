const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const postUser = obj => usersRepo.creatUser(obj);
const putUser = (id, obj) => usersRepo.updateUser(id, obj);
const deleteUser = id => {
  tasksRepo.deleteUserAssignment(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
