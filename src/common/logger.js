const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'combined.log',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

logger.stream = {
  write(message) {
    logger.silly(message);
  }
};

module.exports = logger;
