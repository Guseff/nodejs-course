const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllTasks(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  })
  .post(async (req, res) => {
    const task = await tasksService.postTask(req.params.boardId, req.body);
    if (!task) {
      res.status(404).send('Task not found');
      return;
    }
    res.json(Task.toResponse(task));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const task = await tasksService.getTask(req.params.boardId, req.params.id);
    if (!task) {
      res.status(404).send('Task not found');
      return;
    }
    res.json(Task.toResponse(task));
  })
  .put(async (req, res) => {
    const task = await tasksService.putTask(req.params.id, req.body);
    if (!task) {
      res.status(404).send('Task not found');
      return;
    }
    res.json(Task.toResponse(task));
  })
  .delete(async (req, res) => {
    const result = await tasksService.deleteTask(
      req.params.boardId,
      req.params.id
    );
    if (!result) {
      res.status(404).send('Task not found');
      return;
    }
    res.status(204).send('The task has been deleted');
  });

module.exports = router;
