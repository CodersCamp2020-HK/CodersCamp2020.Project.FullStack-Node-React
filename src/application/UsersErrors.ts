export interface ValidateErrorJSON {
    message: 'Validation failed';
    details: { [name: string]: unknown };
}

export class InvalidEmailFormatError extends Error {
    constructor() {
        super(`Invalid e-mail format`);
    }
}

export class UniqueUserEmailError extends Error {
    constructor(email: string) {
        super(`User with (email:  ${email}) already exists`);
    }
}

export class PasswordRequirementsError extends Error {
    constructor(reason: string) {
        super(reason);
    }
}
