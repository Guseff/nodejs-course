const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAllBoards();
    res.json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const board = await boardsService.postBoard(req.body);
    if (!board) res.status(404).send('Board not found');
    res.json(Board.toResponse(board));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (!board) res.status(404).send('Board not found');
    res.json(Board.toResponse(board));
  })
  .put(async (req, res) => {
    const board = await boardsService.putBoard(req.params.id, req.body);
    if (!board) res.status(404).send('Board not found');
    res.json(Board.toResponse(board));
  })
  .delete(async (req, res) => {
    const result = await boardsService.deleteBoard(req.params.id);
    if (!result) res.status(404).send('Board not found');
    res.status(204).send('The board has been deleted');
  });

module.exports = router;
