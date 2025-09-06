import { pino } from "pino";

const minLogLevel = process.env.NODE_ENV === "development" ? "debug" : "info";

const PinoLogger = pino({
    level: minLogLevel,
});

export default PinoLogger;
