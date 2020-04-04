const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const postUser = obj => usersRepo.creatUser(obj);
const putUser = (id, obj) => usersRepo.updateUser(id, obj);
const deleteUser = async id => {
  await tasksRepo
    .getAll()
    .then(res => res.filter(cur => cur.userId === id))
    .then(res => {
      res.forEach(task => {
        tasksRepo.updateTask(task.id, {
          title: task.title,
          order: task.order,
          description: task.description,
          userId: null,
          boardId: task.boardId,
          columnId: task.columnId
        });
      });
    })
    .catch(err => console.log('Error when tasks update ', err));

  return await usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
