import PinoLogger from "./pino";
import { type PinoLoggerType } from "./pino";

interface Logger {
    debug(message: string, mergingObject?: object): void;
    info(message: string, mergingObject?: object): void;
    warn(message: string, mergingObject?: object): void;
    error(message: string, mergingObject?: object): void;
    fatal(message: string, mergingObject?: object): void;
}

class PinoLoggerAdapter implements Logger {
    private logger: PinoLoggerType;
    private userSessionId?: string;
    private scope: string;

    constructor(pinoLogger: PinoLoggerType, scope: string, userSessionId?: string) {
        this.logger = pinoLogger;
        this.userSessionId = userSessionId;
        this.scope = scope;
    }

    private mergeUserSessionId(mergingObject?: object): object | undefined {
        if (this.userSessionId) {
            return { userSessionId: this.userSessionId, ...mergingObject };
        }
        return mergingObject;
    }

    debug(message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.debug(mergedObject, `[${this.scope}]: ${message}`);
        } else {
            this.logger.debug(`[${this.scope}]: ${message}`);
        }
    }

    info(message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.info(mergedObject, `[${this.scope}]: ${message}`);
        } else {
            this.logger.info(`[${this.scope}]: ${message}`);
        }
    }

    warn(message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.warn(mergedObject, `[${this.scope}]: ${message}`);
        } else {
            this.logger.warn(`[${this.scope}]: ${message}`);
        }
    }

    error(message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.error(mergedObject, `[${this.scope}]: ${message}`);
        } else {
            this.logger.error(`[${this.scope}]: ${message}`);
        }
    }

    fatal(message: string, mergingObject?: object): void {
        const mergedObject = this.mergeUserSessionId(mergingObject);
        if (mergedObject) {
            this.logger.fatal(mergedObject, `[${this.scope}]: ${message}`);
        } else {
            this.logger.fatal(`[${this.scope}]: ${message}`);
        }
    }
}

export function getLogger(scope: string, userSessionId?: string): PinoLoggerAdapter {
    return new PinoLoggerAdapter(PinoLogger, scope, userSessionId);
}
