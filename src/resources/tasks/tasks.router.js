const router = require('express').Router({ mergeParams: true });
const RequestError = require('../../middlewares/requestError');
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllTasks(req.params.boardId);
    res.status(200).send(tasks.map(Task.toResponse));
  })
  .post(async (req, res, next) => {
    const task = await tasksService.postTask(req.params.boardId, req.body);
    if (!task) {
      next(new RequestError(400, 'Bad request'));
      return;
    }
    res.status(200).send(Task.toResponse(task));
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const task = await tasksService.getTask(req.params.boardId, req.params.id);
    if (!task) {
      next(new RequestError(404, 'Task not found'));
      return;
    }
    res.status(200).send(Task.toResponse(task));
  })
  .put(async (req, res, next) => {
    const task = await tasksService.putTask(req.params.id, req.body);
    if (!task) {
      next(new RequestError(404, 'Task not found'));
      return;
    }
    res.status(200).send(Task.toResponse(task));
  })
  .delete(async (req, res, next) => {
    const result = await tasksService.deleteTaskById(
      req.params.boardId,
      req.params.id
    );
    if (!result) {
      next(new RequestError(404, 'Task not found'));
      return;
    }
    res.status(204).send('The task has been deleted');
  });

module.exports = router;
