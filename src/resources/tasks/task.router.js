const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').all(async (req, res) => {
  res.status(404).send('No tasks without corresponding board');
});

router
  .route('/:id')
  .get(async (req, res) => {
    const task = await tasksService.getTask(req.params.id);
    if (!task) res.status(404).send('Task not found');
    res.json(Task.toResponse(task));
  })
  .put(async (req, res) => {
    const task = await tasksService.putTaskr(req.params.id, req.body);
    if (!task) res.status(404).send('Task not found');
    res.json(Task.toResponse(task));
  })
  .delete(async (req, res) => {
    const result = await tasksService.deleteTask(req.params.id);
    if (!result) res.status(404).send('Task not found');
    res.status(204).send('The task has been deleted');
  });

module.exports = router;
