const User = require('./user.model');

const getAll = async () => User.find();

const getUser = async userId => User.findOne({ _id: userId });

const findByLogin = async login => User.findOne({ login });

const creatUser = async user => User.create(user);

const updateUser = async (userId, obj) => {
  await User.updateOne({ _id: userId }, obj);
  return User.findById(userId);
};

const deleteUser = async userId => {
  return (await User.deleteOne({ _id: userId })).ok;
};

module.exports = {
  getAll,
  getUser,
  findByLogin,
  creatUser,
  updateUser,
  deleteUser
};
