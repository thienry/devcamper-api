import path from 'path'
import winston from 'winston'

function configureLogFileOptions() {
  return {
    maxFiles: 5,
    level: 'info',
    maxsize: 5242880,
    handleExceptions: true,
    filename: path.resolve(__dirname, '..', 'logs', 'app.log')
  }
}

function configureConsoleOptions() {
  const colorizer = winston.format.colorize()
  return {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.printf((msg) =>
        colorizer.colorize(
          msg.level,
          `[${msg.level}][${msg.timestamp}] - ${msg.message}`
        )
      )
    )
  }
}

function logger() {
  const winstonLog = winston.createLogger({
    transports: [
      new winston.transports.File(configureLogFileOptions()),
      new winston.transports.Console(configureConsoleOptions())
    ]
  })

  winstonLog.stream({ write: (message) => logger.info(message) })

  return winstonLog
}

export const log = logger()
