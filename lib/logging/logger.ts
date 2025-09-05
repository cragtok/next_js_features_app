import PinoLogger from "./pino";

interface Logger {
    debug(...meta: unknown[]): void;
    info(...meta: unknown[]): void;
    warn(...meta: unknown[]): void;
    error(...meta: unknown[]): void;
    fatal(...meta: unknown[]): void;
}

class PinoLoggerAdapter implements Logger {
    private logger: typeof PinoLogger;
    private static _instance: PinoLoggerAdapter | null = null;

    private constructor(pinoLogger: typeof PinoLogger) {
        this.logger = pinoLogger;
    }

    public static getInstance(
        pinoLogger: typeof PinoLogger
    ): PinoLoggerAdapter {
        if (!PinoLoggerAdapter._instance) {
            PinoLoggerAdapter._instance = new PinoLoggerAdapter(pinoLogger);
        }
        return PinoLoggerAdapter._instance;
    }

    debug(functionName: string, message: string, mergingObject?: object): void {
        if (mergingObject) {
            this.logger.debug(mergingObject, `[${functionName}]: ${message}`);
        } else {
            this.logger.debug(`[${functionName}]: ${message}`);
        }
    }

    info(functionName: string, message: string, mergingObject?: object): void {
        if (mergingObject) {
            this.logger.info(mergingObject, `[${functionName}]: ${message}`);
        } else {
            this.logger.info(`[${functionName}]: ${message}`);
        }
    }

    warn(functionName: string, message: string, mergingObject?: object): void {
        if (mergingObject) {
            this.logger.warn(mergingObject, `[${functionName}]: ${message}`);
        } else {
            this.logger.warn(`[${functionName}]: ${message}`);
        }
    }
    error(functionName: string, message: string, mergingObject?: object): void {
        if (mergingObject) {
            this.logger.error(mergingObject, `[${functionName}]: ${message}`);
        } else {
            this.logger.error(`[${functionName}]: ${message}`);
        }
    }

    fatal(functionName: string, message: string, mergingObject?: object): void {
        if (mergingObject) {
            this.logger.fatal(mergingObject, `[${functionName}]: ${message}`);
        } else {
            this.logger.fatal(`[${functionName}]: ${message}`);
        }
    }
}

const logger = PinoLoggerAdapter.getInstance(PinoLogger);

export default logger;
