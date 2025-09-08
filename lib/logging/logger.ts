import PinoLogger from "./pino";
import { type PinoLoggerType } from "./pino";

interface Logger {
    debug(scope: string, message: string, mergingObject?: object): void;
    info(scope: string, message: string, mergingObject?: object): void;
    warn(scope: string, message: string, mergingObject?: object): void;
    error(scope: string, message: string, mergingObject?: object): void;
    fatal(scope: string, message: string, mergingObject?: object): void;
}

class PinoLoggerAdapter implements Logger {
    private logger: PinoLoggerType;
    private userSessionId?: string;

    constructor(pinoLogger: PinoLoggerType, userSessionId?: string) {
        this.logger = pinoLogger;
        this.userSessionId = userSessionId;
    }

    private mergeUserSessionId(mergingObject?: object): object | undefined {
        if (this.userSessionId) {
            return { userSessionId: this.userSessionId, ...mergingObject };
        }
        return mergingObject;
    }

    debug(scope: string, message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.debug(mergedObject, `[${scope}]: ${message}`);
        } else {
            this.logger.debug(`[${scope}]: ${message}`);
        }
    }

    info(scope: string, message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.info(mergedObject, `[${scope}]: ${message}`);
        } else {
            this.logger.info(`[${scope}]: ${message}`);
        }
    }

    warn(scope: string, message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.warn(mergedObject, `[${scope}]: ${message}`);
        } else {
            this.logger.warn(`[${scope}]: ${message}`);
        }
    }

    error(scope: string, message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.error(mergedObject, `[${scope}]: ${message}`);
        } else {
            this.logger.error(`[${scope}]: ${message}`);
        }
    }

    fatal(scope: string, message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.fatal(mergedObject, `[${scope}]: ${message}`);
        } else {
            this.logger.fatal(`[${scope}]: ${message}`);
        }
    }
}

export function getLogger(userSessionId?: string): PinoLoggerAdapter {
    return new PinoLoggerAdapter(PinoLogger, userSessionId);
}
