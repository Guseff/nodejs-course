const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.postUser(req.body);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const user = await usersService.putUser(req.params.id, req.body);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    const result = await usersService.deleteUser(req.params.id);
    if (!result) {
      res.status(404).send('User not found');
      return;
    }
    res.status(204).send('The user has been deleted');
  });

module.exports = router;
