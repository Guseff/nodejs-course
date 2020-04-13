const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const errorCatcher = require('../../helpers/errorCatcher');
const RequestError = require('../../helpers/requestError');
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(
    errorCatcher(async (req, res) => {
      const boards = await boardsService.getAllBoards();
      res.status(HttpStatus.OK).send(boards.map(Board.toResponse));
    })
  )
  .post(
    errorCatcher(async (req, res) => {
      const board = await boardsService.postBoard(req.body);
      if (!board) {
        throw new RequestError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      res.status(HttpStatus.OK).send(Board.toResponse(board));
    })
  );

router
  .route('/:id')
  .get(
    errorCatcher(async (req, res) => {
      const board = await boardsService.getBoard(req.params.id);
      if (!board) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'Board not found');
      }
      res.status(HttpStatus.OK).send(Board.toResponse(board));
    })
  )
  .put(
    errorCatcher(async (req, res) => {
      const board = await boardsService.putBoard(req.params.id, req.body);
      if (!board) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'Board not found');
      }
      res.status(HttpStatus.OK).send(Board.toResponse(board));
    })
  )
  .delete(
    errorCatcher(async (req, res) => {
      const result = await boardsService.deleteBoard(req.params.id);
      if (!result) {
        throw new RequestError(HttpStatus.NOT_FOUND, 'Board not found');
      }
      res.status(HttpStatus.NO_CONTENT).send('The board has been deleted');
    })
  );

module.exports = router;
