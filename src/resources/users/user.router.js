const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const errorCatcher = require('../../helpers/errorCatcher');
const RequestError = require('../../helpers/requestError');
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(
    errorCatcher(async (req, res) => {
      const users = await usersService.getAll();
      res.status(HttpStatus.OK).send(users.map(User.toResponse));
    })
  )
  .post(
    errorCatcher(async (req, res) => {
      const user = await usersService.postUser(req.body);
      if (!user) {
        throw new RequestError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      res.status(HttpStatus.OK).send(User.toResponse(user));
    })
  );

router
  .route('/:id')
  .get(
    errorCatcher(async (req, res) => {
      const user = await usersService.getUser(req.params.id);
      if (!user) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'User not found');
      }
      res.status(HttpStatus.OK).send(User.toResponse(user));
    })
  )
  .put(
    errorCatcher(async (req, res) => {
      const user = await usersService.putUser(req.params.id, req.body);
      if (!user) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'User not found');
      }
      res.status(HttpStatus.OK).send(User.toResponse(user));
    })
  )
  .delete(
    errorCatcher(async (req, res) => {
      const result = await usersService.deleteUser(req.params.id);
      if (!result) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'User not found');
      }
      res.status(HttpStatus.NO_CONTENT).send('The user has been deleted');
    })
  );

module.exports = router;
