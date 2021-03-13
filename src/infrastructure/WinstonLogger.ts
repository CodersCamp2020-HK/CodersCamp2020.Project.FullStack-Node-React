import { ILogger } from '@application/ILogger';
import { createLogger, transports, format } from 'winston';

class WinstonLogger implements ILogger {
    private readonly logger = createLogger({
        transports: [
            new transports.Console({
                level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
                handleExceptions: true,
                format: format.combine(
                    format.colorize(),
                    format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                    }),
                    format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`),
                ),
            }),
        ],
        exitOnError: false,
    });

    error(msg: string): void {
        this.logger.error(msg);
    }

    warn(msg: string): void {
        this.logger.warn(msg);
    }

    log(msg: string): void {
        this.logger.info(msg);
    }

    debug(msg: string): void {
        this.logger.debug(msg);
    }

    write(msg: string): void {
        this.log(msg);
    }
}

export { WinstonLogger };
