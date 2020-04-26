const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require('../../common/config');

const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const postUser = async obj => {
  const hash = await bcrypt.hash(obj.password, BCRYPT_SALT_ROUNDS);
  return usersRepo.creatUser({ ...obj, password: hash });
};
const putUser = async (id, obj) => {
  const hash = await bcrypt.hash(obj.password, BCRYPT_SALT_ROUNDS);
  return usersRepo.updateUser(id, { ...obj, password: hash });
};
const deleteUser = id => {
  tasksRepo.deleteUserAssignment(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
