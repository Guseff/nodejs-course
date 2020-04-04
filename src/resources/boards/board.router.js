const router = require('express').Router();
const Board = require('./board.model');
const Task = require('../tasks/task.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAllBoards();
    res.json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const board = await boardsService.postBoard(req.body);
    if (!board) {
      res.status(404).send('Board not found');
      return;
    }
    res.json(Board.toResponse(board));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (!board) {
      res.status(404).send('Board not found');
      return;
    }
    res.json(Board.toResponse(board));
  })
  .put(async (req, res) => {
    const board = await boardsService.putBoard(req.params.id, req.body);
    if (!board) {
      res.status(404).send('Board not found');
      return;
    }
    res.json(Board.toResponse(board));
  })
  .delete(async (req, res) => {
    const result = await boardsService.deleteBoard(req.params.id);
    if (!result) {
      res.status(404).send('Board not found');
      return;
    }
    res.status(204).send('The board has been deleted');
  });

router
  .route('/:boardId/tasks')
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
  .route('/:boardId/tasks/:id')
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
