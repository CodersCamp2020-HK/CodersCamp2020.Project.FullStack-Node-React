import express, { Response, Request, NextFunction } from 'express';
import ApiError from '../../infrastructure/ApiError';
import { RegisterRoutes } from './generated/routes';
import { useSwagger } from './Swagger';
import cors from 'cors';

const api = express.Router();

api.use(cors());
api.use(express.json());

RegisterRoutes(api);

api.use((err: ApiError | Error, req: Request, res: Response, _next: NextFunction): Response | void => {
    if (err instanceof ApiError) {
        console.warn(`Caught Error for ${req.path}:`, err.message);
        return res.status(err.statusCode ? err.statusCode : 500).json({
            status: err.statusCode || 500,
            name: err.name,
            message: err.message,
        });
    } else {
        console.warn(`Internal Server Error for ${req.path}:`, err.message);
        return res.status(500).json({ name: err.name, message: err.message });
    }
});

api.use('/api', ...useSwagger());

export { api };
