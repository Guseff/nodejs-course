const User = require('./user.model');

const users = [...new Array(20)].map(
  (_, i) => new User({ name: `USER${i + 1}`, login: `user${i + 1}` })
);

const getAll = async () => {
  return users;
};

const getUser = async userId => {
  return users.find(user => user.id === userId);
};

const creatUser = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  users.push(user);
  return user;
};

const updateUser = async (userId, { name, login, password }) => {
  const man = users.find(user => user.id === userId);
  man.name = name;
  man.login = login;
  man.password = password;
  return man;
};

const deleteUser = userId => {
  const man = users.find(user => user.id === userId);
  if (!man) return false;
  users.splice(users.indexOf(man), 1);
  return true;
};

module.exports = { getAll, getUser, creatUser, updateUser, deleteUser };
