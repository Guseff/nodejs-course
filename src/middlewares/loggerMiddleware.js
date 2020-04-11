const logger = require('../helpers/logger');

const loggerMiddleware = (req, res, next) => {
  logger.info(
    `Method: ${req.method}, URL: ${decodeURI(
      req.url
    )}, query object: ${JSON.stringify(
      req.query
    )}, request body: ${JSON.stringify(req.body)}`
  );
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
};

module.exports = loggerMiddleware;
