const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const logger = require('./helpers/logger');
const errorHandler = require('./middlewares/errorHandleMiddleware');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/tasks.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', loggerMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', tasksRouter);

app.use(errorHandler);

process
  .on('uncaughtException', err => {
    logger.error(`Uncaught exception: ${err.message}`);
    process.exitCode = 1;
  })
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
  });

// To test uncaughtException or unhandledRejection uncomment appropriate line below
// I now I shouldn't leave commented code. I do it for your convenience only.

// throw Error('Oops! Exception!');
// Promise.reject(Error('Oops! Rejection!'));

module.exports = app;
