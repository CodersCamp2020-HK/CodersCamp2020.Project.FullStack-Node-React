export enum ErrorCodes {
    UserNotActivated,
}

export default class ApiError extends Error {
    private _statusCode: number;
    private _errorCode?: ErrorCodes;

    constructor(name: string, statusCode: number, message?: string, errorCode?: ErrorCodes) {
        super(message);
        this.name = name;
        this._statusCode = statusCode;
        this._errorCode = errorCode;
    }
    get statusCode(): number {
        return this._statusCode;
    }

    get errorCode(): ErrorCodes | undefined {
        return this._errorCode;
    }
}
