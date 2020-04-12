const onFinished = require('on-finished');
const logger = require('../helpers/logger');

const loggerMiddleware = (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  const start = Date.now();
  const { method, url, body, query } = req;

  onFinished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(
      `Method: ${method}, URL: ${decodeURI(
        url
      )}, query object: ${JSON.stringify(
        query
      )}, request body: ${JSON.stringify(body)} ${statusCode} [${ms}ms]`
    );
  });

  next();
};

module.exports = loggerMiddleware;
