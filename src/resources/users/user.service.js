const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const postUser = obj => usersRepo.creatUser(obj);
const putUser = (id, obj) => usersRepo.updateUser(id, obj);
const deleteUser = async id => {
  await tasksRepo
    .getAll()
    .then(res => res.filter(curr => curr.userId === id))
    .then(res => {
      res.forEach(task => {
        tasksRepo.updateTask(task.id, {
          ...task,
          userId: null
        });
      });
    })
    .catch(err => console.log('Error when task reassign ', err));

  return await usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
