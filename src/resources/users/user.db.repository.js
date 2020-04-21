const User = require('./user.model');

const getAll = async () => {
  return User.find();
};

const getUser = async userId => {
  return User.findOne({ _id: userId });
};

const creatUser = async user => {
  return User.create(user);
};

const updateUser = async (userId, obj) => {
  await User.findByIdAndUpdate(userId, obj);
  return User.findById(userId);
};

const deleteUser = async userId => {
  return (await User.deleteOne({ _id: userId })).ok;
};

module.exports = { getAll, getUser, creatUser, updateUser, deleteUser };
