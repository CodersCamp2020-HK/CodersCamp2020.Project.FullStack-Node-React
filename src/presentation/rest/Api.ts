import express, { Response, Request, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import ApiError from '../../infrastructure/ApiError';
import { RegisterRoutes } from './generated/routes';
import { useSwagger } from './Swagger';

const api = express.Router();

api.use(express.json());

RegisterRoutes(api);

api.use((err: ApiError | ValidateError | Error, req: Request, res: Response, _next: NextFunction): Response | void => {
    if (err instanceof ApiError) {
        console.warn(`Caught Error for ${req.path}:`, err.message);
        return res.status(err.statusCode ? err.statusCode : 500).json({
            status: err.statusCode || 500,
            name: err.name,
            message: err.message,
        });
    } else if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: 'Validation Failed',
            details: err?.fields,
        });
    } else {
        console.warn(`Internal Server Error for ${req.path}:`, err.message);
        return res.status(500).json({ name: err.name, message: err.message });
    }
});

api.use('/api', ...useSwagger());

export { api };
