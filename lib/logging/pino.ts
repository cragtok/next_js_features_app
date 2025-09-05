import { pino } from "pino";
import { serverEnv } from "../env/serverEnv";

const minLogLevel = serverEnv.NODE_ENV === "development" ? "debug" : "info";

const PinoLogger = pino({
    level: minLogLevel,
});

export default PinoLogger;
