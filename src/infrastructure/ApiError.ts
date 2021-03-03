export default class ApiError extends Error {
    private _statusCode: number;
    constructor(name: string, statusCode: number, message?: string) {
        super(message);
        this.name = name;
        this._statusCode = statusCode;
    }
    get statusCode(): number {
        return this._statusCode;
    }
}
