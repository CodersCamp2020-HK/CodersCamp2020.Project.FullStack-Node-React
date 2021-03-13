interface ILogger {
    error(msg: string): void;
    warn(msg: string): void;
    log(msg: string): void;
    debug(msg: string): void;
}

export { ILogger };
