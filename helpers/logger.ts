import winston from "winston";
import * as path from "path";
import * as fs from "fs";

const logDir = "logs";
const logFileName = "harmony-logger-test.log";

//Logs directory creation if not exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "error",
            filename: path.join(logDir, logFileName),
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            handleExceptions: true,
        }),
        new winston.transports.File({
            level: "info",
            filename: path.join(logDir, logFileName),
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            handleExceptions: true,
        }),
        new winston.transports.File({
            level: "warn",
            filename: path.join(logDir, logFileName),
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            handleExceptions: true,
        }),
    ],
});

export default logger;