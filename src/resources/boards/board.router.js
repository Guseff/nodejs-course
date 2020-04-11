const router = require('express').Router();
const RequestError = require('../../middlewares/requestError');
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAllBoards();
    res.status(200).send(boards.map(Board.toResponse));
  })
  .post(async (req, res, next) => {
    const board = await boardsService.postBoard(req.body);
    if (!board) {
      next(new RequestError(400, 'Bad request'));
      return;
    }
    res.status(200).send(Board.toResponse(board));
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const board = await boardsService.getBoard(req.params.id);
    if (!board) {
      next(new RequestError(404, 'Board not found'));
      return;
    }
    res.status(200).send(Board.toResponse(board));
  })
  .put(async (req, res, next) => {
    const board = await boardsService.putBoard(req.params.id, req.body);
    if (!board) {
      next(new RequestError(404, 'Board not found'));
      return;
    }
    res.status(200).send(Board.toResponse(board));
  })
  .delete(async (req, res, next) => {
    const result = await boardsService.deleteBoard(req.params.id);
    if (!result) {
      next(new RequestError(404, 'Board not found'));
      return;
    }
    res.status(204).send('The board has been deleted');
  });

module.exports = router;
