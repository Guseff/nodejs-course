const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./middlewares/logger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/tasks.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
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
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', tasksRouter);

app.use((err, req, res, next) => {
  if (err.code) {
    logger.error(`${err.code} ${err.message}`);
    res.status(err.code).send(err.message);
    return;
  }
  logger.error('Internal server error');
  res.status(500).send('Internal server error');
  next(err);
});

process.on('uncaughtException', err => {
  logger.error(`Uncaught exception: ${err.message}`);
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
});

module.exports = app;
