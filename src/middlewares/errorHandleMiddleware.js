const HttpStatus = require('http-status-codes');
const logger = require('../helpers/logger');

const errorHandler = (err, req, res, next) => {
  if (err.code) {
    logger.error(`${err.code} ${err.message}`);
    res.status(err.code).send(err.message);
    return;
  }
  logger.error('Internal server error');
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal server error');
  next();
};

module.exports = errorHandler;
