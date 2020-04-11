const logger = require('../helpers/logger');

const errorHandler = (err, req, res, next) => {
  if (err.code) {
    logger.error(`${err.code} ${err.message}`);
    res.status(err.code).send(err.message);
    return;
  }
  logger.error('Internal server error');
  res.status(500).send('Internal server error');
  next(err);
};

module.exports = errorHandler;
