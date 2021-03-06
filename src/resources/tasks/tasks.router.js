const HttpStatus = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const errorCatcher = require('../../helpers/errorCatcher');
const RequestError = require('../../helpers/requestError');
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(
    errorCatcher(async (req, res) => {
      const tasks = await tasksService.getAllTasks(req.params.boardId);
      res.status(HttpStatus.OK).send(tasks.map(Task.toResponse));
    })
  )
  .post(
    errorCatcher(async (req, res) => {
      const task = await tasksService.postTask(req.params.boardId, req.body);
      if (!task) {
        throw new RequestError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      res.status(HttpStatus.OK).send(Task.toResponse(task));
    })
  );

router
  .route('/:id')
  .get(
    errorCatcher(async (req, res) => {
      const task = await tasksService.getTask(
        req.params.boardId,
        req.params.id
      );
      if (!task) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'Task not found');
      }
      res.status(HttpStatus.OK).send(Task.toResponse(task));
    })
  )
  .put(
    errorCatcher(async (req, res) => {
      const task = await tasksService.putTask(req.params.id, req.body);
      if (!task) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'Task not found');
      }
      res.status(HttpStatus.OK).send(Task.toResponse(task));
    })
  )
  .delete(
    errorCatcher(async (req, res) => {
      const result = await tasksService.deleteTaskById(
        req.params.boardId,
        req.params.id
      );
      if (!result) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'Task not found');
      }
      res.status(HttpStatus.NO_CONTENT).send('The task has been deleted');
    })
  );

module.exports = router;
