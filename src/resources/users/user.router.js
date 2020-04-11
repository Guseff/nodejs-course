const router = require('express').Router();
const RequestError = require('../../middlewares/requestError');
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).send(users.map(User.toResponse));
  })
  .post(async (req, res, next) => {
    const user = await usersService.postUser(req.body);
    if (!user) {
      next(new RequestError(400, 'Bad request'));
      return;
    }
    res.status(200).send(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const user = await usersService.getUser(req.params.id);
    if (!user) {
      next(new RequestError(404, 'User not found'));
      return;
    }
    res.status(200).send(User.toResponse(user));
  })
  .put(async (req, res, next) => {
    const user = await usersService.putUser(req.params.id, req.body);
    if (!user) {
      next(new RequestError(404, 'User not found'));
      return;
    }
    res.status(200).send(User.toResponse(user));
  })
  .delete(async (req, res, next) => {
    const result = await usersService.deleteUser(req.params.id);
    if (!result) {
      next(new RequestError(404, 'User not found'));
      return;
    }
    res.status(204).send('The user has been deleted');
  });

module.exports = router;
