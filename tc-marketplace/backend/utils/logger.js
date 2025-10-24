import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

// Create logger
const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),          // adds color in console
    timestamp(),         // adds timestamp
    logFormat
  ),
  transports: [
    new transports.Console(),                       // logs to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // errors only
    new transports.File({ filename: 'logs/combined.log' })               // all logs
  ],
});

export default logger;