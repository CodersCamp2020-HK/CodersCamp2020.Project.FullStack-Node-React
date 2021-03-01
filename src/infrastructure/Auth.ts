import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import ApiError from './ApiError';

interface IUserInfo {
    role: 'string';
    iat: number;
}

interface IAuthUserInfoRequest extends Request {
    user: string | Record<string, unknown>;
}

export function auth(req: IAuthUserInfoRequest, res: Response, next: NextFunction): Response | void {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).send('Acces denied. No token provided.');
        if (!process.env.JWT_KEY) throw new ApiError('Internal server error', 500, 'JWT private key not found!');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) return res.status(400).send('Invalid token!');
        next(error);
    }
}
