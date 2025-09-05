import { pino } from "pino";

const PinoLogger = pino({
    level: "debug", // DEVELOPMENT
    // level: "info", // PRODUCTION
});

export default PinoLogger;
