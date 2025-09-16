import { pino } from "pino";
import type { Logger as PinoLoggerType } from "pino";

let minLogLevel;

if (process.env.NODE_ENV === "development") {
    minLogLevel = "debug";
} else if (process.env.NODE_ENV === "production") {
    minLogLevel = "info";
} else {
    minLogLevel = "fatal";
}

const PinoLogger = pino({
    level: minLogLevel,
});

export default PinoLogger;
export { type PinoLoggerType };
