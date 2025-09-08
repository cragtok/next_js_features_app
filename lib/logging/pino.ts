import { pino } from "pino";
import type { Logger as PinoLoggerType } from "pino";

const minLogLevel = process.env.NODE_ENV === "development" ? "debug" : "info";

const PinoLogger = pino({
    level: minLogLevel,
});

export default PinoLogger;
export { type PinoLoggerType };
