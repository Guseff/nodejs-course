const path = require('path');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/combined.log'),
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

module.exports = logger;
