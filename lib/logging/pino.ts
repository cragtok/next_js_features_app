import { pino } from "pino";

const pinoLogger = pino({
    level: "debug",
});

export default pinoLogger;
