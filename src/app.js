const express = require('express');
const morgan = require('morgan');
const winston = require('./common/logger');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/tasks.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    (tokens, req, res) => {
      return [
        'Method:',
        `${tokens.method(req, res)},`,
        'URL:',
        `${decodeURI(tokens.url(req, res))},`,
        'Status:',
        `${tokens.status(req, res)},`,
        'Query object:',
        `${JSON.stringify(req.query)},`,
        'Request body:',
        JSON.stringify(req.body)
      ].join(' ');
    },
    { stream: winston.stream }
  )
);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', tasksRouter);

module.exports = app;
