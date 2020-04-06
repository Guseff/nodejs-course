const User = require('./user.model');

let users = [];

const getAll = async () => {
  return users;
};

const getUser = async userId => {
  return users.find(curr => curr.id === userId);
};

const creatUser = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  users.push(user);
  return user;
};

const updateUser = async (userId, { name, login, password }) => {
  const user = users.find(curr => curr.id === userId);
  user.name = name;
  user.login = login;
  user.password = password;
  return user;
};

const deleteUser = userId => {
  const user = users.find(curr => curr.id === userId);
  if (!user) return false;
  users = users.filter(curr => curr.id !== userId);
  return true;
};

module.exports = { getAll, getUser, creatUser, updateUser, deleteUser };
